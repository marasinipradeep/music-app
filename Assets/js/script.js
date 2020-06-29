//giphy
//emVJkP2qAM1mr95yGqEgW0VXJHEfbTbO

// counter to determine which question to show
var counter = 0;

// declaring global string for choice made
var choice = "";

// ????
init()
function init() {
}


// header
function musicAppHeading() {
    $("#header #appTitle").text("your choice of music...")
    $("#header #appSubTitle").text(moment().format('dddd, MMMM Do'))

}

// question objs, holding question, options and their respective values
// q1
var q1 = {
    Question: "What is your favourite pizza topping?",
    Options: ["Australia", "America", "German", "India"],
    Values: ["AU", "US", "UK", "CA"]
}

// q2
var q2 = {
    Question: "What is your favourite movie?",
    Options: ["Jazz", "Rock", "Classic", "Pop"],
    Values: [0, 1, 2, 3]
}

// q3
var q3 = {
    Question: "What closest matches your personality?",
    Options: ["Australia", "America", "German", "India"],
    Values: [0, 1, 2, 3]
}

// q4
var q4 = {
    Question: "What’s the first thing you do if you won $10m dollars?",
    Options: ["Australia", "America", "German", "India"],
    Values: [0, 1, 2, 3]
}

// q5
var q5 = {
    Question: "What is your favourite sport?",
    Options: ["Australia", "America", "German", "India"],
    Values: [0, 1, 2, 3]
}

// array of the question objs
var arrayOfQuestions = [];
arrayOfQuestions.push(q1, q2, q3, q4, q5);

// check array
console.log(arrayOfQuestions);

// push answer into array then push the array into a long ass ajax call 
var savedArrayOfChoices = []


// when start button is clicked add and remove a bunch of classes
// fix up later
function onStartButtonClicked() {
    $("#description").addClass("hide");
    $("#startButton").addClass("hide");
    $("#header").removeClass("hide")
    $("#header").addClass("show");
    $("img").addClass("hide")
    $("#initialPage").addClass("hide")

    $(".panel").removeClass("hide")
    $(".panel").addClass("show")

    $(".flex-video").removeClass("hide")
    $(".flex-video").addClass("show")
    musicAppHeading()
    showQuestion(counter)
}


// shows the current question in relation to counter
// works not sure how but it do
function showQuestion(counter) {
    // console.log("Counter is : " + counter)
    var newDiv = $("<div>").addClass("row")
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv")

    // console.log(arrayOfQuestions[counter].Question);

    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question)
    newDiv.append(newLegend, newFieldSet)
    $(".inputForm").append(newDiv)
    showOption(counter)
}


// show the options for the question in relation to counter
function showOption(counter) {

    for (let i = 0; i < arrayOfQuestions[counter].Options.length; i++) {

        // declaring the option and value vars
        var option = arrayOfQuestions[counter].Options[i];
        var value = arrayOfQuestions[counter].Values[i];




        // creating an answer btn for each option
        var ansBtn = $("<button>").text(option);
        // adding classes button success and optionsButton
        ansBtn.addClass("button success optionsButton");
        // adding attributes type button, id of value
        ansBtn.attr({ type: "button", id: `${value}` });

        // on click ansBtn
        ansBtn.on("click", function (event) {
            // prevent page from reloading
            event.preventDefault();

            // increase counter
            counter++;

            // log the click
            // console.log($(this).attr("id"));
            // set choice to the id
            choice = $(this).attr("id");

            savedArrayOfChoices.push(choice);
            // empty the input form
            $(".inputForm").empty();


            // if the counter is above the length of the array then alert end of question
            if (counter === arrayOfQuestions.length) {
                alert("End of questions");
                // console.log(savedArrayOfChoices);
                findSong();
            }
            // else increase counter and repeat the func
            else {
                showQuestion(counter);

            }
        });
        // adds btns to screen
        $(".newDiv").append(ansBtn);

    }
}



