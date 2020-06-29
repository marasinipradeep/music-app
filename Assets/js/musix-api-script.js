var apikey = "93475fc351db3cd74a4a74ee50699a7e";
var song;
var artist;



// QUESTION 1
// click on country -US
var country = "US";

function getCountry(savedArrayOfChoices) {

    console.log("inside get country method")
    console.log(...savedArrayOfChoices)
    console.log(savedArrayOfChoices[0])
    console.log(savedArrayOfChoices[1])
    console.log(savedArrayOfChoices[2])
    console.log(savedArrayOfChoices[3])
}



// QUESTION 2 - display popular artists from country
var chartQuery = `chart.artists.get?page=1&page_size=4&country=${country}`;
var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${apikey}`;
console.log(musixUrl);
$.ajax({
    url: musixUrl,
    method: "GET",
    dataType: "jsonp"
}).then(function (music) {
    for (let i = 0; i < 4; i++) {
        console.log("q2");
        console.log(music.message.body.artist_list[i].artist.artist_name);
        console.log(music.message.body.artist_list[i].artist.artist_id);
        addArtist(music.message.body.artist_list[i].artist.artist_id);
    }
});





// QUESTION 3
// click on related artist from popular artist -artist_id
var artist_id = 27082035;

var chartQuery = `artist.related.get?artist_id=${artist_id}&page_size=4&page=1`;

var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${apikey}`;
console.log(musixUrl);
$.ajax({
    url: musixUrl,
    method: "GET",
    dataType: "jsonp"


}).then(function (music) {
    console.log(music)
    for (let i = 0; i < 4; i++) {
        console.log("q3");
        console.log(music.message.body.artist_list[i].artist.artist_name);
        console.log(music.message.body.artist_list[i].artist.artist_id);
        addArtist(music.message.body.artist_list[i].artist.artist_id);
    }
});




// QUESTION 4
// click on album from related_artist_id
var related_artist_id = 237684;
var chartQuery = `artist.albums.get?artist_id=${related_artist_id}&s_release_date=desc&page_size=4`;

var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${apikey}`;
console.log(musixUrl);
$.ajax({
    url: musixUrl,
    method: "GET",
    dataType: "jsonp"


}).then(function (music) {
    console.log(music)
    for (let i = 0; i < 4; i++) {
        console.log("q4");
        console.log(music.message.body.album_list[i].album.album_name);
        console.log(music.message.body.album_list[i].album.album_id);
        addArtist(music.message.body.album_list[i].album.album_id);
    }
});



// QUESTION 5
// click on song for related album
var album_id = 31755622;
var chartQuery = `album.tracks.get?album_id=${album_id}&page=1&page_size=4`;
var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${apikey}`;
console.log(musixUrl);
$.ajax({
    url: musixUrl,
    method: "GET",
    dataType: "jsonp"

}).then(function (music) {
    console.log(music)
    for (let i = 0; i < 4; i++) {
        console.log("q5");
        console.log(music.message.body.track_list[i].track.track_name);
        addArtist(music.message.body.track_list[i].track.track_name);
    }
});

function addArtist(artistId) {
    var newArtist = $("<p>");
    newArtist.text(artistId);
    newArtist.on("click", function () {
        // console.log($(this).text());
        song = ($(this).text())
        // console.log(song);
    });
    $("#artist").append(newArtist);
}

var btn = $("#btn");
btn.on("click", function () {
    console.log(song);
    $("#song").append($("<h1>").text(song));
});

//Call this function which will do rest of things to show music video
getVideo("Pass search query string here");
