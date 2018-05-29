const fs = require('fs');

let file;

const args = process.argv.slice(2);

if (args[1] === 'ustaw') {
  fs.chmodSync(args[0], parseInt(args[2], 8));
} else if (args[1] === 'kopiuj') {
  const files = fs.readdirSync(args[0]);
  for (let i = 0; i < files.length; i++) {
    file = fs.readFileSync(`${args[0]}/${files[i]}`, 'utf8');
    fs.writeFileSync(`katalog2/${files[i]}`, file);
  }
} else {
  console.log('Bad operation');
}
