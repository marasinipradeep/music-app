var musicStyle = [
  "music-guitar",
  "classic-music",
  "music-metal",
  "piano-music",
];

// Tenor gif api

var APIKey = "ZFKX4SZGA5FO";
queryURL =
  "https://api.tenor.com/v1/search?q=" +
  musicStyle[Math.floor(Math.random() * (musicStyle.length +1))] +
  "&key=ZFKX4SZGA5FO&limit=1";

  // This is Giphy gif api, not that accurate, could be spare api
  // var APIKey = "iVX91FyysEevZSL0k2Fuo7MUT7i9ntZE";
// queryURL = "https://api.giphy.com/v1/gifs/search?q="+ musicStyle[Math.floor(Math.random() * 4)] +"&api_key="+APIKey+"&limit=1" ;
console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET",
  dataType: "json",
}).then(function (response) {
  var gif = $("<img>");
  gif.attr("src", response.results[0].media[0].gif.url);
  // gif.attr("src", response.data[0].images.original.url);
  $("#gif-wrap").append(gif);
});
