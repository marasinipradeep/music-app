//giphy
//emVJkP2qAM1mr95yGqEgW0VXJHEfbTbO

init()
function init() {
    testForMusicGify()
}

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
}

function musicAppHeading() {
    $("#header #appTitle").text("your choice of music...")
    $("#header #appSubTitle").text(moment().format('dddd, MMMM Do'))
    testForMusixMatch()

}


function testForMusixMatch() {
    var musixMatch = {
        // url:"https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&apikey=22367be604a190be776a8418c415fbd9",

        //Artist search
        // url:"https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=prodigy&page_size=5&apikey=22367be604a190be776a8418c415fbd9",

        // I want the top 3 tracks of Justin Bieber, sorted by track rating
        // url: "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc&apikey=22367be604a190be776a8418c415fbd9",


        // Get the lyrics for the track id 15953433
        // url: "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=22367be604a190be776a8418c415fbd9",


        //  I want the track with Musixmatch commontrack_id 5920049
        url: "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=5920049&apikey=22367be604a190be776a8418c415fbd9",
        method: "GET",
    };

    $.ajax(musixMatch).done(function (response) {
        console.log("inside testForMusixMatch()")
        var parsedResponse = JSON.parse(response)
        //console.log(parsedResponse.message.body.lyrics.lyrics_body)
        console.log(parsedResponse)

    });

}

function testForMusicGify() {
    var musicGify = {
        url: "https://api.giphy.com/v1/gifs/search?q=music+bands&api_key=emVJkP2qAM1mr95yGqEgW0VXJHEfbTbO&limit=5",
        method: "GET"
    };
    $.ajax(musicGify).done(function (response) {
        console.log("inside testForMusicGify()")
        console.log(response.data[0].images.downsized.url)
        var newgifOne = $("<img>").attr({ "src": response.data[0].images.downsized.url }).height(100).width(100).css("margin-right", "50px")
        var newgifTwo = $("<img>").attr({ "src": response.data[1].images.downsized.url }).height(100).width(100).css("margin-left", "50px")
        $("#startButton").before(newgifOne)
        $("#startButton").after(newgifTwo)
    });
   
}


$("#startButton").on("click", onStartButtonClicked)