import { enviaInstrucoes, extraiPlanalto, extraiSondas } from "./programa";

let testString = "5 7\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";

test("enviaInstrucoes", () => {
  let result = enviaInstrucoes(testString);
  expect(result).toBe("1 3 N\n5 1 E");
});

test("extraiPlanalto", () => {
  let result = extraiPlanalto(testString);
  expect(result).toMatchObject({ x: 5, y: 7 });
});

test("extraiSondas", () => {
  let result = extraiSondas(testString);
  console.log(result);
  expect(result).toMatchObject([
    { x: 1, y: 2, d: "N", instrucoes: "LMLMLMLMM" },
    { x: 3, y: 3, d: "E", instrucoes: "MMRMMRMRRM" }
  ]);
});
