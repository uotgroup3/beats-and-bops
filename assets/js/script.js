//variables
var songName = document.querySelector('#song-name');
var artistName = document.querySelector('#artist-name');
var albumCover = document.querySelector('#album-cover');
var playCircle = document.querySelector('.circle');
var playBtn = document.querySelector('.play-button');

//This function gets us an access token to use throughout other functions
//IIFE immediately invoked js expression
// var apiController = (function() {
//     var clientId = 'ef677111698447b4a02f98e0e528437b';
//     var clientSecret = '0ad72dace42f4cf796c70cb87cec8fec';
//     var base64Code = clientId + clientSecret;
    
//     var getToken = async () => {
//         var result = await fetch('https://accounts.spotify.com/api/token',{
//             type: 'POST',
//             headers: {
//                 'Authorization' : 'bearer ' + base64Code  
//             }
//         });
    
//         var data = await result.json();
//         return data.access_token;
//     };

    // //private post request to get token from spotify
    // var getToken = async () => {
    //     var result = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/x-www-form-urlencoded',
    //             'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    //         },
    //         body: 'grant_type=client_credentials'
    //     });

    //     var data = await result.json();
    //     console.log(data);
    //     return data.access_token;
    // }
// () causes function to launch immediately
// })();


//search button clicked
$('.search-icon').click(function() {
    //get value of search box
    var searchInfo = $('.search-box').val();
    //accessToken will need to be created as this one expires see below apiController for potential solution
    var accessToken = 'BQBGtyTg1SBiGfUphEP38z5dja2B4M4_aXpZCW47AgjlybuSAxwFcVNR9qvOaLKAmF3-JjCaIpvHbnb66YMUXqX4uLCk-txtCfaJlzo0p0A_8yPevIm5njZ3_6hpZ4boxaPHIqGJWkUcBqR7Fcw1ebMkr6g5HgGwg6E';
    
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

    //when song is loaded, load play button on visualizer
    playBtn.style.display = 'block';

};

//when playbutton is clicked, go to playfunction
$('.play-button').click(function() {
    playSong();
})

//playSong function
function playSong() {
    console.log("NEVERRR");
    //this will need if/else for pausing and continuing song blah blah blah
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