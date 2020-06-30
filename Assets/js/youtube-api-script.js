var APIKey = "AIzaSyAh_yC6AbxPwNhnzH3-KXS5qTdUeXk0aDA";

//Functions that call Youtube search API 
function getVideo(searchQuery) {
    console.log(searchQuery);
    console.log(typeof (searchQuery));

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: APIKey,
            q: searchQuery,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            console.log(data)
            console.log("searhc q" + searchQuery)
            embedVideo(data)
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });
}

//Creating UI to display Music video
function embedVideo(data) {

    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    console.log("vid id " + data.items[0].id.videoId);
    console.log('https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}

//getVideo();