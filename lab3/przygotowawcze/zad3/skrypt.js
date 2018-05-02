var allSpans = document.getElementsByTagName("span");
var v;

function count(){
	v = parseInt(document.getElementById("licznik").value);
	for(var i=0; i<allSpans.length; i++){
		allSpans[i].textContent = v.toString();
	}
	var idInterval = window.setInterval(decrease, 1000);
}

function decrease(){
	if(v!=0){
		v--;
	}
	for(var i=0; i<allSpans.length; i++){
		allSpans[i].textContent = v.toString();
	}
	document.getElementById("licznik").value = v.toString();
}