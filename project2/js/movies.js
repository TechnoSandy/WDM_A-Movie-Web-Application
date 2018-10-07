var resultObject;
var movieID = new Array();
var movieTitle = new Array();
var movieReleaseDate = new Array();
var movieDescription = new Array();
var movieImageURL = new Array();

function initialize() {

}

function sendRequest() {
	var xhr = new XMLHttpRequest();
	var query = encodeURI(document.getElementById("form-input").value);
	xhr.open("GET", "php/proxy.php?method=/3/search/movie&query=" + query); // Gets the movies having keyword in the query
	//	xhr.open("GET", "php/proxy.php?method=/3/movie/" + {MovieID}); // Gets the Movie Info
	//	xhr.open("GET", "php/proxy.php?method=/3/movie/" + {MovieID} + "/credits"); // Gets the Movie Credits
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			var str = JSON.stringify(json, undefined, 2);
			resultObject = json.results.length;
			createList(str, json);
		}
	};
	xhr.send(null);

}

function deleteList() {

	var completeList = document.getElementById("orderedList");
	while (completeList.firstChild) {
		completeList.removeChild(completeList.firstChild);
	}
	while (movieID.length > 0) {
		movieID.pop();
		movieTitle.pop();
		movieReleaseDate.pop();
		movieDescription.pop();
		movieImageURL.pop();
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
		var summaryLabel = document.createElement('p');
		var imageLabel = document.createElement('p');

		summaryLabel.innerHTML = "Summary : ";
		imageLabel.innerHTML = "Image : ";

		li.setAttribute("id", "li" + i);
		title.setAttribute("id", "title" + i);
		title.setAttribute("onclick", "titleClicked(this);");
		summary.setAttribute("id", "summary" + i);
		summary.setAttribute("style", "display : none;");
		img.setAttribute("id", "img" + i);
		img.setAttribute("style", "display : none;");

		summaryLabel.setAttribute("style", "display : none; text-decoration: underline;font-style: italic;font-weight: bold;");
		imageLabel.setAttribute("style", "display : none; text-decoration: underline;font-style: italic;font-weight: bold;");

		movieID.push(json.results[i].id);
		movieTitle.push(json.results[i].title);
		movieReleaseDate.push(json.results[i].release_date);

		if (json.results[i].overview) {
			movieDescription.push(json.results[i].overview);
		} else {
			movieDescription.push("NO DESCRIPTION FOR THIS MOVIE");
		}
		// Other URL for images 
		//https://image.tmdb.org/t/p/w185_and_h278_bestv2
		//https://image.tmdb.org/t/p/w500/
		//Reference:https://developers.themoviedb.org/3/getting-started/images
		if (json.results[i].poster_path) {
			movieImageURL.push("https://image.tmdb.org/t/p/w500/" + json.results[i].poster_path);
		} else if (json.results[i].backdrop_path) {
			movieImageURL.push("https://image.tmdb.org/t/p/w500/" + json.results[i].backdrop_path);
		} else {
			movieImageURL.push("https://via.placeholder.com/350x150");
		}

		//		console.log(json.results[i].id);
		img.setAttribute("src", movieImageURL[i]);
		summary.innerHTML = movieDescription[i];
		//		title.innerHTML = " Movie Title: &nbsp; " + json.results[i].original_title + " &nbsp; Release: " + json.results[i].release_date;
		//		li.appendChild(title);
		title.innerHTML = " Movie Title: &nbsp; " + movieTitle[i] + " &nbsp; Release: " + movieReleaseDate[i];
		li.appendChild(title);
		title.appendChild(summaryLabel);
		title.appendChild(summary);
		title.appendChild(imageLabel);
		title.appendChild(img);
		ol.appendChild(li);
	}
	//	console.log(movieID);
	//	console.log(movieTitle);
	//	console.log(movieReleaseDate);
	//	console.log(movieDescription);
	//	console.log(movieImageURL);
}


function titleClicked(titleElement) {
	getMovieGenre(titleElement);
	getMovieCast(titleElement);

	for (var i = 0; i < titleElement.children.length; i++) {
		if (titleElement.children[i].style.display === "none") {
			titleElement.children[i].style.display = "block";
		} else {
			titleElement.children[i].style.display = "none";
		}
	}
}

function getMovieGenre(titleElement) {
	var genereLabel = document.createElement('p');
	var title = document.getElementById("title" + titleElement.id.match(/\d+/)[0]);
	var genere = document.createElement('p');
	if (!document.getElementById("genere" + titleElement.id.match(/\d+/)[0])) {
		genere.setAttribute("id", "genere" + titleElement.id.match(/\d+/)[0]);
		genere.setAttribute("style", "display : none;");
		genereLabel.innerHTML = "Genere : ";
		genereLabel.setAttribute("style", "display : none; text-decoration: underline;font-style: italic;font-weight: bold;");
		title.appendChild(genereLabel);
		title.appendChild(genere);
	}

	var titleNumber = titleElement.id.match(/\d+/)[0];
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "php/proxy.php?method=/3/movie/" + movieID[titleNumber]); // Gets the Movie Info
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			//			console.log(json);
			for (var i = 0; i < json.genres.length; i++) {
				//				console.log(json.genres[i].name);
				genere.innerHTML += json.genres[i].name + ",";
				//				movieGenre.push(json.genres[i].name);
			}

		}
	};
	xhr.send(null);
}

function getMovieCast(titleElement) {
	//	console.log("titleElement.id " + titleElement.id.match(/\d+/)[0])
	var castLabel = document.createElement('p');

	var title = document.getElementById("title" + titleElement.id.match(/\d+/)[0]);

	var cast = document.createElement('p');
	if (!document.getElementById("cast" + titleElement.id.match(/\d+/)[0])) {
		cast.setAttribute("id", "cast" + titleElement.id.match(/\d+/)[0]);
		cast.setAttribute("style", "display : none;");
		castLabel.innerHTML = "Cast : ";
		castLabel.setAttribute("style", "display : none; text-decoration: underline;font-style: italic;font-weight: bold;");
		title.appendChild(castLabel);
		title.appendChild(cast);
	}


	var numberOfCastToPrint;
	var titleNumber = titleElement.id.match(/\d+/)[0];
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "php/proxy.php?method=/3/movie/" + movieID[titleNumber] + "/credits"); // Gets the Movie Credits
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
			//			console.log(json);
			if (json.cast.length > 5) {
				numberOfCastToPrint = 5;
			} else {
				numberOfCastToPrint = json.cast.length;
			}
			for (var i = 0; i < numberOfCastToPrint; i++) {
				cast.innerHTML += json.cast[i].name + ",";
			}
		}
	};
	xhr.send(null);

}
