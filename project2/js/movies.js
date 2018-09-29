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

function deleteList() {

	var completeList = document.getElementById("orderedList");
	while (completeList.firstChild) {
		completeList.removeChild(completeList.firstChild);
	}
}

function createList(str, json) {
	deleteList();

	var ol = document.getElementById("orderedList");
	for (var i = 0; i < resultObject; i++) {
		var li = document.createElement('li');
		var title = document.createElement('p');
		var img = document.createElement('img');
		var summary = document.createElement('p');

		li.setAttribute("id", "li" + i);
		title.setAttribute("id", "title" + i);
		summary.setAttribute("id", "summary" + i);
		img.setAttribute("id", "img" + i)

		// Other URL for images 
		//https://image.tmdb.org/t/p/w500/
		//Reference:https://developers.themoviedb.org/3/getting-started/images
		if (json.results[i].poster_path)
			img.setAttribute("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + json.results[i].poster_path);
		else if (json.results[i].backdrop_path) {
			img.setAttribute("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + json.results[i].backdrop_path);
		} else {
			img.setAttribute = img.setAttribute("src", "https://via.placeholder.com/350x150");
		}
		summary.innerHTML = json.results[i].overview;
		title.innerHTML = " Movie Title: &nbsp; " + json.results[i].original_title + " &nbsp; Release: " + json.results[i].release_date;
		li.appendChild(title);
		title.appendChild(summary);
		title.appendChild(img);
		ol.appendChild(li);
	}
}
