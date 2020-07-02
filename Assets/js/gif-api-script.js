var APIKey = "ZFKX4SZGA5FO";
//Country Input: au, us, uk, ca
var uk = ["UK","uk flag"];
var aus = ["Australia","australia flag"];
var us =["USA","us flag"];
var ca =["Canada","canada flag"] ;

// Music Genre Input: classic, rock, pop, jazz
var classic =["Classic Music","classic music"];
var rock = ["Rock Music","rock music"];
var pop = ["Pop Music","pop music"];
var jazz = ["Jazz","jazz music"];
// Topping Input:pineapple, ham, pepperoni, chicken
var pineapple = ["Pineapple","pineapple"];
var ham = ["Ham","ham"];
var pepperoni = ["pepperoni","pepperoni pizza"];
var chicken = ["Chicken","roast chicken"];
// Movie Input :notebook, shawshank,anchorman,frozen
var notebook = ["The Notebook","the notebook movie"];
var shawshank = ["Shawshank Redemption","shawshank redemption"];
var anchorman = ["The Anchorman","Anchorman movie"];
var frozen =["Frozen","frozen2 movie"];
// personality Input: joker, thinker, leader, lover
var joker = ["Joker","joker"];
var thinker = ["Thinker","person thinker"];
var leader = ["Leader","leader"];
var lover = ["Lover","person lover"];
// Winner_Dream_To_DO Input: mansion,donation, travel, business
var mansion = ["Buy Mansion","mansion"];
var donation = ["Donate to charity","donation"];
var travel = ["Travel around world","world travel"];
var business = ["Purchase a business","restaurant"];



function getRoughGif(item){
queryURL =
    "https://api.tenor.com/v1/search?q=" +
    item[1] +
    "&key="+ APIKey+ "&limit=1";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      
    }).then(function (response) {
      var gif = $("<img>");
      var h4 = $("<h4>");
    h4.text(item[0]);
    gif.attr("src", response.results[0].media[0].gif.url).height(200).width(200);
      // gif.attr("data-country",item[0]);
      
      $("#pic-wrap").append(h4);
      $("#pic-wrap").append(gif);
      
      
    });
  
}

getRoughGif(shawshank);

