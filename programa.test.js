import { processaInstrucoes } from "./programa";

test("duas sondas", () => {
  let result = processaInstrucoes("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM");
  expect(result).toBe("1 3 N\n5 1 E");
});
