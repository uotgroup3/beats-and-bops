//variables
// var songName = document.querySelector('#song-name');
// var artistName = document.querySelector('#artist-name');
var albumCover = document.querySelector('#album-cover');
var playCircle = document.querySelector('.circle');
var searchEl = document.querySelector('.search-icon');
var playBtn = document.querySelector('.play-button');
var spotifyIframe = document.querySelector('.spotifySong');
var spotifyEl = document.querySelector('.spotify');
var searchInfo = document.querySelector('.search-box');
//artist information from the audiodb
var artistInfo = document.querySelector('.artist-info');
// res.setHeader("Access-Control-Allow-Origin", "*");


// // This function gets us an access token to use throughout other functions
// //private post request to get token from spotify
var getToken = async () => {
    var clientId = 'ef677111698447b4a02f98e0e528437b';
    var clientSecret = '6c7ee80f21e4421fa6b1ffd398fbde00'; 
    var base64Encode = btoa(clientId + ':' + clientSecret);
    
    var spotify_api_url = 'https://accounts.spotify.com/api/token';
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var corsSpotifyURL = cors_api_url + spotify_api_url;
    console.log(corsSpotifyURL);

    // console.log(base64Encode);
    var result = await fetch(corsSpotifyURL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + base64Encode
        },
        body: 'grant_type=client_credentials'
    });
    data = await result.json();
    console.log(data.access_token);
    return data.access_token;
}

//search button clicked
document.addEventListener('keypress' , function(e) {
    if (e.key === 'Enter'){
        var searchInfo = $('.search-box').val();
        if (searchInfo === "" || searchInfo === null){
            console.log("no input");
        }
        else {

            // console.log("Randmon something " + data.access_token);
            var access = data.access_token;
            console.log(access);
            //get value of search box
            //accessToken will need to be created as this one expires see below apiController for potential solution
            // console.log(accessToken);
            
            //Make spotify API call using track endpoint
            $.ajax({
                url: `https://api.spotify.com/v1/search?q=${searchInfo}&type=track`,
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + access
                },
                //if call was successful, show data
                success: function(data) {
                    //load songs from Spotify onto page
                    console.log(data);
                    //load songs from Spotify
                    loadSong(data);
                }
            })        
        }
    }
});

//trackInfo is data from search button click
//this function loads the song information at bottom right corner
function loadSong(trackInfo) {
    //song id
    var id = trackInfo.tracks.items[0].id;
    //when song is loaded, load play button on visualizer
    //spotify Player
    spotifyIframe.style.display = 'block';
    spotifyIframe.setAttribute('src', `https://open.spotify.com/embed/track/${id}`);

    //Artist information appears from Audio API
    getInfo(trackInfo);
};

function getInfo(trackInfo) {
    const artistName = trackInfo.tracks.items[0].artists[0].name;
    console.log(artistName);

    var apiURL = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artistName}`;

    fetch(apiURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data, artistName);
        displayInfo(data, artistName);
    }) 
}

function displayInfo(data, artistName) {
    //artist element
    var songArtist = document.querySelector('#artist');
    songArtist.textContent = 'Artist: ' + artistName;
    console.log(songArtist);
    
    //artist birth
    var artistBirth = document.querySelector('#artist-born');
    artistBirth.textContent = 'Birth Year: ' + data.artists[0].intBornYear;
    console.log(artistBirth);
    
    //artist genre
    var artistGenre = document.querySelector('#artist-genre');
    artistGenre.textContent = 'Genre: ' + data.artists[0].strGenre;
    console.log(artistGenre);
}


getToken();