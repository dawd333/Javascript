//Brak użycia systemu szablonów
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;
 
// Określanie zawartości stosu oprogramowania pośredniego (ang. middleware) 
app.use(logger('dev'));                         // Umieść, na stosie, rejestrator żądań HTTP - każde żadanie będzie dziennikowane w konsoli w formacie 'dev'
app.use(express.static(__dirname + '/public')); // Umieść wbudowanego middleware'a 'express.static' - statyczna zawartość (pliki .css, .js, .jpg, itp.) ma być udostępniana z katalogu 'public' 
 
//Definicje tras
app.get('/', function (req, res) { 
    res.send('<p>'+x+' + '+y+ ' = '+(x+y)+'</p>');
})

app.get('/add/:x/:y', (req, res) => {
    intX = parseInt(req.params.x);
    intY = parseInt(req.params.y);
    res.send('<p>'+intX + " + " + intY + " = " + (intX+intY)+'</p>');
});
 
// Aplikacja ma nasłuchiwać na porcie nr 3000
app.listen(3000, function () {           
    console.log('Aplikacja jest dostępna na porcie 3000');
});