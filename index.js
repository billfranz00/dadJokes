const fs = require("fs");
const request = require("request");
const prompt = require("prompt");

// var args = process.argv.slice(2);

// var searchTerm = args.join(" "),

prompt.start();

prompt.get('Search for a joke', function(err, result) {
	var searchTerm = result['Search for a joke'],
		parameters = {
			url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
			headers: {"Accept": "application/json"}
		};

	request(parameters, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var jokes = JSON.parse(body);
			if(jokes.total_jokes < 1) {
				console.log("No jokes were found with your search term bro, try again ;)")
			}
			else { // selects random joke from array of jokes
				console.log(jokes.results[Math.floor(Math.random() * jokes.total_jokes)].joke);
			}
		}
	})
})