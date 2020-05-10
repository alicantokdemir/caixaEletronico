const { getMensagem, caixaEletronico } = require('./caixaEletronico.js');

function main() {
  try {
    const notasObj = caixaEletronico(process.argv[2], [50, 10, 5, 1]);
    const msg = getMensagem(notasObj);
    console.log(msg);
  } catch(e) {
    console.log(e);
  }
}

main();
