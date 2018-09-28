var resultObject;

function initialize() {

}

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
			console.log(json.results.length);
			resultObject = json.results.length;
			createList();
			addMovieList(str, json);
		}
	};
	xhr.send(null);

}

function addMovieList(str, json) {
	json.results[0].title;
	for (var i = 0; i < resultObject; i++) {
		var li = document.getElementById(i);
		document.getElementById(i).innerHTML = " Movie Title: &nbsp; " + json.results[i].title + " &nbsp; Release: " + json.results[i].release_date;

	}

}

function deleteList() {
	var allLi = document.getElementsByTagName("li"),
		index;
	for (index = allLi.length - 1; index >= 0; index--) {
		allLi[index].parentNode.removeChild(allLi[index]);
	}
}

function createList() {
	deleteList();
	var ol = document.getElementById("orderedList");
	for (var i = 0; i < resultObject; i++) {
		var item = document.createElement('li');
		item.setAttribute("id", i);
		item.appendChild(document.createTextNode(i));
		ol.appendChild(item);
	}
	for (var i = 0; i < resultObject; i++) {
		var li = document.getElementById(i);
		console.log(li.textContent || li.innerText);
	}
}
