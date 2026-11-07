import assert from "node:assert/strict";
import { initialData } from "../mock/index";
import type { Transaction } from "../src/types";
import { addDate, parseMoney, totals } from "../src/utils/finance";
const base = initialData();
assert.equal(totals(base).balance.toFixed(2), "23847.92");
assert.equal(parseMoney("1.234,56"), 1234.56);
assert.equal(parseMoney("123,45"), 123.45);
assert.equal(addDate("2026-01-31", "month", 1), "2026-02-28");
assert.equal(addDate("2024-02-29", "year", 1), "2025-02-28");
assert.equal(addDate("2026-12-28", "week", 1), "2027-01-04");
assert.equal(addDate("2026-10-19", "month", 11), "2027-09-19");
const tx: Transaction = {
  id: 999,
  name: "Teste",
  cat: "mercado",
  date: "2026-10-19",
  time: "10:00",
  amount: -123.45,
  type: "out",
  account: "Nebula Conta",
  member: "Douglas",
};
const posted = { ...base, transactions: [...base.transactions, tx] };
assert.equal(totals(posted).expense.toFixed(2), "5035.80");
assert.equal(totals(posted).category("mercado").toFixed(2), "1408.05");
assert.equal(totals(posted).balance.toFixed(2), "23724.47");
const scheduled = {
  ...base,
  transactions: [...base.transactions, { ...tx, date: "2026-11-19" }],
};
assert.equal(totals(scheduled).expense, totals(base).expense);
assert.equal(totals(scheduled).balance, totals(base).balance);
const previousMonth = {
  ...base,
  transactions: [...base.transactions, { ...tx, date: "2026-09-19" }],
};
assert.equal(totals(previousMonth).expense, totals(base).expense);
assert.equal(totals(previousMonth).balance.toFixed(2), "23724.47");
const payment = {
  ...base,
  transactions: [...base.transactions, { ...tx, type: "tr" as const, cat: "transf", amount: -3842.1 }],
};
assert.equal(totals(payment).expense, totals(base).expense);
assert.equal(totals(payment).balance.toFixed(2), "20005.82");
console.log("16 verificações de valores, agendamentos e recorrências passaram.");