function findSong() {
    // declaring all vars
    var pickCountry = savedArrayOfChoices[0];
    var pickArtist = savedArrayOfChoices[1];
    var pickRelatedArtist = savedArrayOfChoices[2];
    var pickAlbum = savedArrayOfChoices[3];
    var pickSong = savedArrayOfChoices[4];
    // console.log(pickCountry, pickArtist, pickRelatedArtist, pickAlbum, pickSong);

    // musixapikey
    var musixApikey = "93475fc351db3cd74a4a74ee50699a7e";

    // pushing country, returns artist
    var chartQuery = `chart.artists.get?page=1&page_size=4&country=${pickCountry}`;
    var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${musixApikey}`;

    $.ajax({
        url: musixUrl,
        method: "GET",
        dataType: "jsonp"

    }).then(function (music) {
        // debug log
        // console.log("artistName " + music.message.body.artist_list[pickArtist].artist.artist_name);
        // console.log("artistID " + music.message.body.artist_list[pickArtist].artist.artist_id);

        // declaring artistId and artistname
        var artistId = music.message.body.artist_list[pickArtist].artist.artist_id;
        var artistName = music.message.body.artist_list[pickArtist].artist.artist_name;

        // pushing artistid, returns related artist
        var chartQuery = `artist.related.get?artist_id=${artistId}&page_size=4&page=1`;
        var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${musixApikey}`;

        $.ajax({
            url: musixUrl,
            method: "GET",
            dataType: "jsonp"

        }).then(function (music) {

            // declaring related artist id and name
            var relatedArtistId;
            var relatedArtistName;

            // if no related artists, just use artist
            if (music.message.body.artist_list.length === 0) {
                relatedArtistId = artistId;
                relatedArtistName = artistName;
            }
            // otherwise use the related artist
            else {
                // debug log
                // console.log("relatedartistName " + music.message.body.artist_list[pickRelatedArtist].artist.artist_name);
                // console.log("relatedartistID " + music.message.body.artist_list[pickRelatedArtist].artist.artist_id);

                relatedArtistId = music.message.body.artist_list[pickRelatedArtist].artist.artist_id;
                relatedArtistName = music.message.body.artist_list[pickRelatedArtist].artist.artist_name;

            }

            // pushing relatedArtistId, returns album
            var chartQuery = `artist.albums.get?artist_id=${relatedArtistId}&s_release_date=desc&page_size=4`;
            var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${musixApikey}`;

            $.ajax({
                url: musixUrl,
                method: "GET",
                dataType: "jsonp"

            }).then(function (music) {

                // debug log
                // console.log("albumName " + music.message.body.album_list[pickAlbum].album.album_name);
                // console.log("albumID " + music.message.body.album_list[pickAlbum].album.album_id);

                // declaring album id
                var albumId = music.message.body.album_list[pickAlbum].album.album_id

                // pushing albumID, returns song
                var chartQuery = `album.tracks.get?album_id=${albumId}&page=1&page_size=4`;
                var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${musixApikey}`;

                $.ajax({
                    url: musixUrl,
                    method: "GET",
                    dataType: "jsonp"

                }).then(function (music) {
                    // declaring song name
                    var songName;

                    // if statements depending on how big the album is, not perfect, but functions
                    if (music.message.body.track_list.length === pickSong) {
                        songName = music.message.body.track_list[pickSong].track.track_name;

                    }
                    else if (music.message.body.track_list.length === 3) {
                        songName = music.message.body.track_list[2].track.track_name;

                    }
                    else if (music.message.body.track_list.length === 2) {
                        songName = music.message.body.track_list[1].track.track_name;

                    }
                    else {
                        songName = music.message.body.track_list[0].track.track_name;
                    }

                    // push to screen
                    console.log(`${songName} by ${relatedArtistName}`);

                });
            });

        });
    });



}




$("#startButton").on("click", onStartButtonClicked);

