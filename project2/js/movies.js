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
	xhr.open("GET", "php/proxy.php?method=/3/search/movie&query=" + query); // Gets the movies having keyword in the query
	//	xhr.open("GET", "php/proxy.php?method=/3/movie/" + query); // Gets the Movie Info
	//	xhr.open("GET", "php/proxy.php?method=/3/movie/" + query + "/credits"); // Gets the Movie Credits
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
