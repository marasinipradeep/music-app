// youtube apikey
var APIKeyArr = [
    "AIzaSyDgAYYwK8WgfhsMgVUgjY83ih48oYZeYsw",
    "AIzaSyCRwjWzLpUR-YYjGj0vFxbD_5QWfST1FXQ",
    "AIzaSyDT443X8rOkADMwDuoL5aGVva1y0sTx4jo",
    "AIzaSyDykkL0_WQwJ6uprmhzboabBlymByGjX-U",
];
var randomNumber = Math.floor(Math.random() * APIKeyArr.length);

//Functions that call Youtube search API 
function getVideo(searchQuery) {

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: APIKeyArr[randomNumber],
            q: searchQuery,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            embedVideo(data)
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });
}

//Creating UI to display Music video
function embedVideo(data) {

    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
}
