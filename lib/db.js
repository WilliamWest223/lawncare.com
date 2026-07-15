import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function fileFor(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

export async function readAll(collection) {
  await ensureDir();
  try {
    const raw = await fs.readFile(fileFor(collection), "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function insert(collection, record) {
  const all = await readAll(collection);
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...record,
  };
  all.unshift(entry);
  await fs.writeFile(fileFor(collection), JSON.stringify(all, null, 2));
  return entry;
}

export async function updateStatus(collection, id, status) {
  const all = await readAll(collection);
  const item = all.find((r) => r.id === id);
  if (!item) return null;
  item.status = status;
  await fs.writeFile(fileFor(collection), JSON.stringify(all, null, 2));
  return item;
}
