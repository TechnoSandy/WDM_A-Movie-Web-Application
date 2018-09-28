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
			createList(str, json);
			//			addMovieList(str, json);
		}
	};
	xhr.send(null);

}
//
//function addMovieList(str, json) {
//	json.results[0].title;
//	for (var i = 0; i < resultObject; i++) {
//		var li = document.getElementById(i);
//		document.getElementById(i).innerHTML = " Movie Title: &nbsp; " + json.results[i].title + " &nbsp; Release: " + json.results[i].release_date;
//
//	}
//
//}

function deleteList() {
	var allLi = document.getElementsByTagName("li"),
		index;
	var allImg = document.getElementsByTagName("img"),
		index1;
	for (index = allLi.length - 1; index >= 0; index--) {
		allLi[index].parentNode.removeChild(allLi[index]);
	}
	for (index1 = allImg.length - 1; index1 >= 0; index1--) {
		allImg[index1].parentNode.removeChild(allImg[index1]);
	}
}

function createList(str, json) {
	deleteList();

	var ol = document.getElementById("orderedList");
	for (var i = 0; i < resultObject; i++) {
		var li = document.createElement('li');
		var img = document.createElement('img');
		img.setAttribute("id", "img" + i)
		li.setAttribute("id", "li" + i);
		if (json.results[i].poster_path)
			img.setAttribute("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + json.results[i].poster_path);
		else if (json.results[i].backdrop_path) {
			img.setAttribute("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + json.results[i].backdrop_path);
		} else {
			img.setAttribute = img.setAttribute("src", "https://via.placeholder.com/350x150");
		}
		li.appendChild(document.createTextNode(i));
		ol.appendChild(li);
		ol.appendChild(img);
	}

	for (var i = 0; i < resultObject; i++) {
		var li = document.getElementById(i);
		document.getElementById("li" + i).innerHTML = " Movie Title: &nbsp; " + json.results[i].original_title + " &nbsp; Release: " + json.results[i].release_date;


	}

}
