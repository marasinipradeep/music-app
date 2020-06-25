var apikey = "93475fc351db3cd74a4a74ee50699a7e";

var search = "505";

// var musixUrl = `http://api.musixmatch.com/ws/1.1/?q=${search}&page_size=3&page=1&apikey=${apikey}`;
var musixUrl = "https://api.musixmatch.com/ws/1.1/track.search?q_artist=arctic-monkeys&format=jsonp&callback=callback&quorum_factor=1&apikey=" + apikey;
console.log(musixUrl);
$.ajax({
    url: musixUrl,
    method: "GET",
    dataType: "jsonp"


}).then(function (music) {
    console.log(music);
    for (let i = 0; i < 50; i++) {
        console.log(music.message.body.track_list[i].track.album_name);

    }
});