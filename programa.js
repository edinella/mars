/*eslint no-cond-assign: "error"*/

export const SONDA_ACIDENTADA = {};

export const processaInstrucoes = instrucoes => {
  let planalto = extraiPlanalto(instrucoes);
  let sondas = extraiSondas(instrucoes);
  let sondasPosicionadas = sondas.map(sonda => posicionaSonda(sonda, planalto));
  console.log({ planalto, sondas, sondasPosicionadas });
  // formata a saída novamente para string, uma sonda por linha
  return sondasPosicionadas.map(sondaResponde).join("\n");
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

export const posicionaSonda = (sonda, planalto) => {
  let { x, y, d, comandos } = sonda;
  let bussola = "NESW";
  // verifica se pousou fora do planalto, caso haja
  let temPlanalto =
    planalto !== undefined &&
    planalto.x !== undefined &&
    planalto.y !== undefined;
  if (temPlanalto) {
    if (x < 0 || y < 0 || x > planalto.x || y > planalto.y) {
      return SONDA_ACIDENTADA;
    }
  }
  // converte direção em número para poder calcular
  let direcaoNumerica = bussola.search(d);
  // executa comandos
  let sondaOk = [...comandos].every(comando => {
    if (comando !== "M") {
      // se for comando de virar
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
        // verifica se saiu do planalto, caso haja
        if (temPlanalto && (x < 0 || x > planalto.x)) {
          return false;
        }
      } else {
        // move y
        y -= direcaoNumerica - 1;
        // verifica se saiu do planalto, caso haja
        if (temPlanalto && (y < 0 || y > planalto.y)) {
          return false;
        }
      }
    }
    return true;
  });
  // converte direção em letra novamente
  d = bussola[direcaoNumerica];
  return sondaOk ? { x, y, d } : SONDA_ACIDENTADA;
};

export const sondaResponde = sonda => {
  return sonda === SONDA_ACIDENTADA
    ? "SONDA ACIDENTADA"
    : `${sonda.x} ${sonda.y} ${sonda.d}`;
};
