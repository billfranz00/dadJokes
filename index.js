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
			else {
				var theJoke = jokes.results[Math.floor(Math.random() * jokes.total_jokes)].joke;
				console.log(theJoke);
				fs.appendFile('jokes.txt', "Joke: " + theJoke, function(err) {
					if(err) throw err;
					console.log(`${searchTerm} joke added`);
					if(process.argv.slice(2) == "leaderboard") {
						fs.readFile('jokes.txt', function(err, data) {
							var jokesArray = data.toString().split("Joke: ").slice(1),
								jokesObj = {},
								mostJokes = 0,
								leader = "no leader";
							// Add jokes to object and count how many times they occur
							jokesArray.forEach(function(val) {
								if(val in jokesObj) {
									jokesObj[val] += 1;
								}
								else {
									jokesObj[val] = 1;
								}
							})
							// Detemine the joke that occurs the most
							for(var i in jokesObj) {
								if(jokesObj[i] > mostJokes) {
									mostJokes = jokesObj[i];
									leader = i;
								}
								else if(jokesObj[i] == mostJokes) {
									leader = "it's a tie";
								}
							}
							console.log("Top Joke: " + leader);
						})
					}
				});
			}
		}
	})
})