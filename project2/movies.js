//299536
//
//24428
//
//99861
//
//9320


function initialize() {}

function sendRequest() {
	var xhr = new XMLHttpRequest();
	var query = encodeURI(document.getElementById("form-input").value);
	//	xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
	xhr.open("GET", "proxy.php?method=/3/movie/" + query);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			console.log(json);
			var str = JSON.stringify(json, undefined, 2);
			//          document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
			addMovieList(str);
		}
	};
	xhr.send(null);

}

function addMovieList(str) {
	document.getElementById("outputMSG").innerHTML = "<pre>" + str + "</pre>";
	document.getElementById("output").innerHTML = "addMovieList() called";
}
