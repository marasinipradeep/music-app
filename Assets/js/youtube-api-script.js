var APIKey = "AIzaSyCRwjWzLpUR-YYjGj0vFxbD_5QWfST1FXQ";


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
      success: function(data){
          console.log(data)
          embedVideo(data)
      },
      error: function(response){
          console.log("Request Failed");
      }
    });
  }

  function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    $('.description').text(data.items[0].snippet.description)
}

getVideo();


// This is html code for youtube api test

{/* <iframe src=""></iframe>
<h3>Video Title</h3>
<p class="description">Video Description<p></p> */}