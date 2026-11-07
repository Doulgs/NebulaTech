import assert from "node:assert/strict";
import { initialData } from "../mock";
import { createFinanceService } from "../src/services/core/finance-service-core";
import type { FinanceData } from "../src/types";

async function main() {
  let disk = initialData();
  let loads = 0;
  let rejectSave = false;
  const writes: FinanceData[] = [];
  const service = createFinanceService({
    load: async () => {
      loads++;
      return disk;
    },
    save: async (next) => {
      if (rejectSave) throw new Error("storage unavailable");
      disk = next;
      writes.push(next);
    },
  });
  await Promise.all([service.load(), service.load()]);
  assert.equal(loads, 1, "Concurrent consumers share hydration");
  await Promise.all([
    service.update((data) => ({
      ...data,
      invites: [...data.invites, "one@example.com"],
    })),
    service.update((data) => ({
      ...data,
      invites: [...data.invites, "two@example.com"],
    })),
  ]);
  assert.deepEqual(
    disk.invites.slice(-2),
    ["one@example.com", "two@example.com"],
    "Concurrent updates must not lose changes",
  );
  rejectSave = true;
  await assert.rejects(service.update((data) => ({ ...data, hide: true })));
  assert.equal(
    (await service.load()).hide,
    false,
    "Failed writes must not publish unpersisted changes",
  );
  rejectSave = false;
  await service.update((data) => ({ ...data, hide: true }));
  assert.equal(
    (await service.load()).hide,
    true,
    "Queue must recover after a rejected write",
  );
  assert.equal(writes.length, 3);
  let failLoad = true;
  const retrying = createFinanceService({
    load: async () => {
      if (failLoad) throw new Error("read failed");
      return initialData();
    },
    save: async () => {},
  });
  await assert.rejects(retrying.load());
  failLoad = false;
  assert.equal(
    (await retrying.load()).version,
    1,
    "Hydration must be retryable",
  );
  console.log(
    "7 verificações de hidratação, concorrência e recuperação passaram.",
  );
}
void main();
