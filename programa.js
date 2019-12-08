/*eslint no-cond-assign: "error"*/
export const processaInstrucoes = instrucoes => {
  // planalto
  let [, planaltoX, planaltoY] = instrucoes.match(/^\s*(\d)\s*(\d)\s*$/m);

  // sondas
  const sondaExp = /^\s*(\d)\s*(\d)\s*([NESW])\s*\n?\s*([LRM]*)\s*$/gm;
  let sondas = [];
  let matches;
  while ((matches = sondaExp.exec(instrucoes)) !== null) {
    let [, sondaX, sondaY, sondaD, sondaI] = matches;
    sondas.push({ sondaX, sondaY, sondaD, sondaI });
  }
  console.log({ planaltoX, planaltoY, sondas });

  return instrucoes;
};
