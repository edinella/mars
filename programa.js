/*eslint no-cond-assign: "error"*/

export const processaInstrucoes = instrucoes => {
  let planalto = extraiPlanalto(instrucoes);
  let sondas = extraiSondas(instrucoes);
  let sondasPosicionadas = sondas.map(posicionaSonda);
  console.log({ planalto, sondas, sondasPosicionadas });
  // formata a saída novamente para string, uma sonda por linha
  return sondasPosicionadas.map(s => `${s.x} ${s.y} ${s.d}`).join("\n");
};

export const extraiPlanalto = instrucoes => {
  // primeiros dois números, tolerando espaços
  let [, x, y] = instrucoes.match(/^\s*(\d+)\s*(\d+)\s*$/m) || [];
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  return { x, y };
};

export const extraiSondas = instrucoes => {
  // posição de sonda tolerando espaços, e opcionalmente comandos na linha seguinte
  const sondaExp = /^\s*(\d+)\s*(\d+)\s*([NESW])\s*\n?\s*([LRM]*)\s*$/gm;
  let sondas = [];
  let matches;
  while ((matches = sondaExp.exec(instrucoes)) !== null) {
    let [, x, y, d, comandos] = matches;
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    sondas.push({ x, y, d, comandos });
  }
  return sondas;
};

export const posicionaSonda = sonda => {
  let { x, y, d, comandos } = sonda;
  let bussola = "NESW";
  // converte direção em número para poder calcular
  let direcaoNumerica = bussola.search(d);
  // executa comando
  [...comandos].forEach(comando => {
    // se for comando de virar
    if (comando !== "M") {
      // vira pra direita
      if (comando === "R") {
        direcaoNumerica += 1;
      }
      // vira pra esquerda
      if (comando === "L") {
        direcaoNumerica += 3;
      }
      // adequa a direção para bussola
      direcaoNumerica %= 4;
    }
    // se for comando de mover
    else {
      // se a direção for ímpar
      if (direcaoNumerica % 2) {
        // move x
        x -= direcaoNumerica - 2;
      } else {
        // move y
        y -= direcaoNumerica - 1;
      }
    }
  });
  // converte direção em letra novamente
  d = bussola[direcaoNumerica];
  return { x, y, d };
};
