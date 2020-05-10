/**
 * @typedef {Object} CalculoObj
 * @property {number} valorRestante Valor restante para pagar em moedas
 * @property {number} valorPedido Valor pedido
 * @property {Object} notas Qtd e valor de cada nota necessaria [valorNota]: qtd
 */

/**
 * Calcular e retornar qtd de notas necessarias e o valor restante para pagar em moedas
 * @param {string|number} valorPedido valor pedido pelo cliente entre 1 e 10000
 * @param {number[]} notas notas disponiveis (opcional)
 * @returns {CalculoObj} calculoObj
 * @returns {number} calculoObj.valorRestante Valor restante para pagar em moeda
 * @returns {number} calculoObj.valorPedido Valor pedido
 * @returns {Object} calculoObj.notas Qtd e valor de cada nota necessaria [valorNota]: qtd
 */
function caixaEletronico(valorPedido, notas = [50, 10, 5, 1]) {
  valorPedido = parseFloat(valorPedido);

  if(typeof valorPedido !== 'number' || isNaN(valorPedido)) {
    throw new Error('Valor pedido e invalido');
  }

  if(valorPedido > 10000) {
    throw new Error('Valor maximo e 10000');
  }

  if(valorPedido < 1) {
    throw new Error('Valor minimo e 1');
  }

  const _notas = [...notas].sort((a, b) => b - a);

  return _notas.reduce((acc, nota) => {
    const qtdNotas = Math.floor(acc.valorRestante / nota);
    const subTotal = qtdNotas * nota;
    
    acc.notas[nota] = qtdNotas;

    if(acc.valorRestante >= subTotal){
      acc.valorRestante -= subTotal;
    }

    return acc;
  }, { valorPedido, valorRestante: valorPedido, notas: {} });
}

/**
 * Retornar mensagem sobre notas entregues
 * @param {CalculoObj} calculoObj calculoObj
 * @returns {string} mensagem
 */
function getMensagem(calculoObj) {
  let msg = 'Notas entregues: ';
  const notas = calculoObj.notas;
  
  Object.keys(notas)
    .filter(valorNota => notas[valorNota])
    .sort((a, b) => b - a)
    .forEach((valorNota, idx, arr) => {
      const qtdNota = notas[valorNota];
      const fmtValorNota = Number(valorNota).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      if(idx !== 0) {
        if(idx === arr.length - 1) {
          msg += ' e ';
        } else {
          msg += ', ';
        }
      }

      msg += `${qtdNota} nota(s) de R$${fmtValorNota}`;
    });

    if(calculoObj.valorRestante) {
      msg += `\nValor restante: ${calculoObj.valorRestante}`;
    }
    return msg;
}

module.exports = { getMensagem, caixaEletronico };
