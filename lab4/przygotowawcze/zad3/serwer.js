const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer((request, response) => {
  /*
      ,,request''  - strumień wejściowy - zawiera dane otrzymane od przeglądarki, np. zakodowaną zawartość pól formularza HTML

      ,,response'' - strumień wyjściowy - umieszcza się w nim dane, które chcemy odesłać przeglądarce.
        Odpowiedź, wysyłana za pomocą tego strumienia, musi się składać z dwóch części: nagłówka oraz ciała.
        W nagłówku umieszcza się, m.in., informację o typie (MIME) danych  zawartych w ciele.
        W ciele umieszcza się właściwe dane, np. definicję formularza.
    */
  console.log('--------------------------------------');
  console.log(`Względny adres URL bieżącego żądania: ${request.url}\n`);
  const url_parts = url.parse(request.url, true); // parsowanie (względnego) adresu URL

  if (url_parts.pathname == '/submit') { // Przetwarzanie zawartości formularza, jeżeli względny URL to '/submit'
    const nazwa = url_parts.query.nazwa; // Odczytaj zawartość pola (formularza) o nazwie 'imie'
    console.log('Tworzenie nagłówka odpowiedzi');
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // Tworzenie nagłówka odpowiedzi - informujemy przeglądarkę, że w ciele odpowiedzi będzie zwykły tekst (text/plain)
    console.log('Tworzenie ciała odpowiedzi');

    fs.stat(nazwa, (err, stat) => {
      if (err) {
        response.write('Bledna sciezka');
        response.end();
      } else if (stat.isFile() === true) {
        fs.readFile(nazwa, 'utf8', (err2, data) => {
          if (err2) {
            response.write('Nie znaleziono takiego pliku');
          } else {
            response.write(data);
          }
          response.end();
        });
      } else if (stat.isDirectory() === true) {
        response.write('Znalazlem katalog');
        response.end();
      } else {
        response.write('Znalazlem cos innego');
        response.end();
      }
    });

    console.log('Wysyłanie odpowiedzi');
  } else { // Generowanie formularza
    console.log('Tworzenie nagłówka odpowiedzi');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // Tworzenie nagłówka odpowiedzi - informujemy przeglądarkę, że w ciele odpowiedzi będzie tekst w formacie HTML
    // a teraz  w ciele odpowiedzi umieszczamy formularz HTML
    console.log('Tworzenie ciała odpowiedzi');
    response.write('<form method="GET" action="/submit">');
    response.write('<label for="nazwa">Podaj nazwe pliku lub katalogu </label>');
    response.write('<input name="nazwa">');
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('<input type="reset">');
    response.write('</form>');
    response.end(); // Koniec odpowiedzi - wyślij ją do przeglądarki
    console.log('Wysyłanie odpowiedzi');
  }
}).listen(8080);
console.log('Uruchomiono serwer na porcie 8080');
console.log("Aby zakończyć działanie serwera, naciśnij 'CTRL+C'");
