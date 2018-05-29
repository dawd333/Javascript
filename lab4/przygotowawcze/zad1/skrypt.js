const modul = require('./modul.js');

console.log(modul.suma(2, 3));
console.log(modul.suma(5, 6));

let args = process.argv.slice(2);
console.log(modul.suma(args[0], args[1]));
console.log(modul.suma(parseInt(args[0]), parseInt(args[1])));