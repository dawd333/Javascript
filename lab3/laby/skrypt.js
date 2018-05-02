var K=Math.floor(Math.random() * 10 + 1);
var L=Math.floor(Math.random() * 10 + 1);
var M=Math.floor(Math.random() * 10 + 1);
console.log("K: "+K+" L: "+L+" M:"+M);

function funRequest(){
	console.log("Fun");
	var idTimeout = window.setTimeout(function(){console.log("Czekam");}, 2000);
	document.getElementById("gif").src = "bieg2.gif";
}

function funRequest2(){
	console.log("Fun2");
	var idTimeout = window.setTimeout(function(){console.log("Czekam");}, 2000);
	document.getElementById("gif").src = "bieg1.gif";
}

function runOnce(source){
	document.getElementById("gif").src = "bieg2.gif";
}

function run(){
	for(var i=0; i<K; i++){
		if(i%2==0){
			var idRequest = window.requestAnimationFrame(funRequest);
		}
		else{
			var idRequest = window.requestAnimationFrame(funRequest2);
		}
	}
}