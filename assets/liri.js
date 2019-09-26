require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var argument = process.argv[2];
var stringArgv = process.argv;
var artist = "";
var userSong = "";
var userMovie = "";
var noUser = dowhatitsays()

for (var i = 3; i < stringArgv.length; i++) {
    if (i > 3 && i < stringArgv.length) {
        artist = artist + " " + stringArgv[i];
        userSong = userSong + " " + stringArgv[i];
        userMovie = userMovie + "+" + stringArgv[i];
    } else {
        artist += stringArgv[i];
        userSong += stringArgv[i];
        userMovie += stringArgv[i];
    }
}

switch (argument) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        dowhatitsays();
        break;
    case "hi":
        hiThere();
        break;
    case "help":
        hiThere();
        break;
    default: console.log(argument); break;
}

function hiThere(){
    console.log("Well Hello! Please access one of the following commands:");
    console.log("[Concert-This]-[Spotify-This-Song]-[Movie-This]-[Do-What-It-Says]");
}

function concertThis() {
    if (artist === "") {
        artist="Ted Nugent";
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

function spotifyThisSong() {
    if (userSong === "") {
        userSong = "The Sign Ace of Base";}
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

function movieThis() {
    if (userMovie === "") {
    userMovie="Batman";}
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);
    
    axios.get(queryUrl).then(function (response, err) {
        console.log(err ? 'Errors occurred: ' + err : "");
        if (response) {
            var infoA = response;
            console.log(infoA);
            console.log("Title: " + response.Title);
            console.log("Release Year: " + JSON.parse(data).Year);
            console.log("Rated: " + JSON.parse(this).Rated);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rottenTomatoesRating); 
            console.log("Country/Countries Filmed: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
        }else{                
            console.log(err);
        }
    });
}

function movieThis() {
    if (userMovie === "") {
    userMovie="Mr.+Nobody";}
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(function (response, err) {
       
        console.log(err ? 'Errors occurred: ' + err : "");
        if (response) {
          
            console.log("Retrieving movie information for " + userSong);
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Actors: " + response.data.Actors);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.rottenTomatoesRating);
            console.log("Country/Countries Filmed: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
        }else{                
            console.log(err);
        }
    });
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", (err, data)); {
        if (err) {
			return console.log("Unable to comply." + error);
		}else{
		var dataArr = data.split(",");
		action = dataArr[0];
        songTitle = dataArr[1];
        var userSong = action + "" + songTitle;
		spotifyThisSong();
        }
    }
}