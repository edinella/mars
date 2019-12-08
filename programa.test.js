import { extraiPlanalto, extraiSondas, processaInstrucoes } from "./programa";

let testString = "5 7\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";

test("extraiPlanalto", () => {
  let result = extraiPlanalto(testString);
  expect(result).toMatchObject({ x: 5, y: 7 });
});

test("extraiPlanaltoMultidigito", () => {
  let result = extraiPlanalto("888 777");
  expect(result).toMatchObject({ x: 888, y: 777 });
});

test("extraiSondas", () => {
  let result = extraiSondas(testString);
  expect(result).toMatchObject([
    { x: 1, y: 2, d: "N", comandos: "LMLMLMLMM" },
    { x: 3, y: 3, d: "E", comandos: "MMRMMRMRRM" }
  ]);
});

test("processaInstrucoes", () => {
  let result = processaInstrucoes(testString);
  expect(result).toBe("1 3 N\n5 1 E");
});

test("sondaViraR", () => {
  let result = processaInstrucoes("4 4 N\nR");
  expect(result).toBe("4 4 E");
});

test("sondaViraL", () => {
  let result = processaInstrucoes("0 0 N\nL");
  expect(result).toBe("0 0 W");
});

test("sondaViraRL", () => {
  let result = processaInstrucoes("1 2 N\nRL");
  expect(result).toBe("1 2 N");
});

test("sondaViraRRRR", () => {
  let result = processaInstrucoes("0 0 W\nRRRR");
  expect(result).toBe("0 0 W");
});

test("sondaViraLLLL", () => {
  let result = processaInstrucoes("0 0 N\nLLLL");
  expect(result).toBe("0 0 N");
});

test("sondaMoveN", () => {
  let result = processaInstrucoes("0 0 N\nM");
  expect(result).toBe("0 1 N");
});

test("sondaMoveE", () => {
  let result = processaInstrucoes("0 0 E\nM");
  expect(result).toBe("1 0 E");
});

test("sondaMoveS", () => {
  let result = processaInstrucoes("8 7 S\nM");
  expect(result).toBe("8 6 S");
});

test("sondaMoveW", () => {
  let result = processaInstrucoes("2 3 W\nM");
  expect(result).toBe("1 3 W");
});

test("sondaMoveCoordenadaMultidigito", () => {
  let result = processaInstrucoes("100 100 S\nM");
  expect(result).toBe("100 99 S");
});

test("posicionaSondaSemMovimento", () => {
  let result = processaInstrucoes("100 100 S");
  expect(result).toBe("100 100 S");
});

test("sondaPousouForaDoPlanalto", () => {
  let result = processaInstrucoes("2 2\n3 3 S");
  expect(result).toBe("SONDA ACIDENTADA");
});

test("sondaSaiuDoPlanalto", () => {
  let result = processaInstrucoes("2 2\n2 2 N\nM");
  expect(result).toBe("SONDA ACIDENTADA");
});
