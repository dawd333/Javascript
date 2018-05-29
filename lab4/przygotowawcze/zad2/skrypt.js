const fs = require('fs');

const args = process.argv.slice(2);
try {
  const stat = fs.statSync(args[0]);
  if (stat.isFile() === true) {
    const file = fs.readFileSync(args[0], 'utf8');
    console.log(file);
  } else if (stat.isDirectory() === true) {
    console.log('Znalazlem katalog');
  } else {
    console.log('Znalazlem cos innego');
  }
} catch (err) {
  console.log('Bledna sciezka');
}
