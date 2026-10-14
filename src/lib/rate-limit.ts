// Ограничение в памяти процесса; для нескольких инстансов используйте общий лимитер на прокси.
const buckets = new Map<string, { count: number; until: number }>();
export function allowRequest(key: string, now = Date.now()): boolean {
  for (const [k, v] of buckets) if (v.until <= now) buckets.delete(k);
  const current = buckets.get(key);
  if (current) { current.count++; return current.count <= 5; }
  if (buckets.size >= 10000) return false;
  buckets.set(key, { count: 1, until: now + 600000 });
  return true;
}
