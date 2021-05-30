//variables
var songName = document.querySelector('#song-name');
var artistName = document.querySelector('#artist-name');
var albumCover = document.querySelector('#album-cover');
var playCircle = document.querySelector('.circle');

var playBtn = document.querySelector('.play-button');
var spotifyIframe = document.querySelector('.spotifySong');

// //request token from spotify
// var request = require('request'); //'request' library
// var clientId = 'ef677111698447b4a02f98e0e528437b';
// var clientSecret = '0ad72dace42f4cf796c70cb87cec8fec';

// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//         'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret.toString('base64')))
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json:true
// }

// request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         //use access token to access Spotify Web API
//         var accessToken = body.access_token;
//         var options = {
//             url: 'https://api.spotify.com/v1/users/jmperezperez',
//             headers: {
//                 'Authorization' : 'Bearer ' + accessToken
//             },
//             json: true
//         };
//         request.get(options, function(error, response, body) {
//             console.log(body);
//         });
//     }
// });

// This function gets us an access token to use throughout other functions
// IIFE immediately invoked js expression
// var apiController = (function() {
//     var clientId = 'ef677111698447b4a02f98e0e528437b';
//     var clientSecret = '0ad72dace42f4cf796c70cb87cec8fec'; 

//     //private post request to get token from spotify
//     var getToken = async () => {
//         var result = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/x-www-form-urlencoded',
//                 'Authorization' : 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64)'))
//             },
//             body: 'grant_type=client_credentials'
//         });

//         var data = await result.json();
//         console.log(data);
//         return data.access_token;
//     }

//     var test = getToken();
//     console.log(test);

//     function getToken() {
//         var apiUrl = 'https://accounts.spotify.com/api/token';

//         fetch(apiUrl)
//             .then(function(response) {
//                 return response.json();
//             })
//             .then(function(data) {
//                 console.log(data)
//             })
//     }

// // () causes function to launch immediately
// })();



//search button clicked
$('.search-icon').click(function() {
    //get value of search box
    var searchInfo = $('.search-box').val();
    //accessToken will need to be created as this one expires see below apiController for potential solution
    var accessToken = 'BQBKTREElA6JI-IhOPC3lZNNd7_0C2ORG18tK7axYvIXbaYMX8LN_IqKgTz0LsIhgsjMCLCcLCfEb5AReTLJ6ngcSz0cLbiwDmLhmCouTPgoY8lZUeKppFgk7IjFb9hbXiaLTYBerIrBs7QSyvajB36rBvH-37wu0Ag'

    //Make spotify API call using track endpoint
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${searchInfo}&type=track`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        //if call was successful, show data
        success: function(data) {
            //load songs from Spotify onto page
            console.log(data);
            //load songs from Spotify
            loadSong(data);
        }
    })
})

//trackInfo is data from search button click
//this function loads the song information at bottom right corner
function loadSong(trackInfo) {
    // var searchInfo = $('.search-box').val();
    
    //Album cover img
    albumCover.setAttribute('src', trackInfo.tracks.items[0].album.images[0].url)
    //Song name
    var song = trackInfo.tracks.items[0].name;
        songName.textContent = song;
        console.log(song);

    //Artist name
    var artist = trackInfo.tracks.items[0].artists[0].name;
        artistName.textContent = artist;
        console.log(artist);

    //song id
    var id = trackInfo.tracks.items[0].id;

    //when song is loaded, load play button on visualizer
    playBtn.style.display = 'block';

    //spotify Player
    spotifyIframe.style.display = 'block';
    spotifyIframe.setAttribute('src', `https://open.spotify.com/embed/track/${id}`);


};

//when playbutton is clicked, go to playfunction
$('.play-button').click(function() {
    playSong();
    // searchInfo.textContent = '';
})

//playSong function
function playSong() {
    console.log("NEVERRR");
    //this will need if/else for pausing and continuing song blah blah blah

    // var iframe = document.createElement('iframe');
    // iframe.className('spotifySong');
    
}
















////////////////////////////////////////////


// //using token from data above, search for song using Get method
// var getSong = async (token) => {
//     var result = await fetch(`https://api.spotify.com/v1/search?q=sucker&type=track`, {
//         method: 'GET',
//         headers: { 'Authorization' : 'Bearer ' + token }
//     });
//     var data = await result.json();
//     console.log(data);
//     return data; 
// }