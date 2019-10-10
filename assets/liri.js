require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var argument = process.argv[2];
var stringArgv = process.argv;
var userInput = "";

// var startApp = function(argument) {
    for (var i = 3; i < stringArgv.length; i++) {
        if (i > 3 && i < stringArgv.length) {
            userInput =userInput + " " + stringArgv[i];
        } else {
            userInput += stringArgv[i];
        }
    }
switch (argument) {
    case "concert-this":
        concertThis(userInput);
        break;
    case "spotify-this-song":
        spotifyThisSong(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    case "hi":
        hiThere();
        break;
    case "help":
        hiThere();
        break;
    default: console.log(argument); 
        break;
};

function hiThere(){
    console.log("Well Hello! Please access one of the following commands:");
    console.log("[Concert-This]-[Spotify-This-Song]-[Movie-This]-[Do-What-It-Says]");
}

function concertThis(artist) {
    // console.log("toastadas");
    if (artist === "") {
        artist="Post Malone";
    }       
    var getBiT = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(getBiT).then(
        function (response, err) {
            if (response) {
                var infoBiT = response.data[0];
                var venueName = "Venue Name: " + infoBiT.venue.name;
                var venueLocation = "Venue Location: " + infoBiT.venue.city;
                var playTime = infoBiT.datetime;
                var removeTime = playTime.split('T');
                var venueDate = "Venue Date: " + moment(removeTime[0]).format("MM/DD/YYYY");
                var venueRecord = venueName + "," + venueLocation + "," + venueDate;
                console.log(venueName);
                console.log(venueLocation);
                console.log(venueDate);
                fs.appendFile('log.txt', venueRecord, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else console.log("updated txt file");
                });
            }else{                
                console.log(err);
            }
        }); 
}

function spotifyThisSong(userSong) {
    if (userSong === "") {
        userSong = "Circles";}
        {
        spotify.search({
        type: 'track',
        query: "'" + userSong + "'",
        limit: 20
    }, function (err, data) {
        var artist = "Artist(s): " + data.tracks.items[0].artists[0].name;
        var songName = "Song Title: " + data.tracks.items[0].name;
        var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;
        var albumName = "Album Name: " + data.tracks.items[0].album.name;
        console.log(artist);
        console.log(songName);
        console.log(previewLink);
        console.log(albumName);
        if (err) {
            console.log("Unable to comply: " + userSong + " : " + err);
        }
        var songRecord = artist + songName + previewLink + albumName;
        fs.appendFile('log.txt', songRecord, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
}
}

function movieThis(userMovie) {
    if (userMovie === "") {
    userMovie="Interstellar";}
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);
    
    axios.get(queryUrl).then(function (response, err) {
        console.log(err ? 'Errors occurred: ' + err : "");
        if (response) {
            var infoA = response.data;
            console.log("Title: " + infoA.Title);
            console.log("Release Year: " + infoA.Year);
            console.log("Rated: " + infoA.Rated);
            console.log("Actors: " + infoA.Actors);
            console.log("IMDB Rating: " + infoA.imdbRating);
            console.log("Rotten Tomatoes Rating: " + infoA.rottenTomatoesRating); 
            console.log("Country/Countries Filmed: " + infoA.Country);
            console.log("Language(s): " + infoA.Language);
            console.log("Plot: " + infoA.Plot);
        }else{                
            console.log(err);
        }
    });
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
			return console.log("Unable to comply." + error);
		}else{
		var dataArr = data.split(",");
		action = dataArr[0];
        userInput = dataArr[1];
        userSong = action + "" + userInput;
		switch (action) {
            case "concert-this":
                concertThis(userInput);
                break;
            case "spotify-this-song":
                spotifyThisSong(userInput);
                break;
            case "movie-this":
                movieThis(userInput);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            case "hi":
                hiThere();
                break;
            case "help":
                hiThere();
                break;
            default: console.log(argument); 
                break;
        };
        }
    }); 
}
// startApp();
