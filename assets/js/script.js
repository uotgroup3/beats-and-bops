// //Variables
// var searchCont = document.querySelector('#search-container');
// var searchForm = document.querySelector('.test');
// var searchInfo = document.querySelector('.search-box');

// //form entry submitted
// function formSubmit(event) {
//     event.preventDefault();

//     //song and artist inputs
//     var track = searchInfo.value.trim();
//     console.log(track);
//     //clear song input
//     // songInput.textContent = '';

//     // if(song) {
//     //     getSong(song);
//     // } 
//     // else {
//     //     alert('Please enter a song and artist!');
//     // }
//     // searchSong(track);
//     getSong();
// }



// //Listen for song click & artist click
// searchForm.addEventListener('click', formSubmit);


////////////////////////////////////////////

//search button clicked
$('.search-icon').click(function() {
    //get value of search box
    var searchInfo = $('.search-box').val();
    var accessToken = 'BQAsCGeyIo2EzosC6cndaj95U_mVZXUJpmypwteWpeZ9qJF1nt36u3BZdsWkoTnI_O3lbksoSHlT5Uy2I_QSRbeh_837kkxJtbTrFzTKN6imTLrCYQMjS5EnPUY_klQFOCJZNZiDv8SwGoWjavSCgBxtCOJ71g6ym1g';
    
    //Make spotify API call using track endpoint
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${searchInfo}&type=track`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {
            //load songs from Spotify onto page
            console.log(data);
        }
    })
})



















////////////////////////////////////////////

// //This function gets us an access token to use throughout other functions
// //IIFE immediately invoked js expression
// var apiController = (function() {
//     var clientId = 'ef677111698447b4a02f98e0e528437b';
//     var clientSecret = '0ad72dace42f4cf796c70cb87cec8fec';

//     //private post request to get token from spotify
//     var getToken = async () => {
//         var result = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/x-www-form-urlencoded',
//                 'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credentials'
//         });

//         var data = await result.json();
//         console.log(data);
//         return data.access_token;
//     }
// //() causes function to launch immediately
// })();

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