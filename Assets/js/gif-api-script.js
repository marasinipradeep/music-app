var musicStyle = ["music guitar","classic music","metal music","piano music"];
var APIKey = "iVX91FyysEevZSL0k2Fuo7MUT7i9ntZE";
queryURL = "https://api.giphy.com/v1/gifs/search?q="+ musicStyle[Math.floor(Math.random() * 4)] +"&api_key="+APIKey+"&limit=1" ;
console.log(queryURL);
 $.ajax({
   url:queryURL,
   method:"GET",
   dataType:"json"
 }).then(function(response){
var gif = $("<img>");
gif.attr("src", response.data[0].images.original.url);
$("#gif-wrap").append(gif);
 })