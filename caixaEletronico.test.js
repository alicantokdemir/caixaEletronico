const { getMensagem, caixaEletronico } = require('./caixaEletronico.js');

const TESTS = {
  input82: function() {
    try {
      const testMsg = 'Notas entregues: 1 nota(s) de R$50.00, 3 nota(s) de R$10.00 e 2 nota(s) de R$1.00';
      const calcObj = caixaEletronico('82');
      const msg = getMensagem(calcObj);
      
      if(testMsg === msg) {
        return _tSuccess(msg);
      }

      return _tFail(msg);

    } catch(e) {
      return _tFail(e.message);
    }
  },
  input100: function() {
    try {
      const testMsg = 'Notas entregues: 2 nota(s) de R$50.00';
      const calcObj = caixaEletronico('100');
      const msg = getMensagem(calcObj);
      
      if(testMsg === msg) {
        return _tSuccess(msg);
      }

      return _tFail(msg);

    } catch(e) {
      return _tFail(e.message);
    }
  },
  inputRestante: function() {
    try {
      const testMsg = 'Notas entregues: 1 nota(s) de R$1.00\nValor restante: 0.5';
      const calcObj = caixaEletronico('1.5');
      const msg = getMensagem(calcObj);
      
      if(testMsg === msg) {
        return _tSuccess(msg);
      }

      return _tFail(msg);

    } catch(e) {
      return _tFail(e.message);
    }
  },
  inputUndefined: function() {
    try {
      const calcObj = caixaEletronico();
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor pedido e invalido';

      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputNull: function() {
    try {
      const calcObj = caixaEletronico(null);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor pedido e invalido';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  input0: function() {
    try {
      const calcObj = caixaEletronico(0);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor minimo e 1';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputNInfinity: function() {
    try {
      const calcObj = caixaEletronico(Number.NEGATIVE_INFINITY);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor minimo e 1';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputPInfinity: function() {
    try {
      const calcObj = caixaEletronico(Number.POSITIVE_INFINITY);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor maximo e 10000';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputNaN: function() {
    try {
      const calcObj = caixaEletronico(Number.NaN);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor pedido e invalido';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputArray: function() {
    try {
      const calcObj = caixaEletronico([]);
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor pedido e invalido';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
  inputObject: function() {
    try {
      const calcObj = caixaEletronico({});
      
      return _tFail(calcObj);
    } catch(e) {
      const testMsg = 'Valor pedido e invalido';
      
      if(testMsg === e.message) {
        return _tSuccess(e.message);
      }

      return _tFail(e.message);

    }
  },
};

function _tSuccess(data) {
  return { OK: true, data };
}

function _tFail(data) {
  return { OK: false, data };
}

(function testRunner() {
  const testResults = [];
  Object.keys(TESTS)
    .forEach(testN => {
      const res = TESTS[testN]();
      const tResultObj = { Test: testN, OK: res.OK, resultado: res.data };
      testResults.push(tResultObj);
      console.table(tResultObj);
    });
  console.log(`Testes passaram: ${testResults.filter(t => t.OK).length}/${testResults.length}`);
})();
