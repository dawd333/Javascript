var timeFunInterval;
var timeFunTimeout;
var timeFunRequest;

var idInterval
var idTimeout;
var idRequest;

function funInterval(){
	var endTime = performance.now();
	console.log("Last funInterval took:" + (endTime-timeFunInterval));
	timeFunInterval = performance.now();
	var x = 1
	var i;
	for(i=0; i<100000000; i++){
		x = x*2;
	}
}

function funTimeout(){
	var endTime=performance.now();
	console.log("Last funTimeout took:" + (endTime-timeFunTimeout));
	timeFunTimeout=performance.now();
	var x = 1
	var i;
	for(i=0; i<100000000; i++){
		x = x*2;
	}
	idTimeout = window.setTimeout(funTimeout, 2000);
}

function funRequest(){
	var endTime = performance.now();
	console.log("Last funRequest took:" + (endTime-timeFunRequest));
	timeFunRequest = performance.now();
	var x = 1
	var i;
	for(i=0; i<100000000; i++){
		x = x*2;
	}
	idRequest = window.requestAnimationFrame(funRequest);
}

function start(){
	timeFunInterval = performance.now();
	idInterval = window.setInterval(funInterval, 2000);

	timeFunTimeout = performance.now();
	idTimeout = window.setTimeout(funTimeout, 2000);

	timeFunRequest = performance.now();
	idRequest = window.requestAnimationFrame(funRequest);
}

function stop(){
	window.clearInterval(idInterval);
	window.clearTimeout(idTimeout);
	window.cancelAnimationFrame(idRequest);
}