var request = require('request');
var express = require('express');
var logger = require('morgan');
var app = express();
var i;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var array = new Array();
  request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.wojewodztwo_id]=6', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var json = JSON.parse(body);
    for(i=0; i<json.Dataobject.length; i++){
      array[i] = new Array(json.Dataobject[i].id);
      var id = array[i][0];
      console.log(id);
      request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty/'+id+'.json?layers[]=firmy', function (error, response, body) {
      //console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var json2 = JSON.parse(body);
      //console.log("Nazwa firmy: " + json2.data["krs_podmioty.nazwa"]);
      //console.log("NIP: " + json2.data["krs_podmioty.nip"]);
      //array[i].push(json2.data["krs_podmioty.nip"]);

      });
    }
  console.log(array);
  });
});

app.listen(3000, function () {                  
  console.log('Aplikacja jest dostępna na porcie 3000');
});