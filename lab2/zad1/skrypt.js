var fun = window.prompt("Tekst1","Tekst2");
console.log(typeof(fun));

function eventHandler(){
	var input_button = document.forms[0].elements[0].value;
	console.log(input_button);
	console.log(typeof(input_button));
	}

var button = document.forms[0].elements[1];
button.onclick = eventHandler;
