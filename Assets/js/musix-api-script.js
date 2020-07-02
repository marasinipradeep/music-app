// musixapikey
var musixApikey = "93475fc351db3cd74a4a74ee50699a7e";

// finds song dependent to what the user selects in the quiz
function findSong(savedArrayOfChoices) {
    // declaring all vars according to savedArrayOfChoices 
    var pickCountry = savedArrayOfChoices[0];
    var pickArtist = savedArrayOfChoices[1];
    var pickRelatedArtist = savedArrayOfChoices[2];
    var pickAlbum = savedArrayOfChoices[3];
    var pickSong = savedArrayOfChoices[4];

    // pushing country into chartQuery, returns artist
    var chartQuery = `chart.artists.get?page=1&page_size=4&country=${pickCountry}`;
    var musixUrl = `https://api.musixmatch.com/ws/1.1/${chartQuery}&format=jsonp&callback=callback&quorum_factor=1&apikey=${musixApikey}`;

    $.ajax({
        url: musixUrl,
        method: "GET",
        dataType: "jsonp"

    }).then(function (music) {

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

                // declaring album id
                var albumId = music.message.body.album_list[pickAlbum].album.album_id;

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

                    // if statements depending on the size of the album
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
                    // finds video with youtube api
                    // getVideo(`${songName} ${relatedArtistName}`);

                    // sets the text of final-artist-song to the song and artist that is found
                    $("#final-artist-song").text(`${songName} by ${relatedArtistName}`);
                });
            });
        });
    });
}