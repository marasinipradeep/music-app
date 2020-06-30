var APIKey = "AIzaSyCRwjWzLpUR-YYjGj0vFxbD_5QWfST1FXQ";

//Functions that call Youtube search API 
function getVideo() {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: APIKey,
            q: "pop music",
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            console.log(data)
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
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}

//getVideo();