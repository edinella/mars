/*eslint no-cond-assign: "error"*/

export const enviaInstrucoes = instrucoes => {
  let planalto = extraiPlanalto(instrucoes);
  let sondas = extraiSondas(instrucoes);
  let sondasPosicionadas = sondas.map(posicionaSondas);
  console.log({ planalto, sondas, sondasPosicionadas });
  return sondasPosicionadas;
};

export const extraiPlanalto = instrucoes => {
  let [, x, y] = instrucoes.match(/^\s*(\d)\s*(\d)\s*$/m);
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  return { x, y };
};

export const extraiSondas = instrucoes => {
  const sondaExp = /^\s*(\d)\s*(\d)\s*([NESW])\s*\n?\s*([LRM]*)\s*$/gm;
  let sondas = [];
  let matches;
  while ((matches = sondaExp.exec(instrucoes)) !== null) {
    let [, x, y, d, instrucoes] = matches;
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    sondas.push({ x, y, d, instrucoes });
  }
  return sondas;
};

export const posicionaSondas = sonda => sonda;
