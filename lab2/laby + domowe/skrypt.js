var clients = new Array();
var monthsEnum = Object.freeze({"styczen":1, "luty":2, "marzec":3, "kwiecien":4, "maj":5, "czerwiec":6, "lipiec":7, "sierpien":8, "wrzesien":9, "pazdziernik":10, "listopad":11, "grudzien":12});

function parseArguments() {
	var client = document.forms[0].elements[0].value;
	var productName = document.forms[0].elements[1].value;
	var price = document.forms[0].elements[2].value;
	var amount = document.forms[0].elements[3].value;
	var month = document.forms[0].elements[4].value;

	if(client == "" || productName == "" || price == "" || amount == "" || month == ""){
		console.log('Ktores z wymaganych pol jest puste');
		return;
	}

	var flag = 0;
	var i;
	var index;

	for(i = 0; i<clients.length; i++) {
		if(clients[i][0] == client){
			flag = 1;
			index = i;
		}
	}

	if(flag == 0){
		var length = clients.length;
		clients[length] = new Array();
		clients[length].push(client);
		clients[length].push(productName)
		clients[length].push(price);
		clients[length].push(amount);
		clients[length].push(month);
	}
	else{
		clients[index].push(productName)
		clients[index].push(price);
		clients[index].push(amount);
		clients[index].push(month);

	}
	if (document.forms[0].elements[11].value != ""){
		drawGraph();
	}
	console.log(clients);
}

function deleteArguments() {
	var client = document.forms[0].elements[0].value;
	var productName = document.forms[0].elements[1].value;
	var price = document.forms[0].elements[2].value;
	var amount = document.forms[0].elements[3].value;
	var month = document.forms[0].elements[4].value;

	if(client == "" || productName == "" || price == "" || amount == "" || month == ""){
		console.log('Ktores z wymaganych pol jest puste');
		return;
	}

	var flag = 0;
	var i;
	var index;

	for(i = 0; i<clients.length; i++) {
		if(clients[i][0] == client){
			flag = 1;
			index = i;
		}
	}
	if(flag == 1){
		for(i = 1; i<clients[index].length; i=i+4) {
			if (clients[index][i] == productName && 
				clients[index][i+1] == price &&
				clients[index][i+2] == amount &&
				clients[index][i+3] == month){
				clients[index].splice(i,4);
				console.log('Usunieto');
			}
		}
	}
	else{
		console.log('Nie znaleziono danego klienta');
	}
	if (document.forms[0].elements[11].value != ""){
		drawGraph();
	}
	console.log(clients);
}

function modifyArguments() {
	var client = document.forms[0].elements[0].value;
	var productName = document.forms[0].elements[1].value;
	var price = document.forms[0].elements[2].value;
	var amount = document.forms[0].elements[3].value;
	var month = document.forms[0].elements[4].value;

	if(client == "" || productName == "" || price == "" || amount == "" || month == ""){
		console.log('Ktores z wymaganych pol jest puste');
		return;
	}

	var flag = 0;
	var i;
	var index;

	for(i = 0; i<clients.length; i++) {
		if(clients[i][0] == client){
			flag = 1;
			index = i;
		}
	}
	if(flag == 1){
		for(i = 1; i<clients[index].length; i=i+4) {
			if (clients[index][i] == productName && clients[index][i+1] == price && clients[index][i+3] == month){
				clients[index][i+2] = amount;
				console.log('Zmodyfikowano');
			}
		}
	}
	else{
		console.log('Nie znaleziono danego klienta');
	}
	if (document.forms[0].elements[11].value != ""){
		drawGraph();
	}
	console.log(clients);
}

function showHistory() {
	var client = document.forms[0].elements[8].value;
	var flag = 0;
	var i;
	var index;

	for(i = 0; i<clients.length; i++) {
		if(clients[i][0] == client){
			flag = 1;
			index = i;
		}
	}
	if(flag == 1){
		console.log("Client:",clients[index][0]);
		for(i = 1; i<clients[index].length; i=i+4) {
			console.log("Product name:",clients[index][i]);
			console.log("Price:",clients[index][i+1]);
			console.log("Amount:",clients[index][i+2]);
			console.log("Month:",clients[index][i+3]);
		}
	}
	else{
		console.log('Nie znaleziono danego klienta');
	}
	console.log(clients);
}

function showTopClients() {
	console.log('TBD');
}

function drawGraph() {
	var client = document.forms[0].elements[11];
	var canvas = document.getElementById('wykres');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,1000,600);

	var flag = 0;
	var i;
	var index;
	var totalMonths = 0;
	var currentMonth = 0;
	var flag2=0;

	for(i = 0; i<clients.length; i++) {
		if(clients[i][0] == client.value){
			flag = 1;
			index = i;
		}
	}

	var eachAmount = new Array(12);
	var eachPrice = new Array(12);

	for (i=0; i<12; i++){
		eachPrice[i] = 0;
		eachAmount[i] = 0;
	}

	if (flag == 1){
		for (let elem in monthsEnum){
			for(i = 4; i<clients[index].length; i=i+4){
				if(clients[index][i] == elem){
					if(flag2 == 0){
						flag2 = 1;
						totalMonths++;
					}
					eachAmount[currentMonth] = eachAmount[currentMonth] + 1;
					eachPrice[currentMonth] = eachPrice[currentMonth] + (clients[index][i-2] * clients[index][i-1]);
				}
			}
			flag2 = 0;
			currentMonth++
    	}
    	var maxAmount = Math.max.apply(Math, eachAmount);
    	var maxPrice = Math.max.apply(Math, eachPrice);
    	var index2 = 0;
    	var month;

    	for(i=0; i<totalMonths; i++){
    		while(eachAmount[index2] == 0){
    			index2++;
    		}
    		for(prop in monthsEnum){
    			if(monthsEnum[prop] == index2+1){
    				month = prop;
    			}
    		}
    		ctx.fillStyle = 'red';
    		ctx.fillRect(i*20+20+(960-(totalMonths-1)*20)/totalMonths/2*i*2,0,(960-(totalMonths-1)*20)/totalMonths/2,(eachAmount[index2]/maxAmount)*500);
    		ctx.fillStyle = '#2f2f2f';
    		ctx.fillRect(i*20+20+(960-(totalMonths-1)*20)/totalMonths/2*(i*2+1),0,(960-(totalMonths-1)*20)/totalMonths/2,(eachPrice[index2]/maxPrice)*500);
    		ctx.font = "14px Georgia";
    		ctx.fillText(month,i*20+20+(960-(totalMonths-1)*20)/totalMonths/2*i*2,520,(960-(totalMonths-1)*20)/totalMonths);
    		ctx.fillText(eachAmount[index2],i*20+20+(960-(totalMonths-1)*20)/totalMonths/2*i*2,550,(960-(totalMonths-1)*20)/totalMonths/2);
    		ctx.fillText(eachPrice[index2],i*20+20+(960-(totalMonths-1)*20)/totalMonths/2*(i*2+1),550,(960-(totalMonths-1)*20)/totalMonths/2);
    		index2++;
    	}
	}
	else{
		console.log('Nie znaleziono danego klienta');
	}
	console.log(clients);
}