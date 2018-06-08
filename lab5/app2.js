//Aplikacja z wykorzystaniem systemu szablonów 'Pug'
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;
 
// Konfigurowanie aplikacji
app.set('views', __dirname + '/views'); // Pliki z widokami znajdują się w katalogu 'views'
app.set('view engine', 'pug');          // Używaj systemu szablonów 'Pug'
 
// Określanie zawartości stosu oprogramowania pośredniego (ang. middleware) 
app.use(logger('dev'));                         // Dodaj, na stos, rejestrator żądań HTTP - każde żadanie będzie dziennikowane w konsoli w formacie 'dev'
app.use(express.static(__dirname + '/public')); // Dodaj wbudowanego middleware'a 'express.static' - statyczna zawartość (pliki .css, .js, .jpg, itp.) ma być udostępniana z katalogu 'public' 
 
//Definicje tras
app.get('/', function (req, res) {      // Pierwsza trasa
    res.render('index', {x: x, y: y});
});
 
app.get('/add/:x/:y', (req, res) => {
    intX = parseInt(req.params.x);
    intY = parseInt(req.params.y);
    res.render('index', {x: intX, y: intY});
});

// Aplikacja ma nasłuchiwać na porcie nr 3000
app.listen(3000, function () {                  
    console.log('Aplikacja jest dostępna na porcie 3000');
});