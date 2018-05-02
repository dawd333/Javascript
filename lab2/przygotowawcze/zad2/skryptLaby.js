"use strict";

var expect = chai.expect;

function cyfry(napis){
	var suma = 0;
	var i = napis.length;
	var x = 0;
	while(x<i){
		var char = napis.charAt(x);
		if (char >= '0' && char <= '9'){
			var cyfra = parseInt(char);
			suma = suma + cyfra;
		}
		x++;
	}
	return suma;
}

function litery(napis){
	var suma = 0;
	var i = napis.length;
	var x = 0;
	while(x<i){
		var char = napis.charAt(x);
		if (!(char >= '0' && char <= '9')){
			suma = suma + 1;
		}
		x++;
	}
	return suma;
}

function suma(napis){
	var suma = 0;
	var i = napis.length;
	var x = 0;
	while(x<i){
		var char = napis.charAt(x);
		var asci = char.charCodeAt(0);
		suma = suma + asci;
		x++;
	}
	return suma;
}

var text = window.prompt("Wpisz napis:", "Napis");

while (text != null){
	console.log(text);
	console.log("Suma cyfr:" + cyfry(text));
	console.log("Ilosc liter:" + litery(text));
	console.log("Suma wszystkich wczytanych liczb:" +suma(text));
	var text = window.prompt("Wpisz napis:", "Napis");
}

describe('Funkcja cyfry(napis)', function(){
	it('Zwraca 10 dla 55', function(){
		expect(cyfry("55")).to.equal(10);
	});
	it('Zwraca 0 dla aa', function(){
		expect(cyfry("aa")).to.equal(0);
	});
	it('Zwraca 18 dla a99', function(){
		expect(cyfry("a99")).to.equal(18);
	});
	it('Zwraca 13 dla 94aa', function(){
		expect(cyfry("94aa")).to.equal(13);
	});
	it('Zwraca 0 dla " "', function(){
		expect(cyfry("")).to.equal(0);
	});
});

describe('Funkcja litery(napis)', function(){
	it('Zwraca 0 dla 55', function(){
		expect(litery("55")).to.equal(0);
	});
	it('Zwraca 2 dla aa', function(){
		expect(litery("aa")).to.equal(2);
	});
	it('Zwraca 1 dla a99', function(){
		expect(litery("a99")).to.equal(1);
	});
	it('Zwraca 2 dla 94aa', function(){
		expect(litery("94aa")).to.equal(2);
	});
	it('Zwraca 0 dla " "', function(){
		expect(litery("")).to.equal(0);
	});
});

describe('Funkcja suma(napis)', function(){
	it('Zwraca 106 dla 55', function(){
		expect(suma("55")).to.equal(106);
	});
	it('Zwraca 194 dla aa', function(){
		expect(suma("aa")).to.equal(194);
	});
	it('Zwraca 211 dla a99', function(){
		expect(suma("a99")).to.equal(211);
	});
	it('Zwraca 303 dla 94aa', function(){
		expect(suma("94aa")).to.equal(303);
	});
	it('Zwraca 0 dla " "', function(){
		expect(suma("")).to.equal(0);
	});
});