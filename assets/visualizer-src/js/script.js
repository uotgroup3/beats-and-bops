//variables
var songName = document.querySelector('#song-name');
var artistName = document.querySelector('#artist-name');
var albumCover = document.querySelector('#album-cover');
var playCircle = document.querySelector('.circle');
var searchEl = document.querySelector('.search-icon');
var playBtn = document.querySelector('.play-button');
var spotifyIframe = document.querySelector('.spotifySong');
var spotifyEl = document.querySelector('.spotify');

// // This function gets us an access token to use throughout other functions
// //private post request to get token from spotify
var getToken = async () => {
    var clientId = 'ef677111698447b4a02f98e0e528437b';
    var clientSecret = '6c7ee80f21e4421fa6b1ffd398fbde00'; 
    var base64Encode = btoa(clientId + ':' + clientSecret);
    // console.log(base64Encode);
    var result = await fetch('https://accounts.spotify.com/api/token', {
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

        console.log("Randmon something " + data.access_token);
        var access = data.access_token;
        console.log(access);
        //get value of search box
        var searchInfo = $('.search-box').val();
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
        ////////////////////
        // ON CLICK OF SEARCH SONG, VISUALIZER SHOULD LOAD AUTOMATICALLY RATHER THAN WHEN PLAY SONG IS CLICKED
    }
});

//trackInfo is data from search button click
//this function loads the song information at bottom right corner
function loadSong(trackInfo) {
    var searchInfo = $('.search-box').val();
    //song id
    var id = trackInfo.tracks.items[0].id;
    // //when song is loaded, load play button on visualizer
    //spotify Player
    spotifyIframe.style.display = 'block';
    spotifyIframe.setAttribute('src', `https://open.spotify.com/embed/track/${id}`);    
};

var cssLink = '';

getToken();