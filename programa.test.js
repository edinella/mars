import {
  extraiPlanalto,
  extraiSondas,
  processaInstrucoes,
  posicionaSonda
} from "./programa";

let testString = "5 7\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";

test("extraiPlanalto", () => {
  let resultado = extraiPlanalto(testString);
  expect(resultado).toMatchObject({ x: 5, y: 7 });
});

test("extraiPlanaltoMultidigito", () => {
  let resultado = extraiPlanalto("888 777");
  expect(resultado).toMatchObject({ x: 888, y: 777 });
});

test("extraiSondas", () => {
  let resultado = extraiSondas(testString);
  expect(resultado).toMatchObject([
    { x: 1, y: 2, d: "N", comandos: "LMLMLMLMM" },
    { x: 3, y: 3, d: "E", comandos: "MMRMMRMRRM" }
  ]);
});

test("processaInstrucoes", () => {
  let resultado = processaInstrucoes(testString);
  expect(resultado).toBe("Sonda 1:\n1 3 N\n\nSonda 2:\n5 1 E\n");
});

test("sondaViraR", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "N", comandos: "R" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 4, y: 4, d: "E" });
});

test("sondaViraL", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "N", comandos: "L" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 4, y: 4, d: "W" });
});

test("sondaViraRL", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "N", comandos: "RRL" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 4, y: 4, d: "E" });
});

test("sondaViraRRRR", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 0, y: 0, d: "N", comandos: "RRRR" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 0, y: 0, d: "N" });
});

test("sondaViraLLLL", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "N", comandos: "LLLL" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 4, y: 4, d: "N" });
});

test("sondaMoveN", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 0, y: 0, d: "N", comandos: "M" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 0, y: 1, d: "N" });
});

test("sondaMoveE", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 0, y: 0, d: "E", comandos: "M" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 1, y: 0, d: "E" });
});

test("sondaMoveS", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "S", comandos: "M" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 4, y: 3, d: "S" });
});

test("sondaMoveW", () => {
  let planalto = { x: 4, y: 4 };
  let sonda = { x: 4, y: 4, d: "W", comandos: "M" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 3, y: 4, d: "W" });
});

test("sondaMoveCoordenadaMultidigito", () => {
  let planalto = { x: 100, y: 100 };
  let sonda = { x: 100, y: 100, d: "S", comandos: "M" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 100, y: 99, d: "S" });
});

test("posicionaSondaSemMovimento", () => {
  let planalto = { x: 100, y: 100 };
  let sonda = { x: 100, y: 100, d: "N", comandos: "" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toMatchObject({ x: 100, y: 100, d: "N" });
});

test("sondaPousouForaDoPlanalto", () => {
  let planalto = { x: 2, y: 2 };
  let sonda = { x: 2, y: 3, d: "N", comandos: "" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toBe("[POUSOU FORA DO PLANALTO]");
});

test("sondaSaiuDoPlanalto", () => {
  let planalto = { x: 2, y: 2 };
  let sonda = { x: 0, y: 0, d: "N", comandos: "MMMM" };
  let resultado = posicionaSonda(sonda, planalto);
  expect(resultado).toBe("[ACIDENTOU-SE SAINDO DO PLANALTO EM 0 3]");
});
