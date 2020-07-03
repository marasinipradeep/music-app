// declaring global counter for quiz
var counter = 0;

// Function displaying app title and current day on heading.
function musicAppHeading() {
  $("#header #appTitle").text("Music Quiz");
  $("#header #currentDay").text(moment().format("dddd, MMMM Do"));
}

// Creating series of questions and options as an objects.
var q1 = {
  Question: "What is your favourite pizza topping?",
  Options: [
    ["Pepperoni", "16773994"],
    ["Pineapple", "7341867"],
    ["Ham", "11375339"],
    ["Chicken", "15625891"],
  ],
  Values: ["AUS", "USA", "UK", "CA"],
};

var q2 = {
  Question: "What is your favourite movie?",
  Options: [
    ["The Notebook", "12226514"],
    ["Shawshank Redemption", "15182605"],
    ["Anchorman", "4630948"],
    ["Frozen", "4626444"],
  ],
  Values: [0, 1, 2, 3],
};

var q3 = {
  Question: "What closest matches your personality?",
  Options: [
    ["Joker", "15985498"],
    ["Thinker", "5111292"],
    ["Leader", "11208171"],
    ["Lover", "12178533"],
  ],
  Values: [0, 1, 2, 3],
};

var q4 = {
  Question: "What’s the first thing you do if you won $10m dollars?",
  Options: [
    ["Buy a Mansion", "11882034"],
    ["Donate to Charity", "11161179"],
    ["Travel the World ", "3939041"],
    ["Purchase a Business", "7822852"],
  ],
  Values: [0, 1, 2, 3],
};

var q5 = {
  Question: "What is your favourite sport?",
  Options: [
    ["Soccer", "7755651"],
    ["Cricket", "16441073"],
    ["Tennis", "5632634"],
    ["Football", "3535687"],
  ],
  Values: [0, 1, 2, 3],
};

//Array of questions.All the questions of obejcts pushed inside the following array.
var arrayOfQuestions = [];
arrayOfQuestions.push(q1, q2, q3, q4, q5);

//Array to hold different users choices.
var savedArrayOfChoices = [];

//Function to give some css tricks for hiding and displaying html elements.
function onStartButtonClicked() {
  // using Foundation CSS
  $("#description").addClass("hide");
  $("#startButton").addClass("hide");

  $("#header").removeClass("hide");
  $("#header").addClass("show");

  $("img").addClass("hide");

  $("#initialPage").addClass("hide");

  $(".Panel").removeClass("hide");
  $(".Panel").addClass("show");

  $("footer").removeClass("hide");
  $("footer").addClass("show");

  musicAppHeading();
  showQuestion(counter);
}

//Functions to create series of questions.
function showQuestion(counter) {
  // creating new div, fieldset, legend
  var newDiv = $("<div>").addClass("row primary").attr("id", "content");
  var newFieldSet = $("<fieldset>")
    .addClass("small-6 columns newDiv")
    .attr("id", "");
  var newLegend = $("<legend>")
    .text(arrayOfQuestions[counter].Question)
    .attr("id", "");

  // pushing newLegend and newFieldSet to newDiv and then pushing newDiv to inputForm
  $(".inputForm").append(newDiv.append(newLegend, newFieldSet));

  getGiphyImage(counter);
}

//All the options related to questions are shown by following functions.
function getGiphyImage(counter) {
  // for loop, looping throught the length of arrayOfQuestions.Options
  for (let i = 0; i < arrayOfQuestions[counter].Options.length; i++) {
    //var musicStyle = ["music-guitar", "classic-music", "music-metal", "piano-music"];
    queryURL =
      "https://api.tenor.com/v1/gifs?ids=" +
      arrayOfQuestions[counter].Options[i][1] +
      "&key=ZFKX4SZGA5FO&limit=1";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
    }).then(function (response) {
      // declaring options, values,newrow and newButton
      var options = arrayOfQuestions[counter].Options[i][0];
      var values = arrayOfQuestions[counter].Values[i];
      var newRow = $("<div>").addClass("grid-x");

      var newColumn = $("<p>");
      newColumn.addClass("cell small-2");

      var newButton = $("<button>");
      newButton
        .text(options)
        .addClass("button  option cell small-8")
        .attr("type", "button")
        .data("value", values);
      newRow.append(newColumn, newButton);

      // declaring figure and image
      var newFigure = $("<figure>");
      var newImage = $(`<img src="${response.results[0].media[0].gif.url}">`);
      newImage.width(400).height(200);

      //var newImage = $("<img>").attr("src",`${getGiphyImage()}`)
      newFigure.append(newImage);
      newButton.append(newFigure);
      $(".newDiv").append(newRow);

      // on click newButton
      newButton.on("click", function (event) {
        event.preventDefault();

        // declare value as button value
        var value = $(this).data("value");
        savedArrayOfChoices.push(value);

        // checking length of array
        if (counter === arrayOfQuestions[counter].Options.length) {
          // Foundation.css
          $(".Panel").addClass("hide");
          $(".end-screen").removeClass("hide");
          $(".end-screen").addClass("show");

          // link to musix-api-script Func findSong parsing savedArrayOfChoices
          findSong(savedArrayOfChoices);
        } else {
          counter++;
          $(".inputForm").empty();

          // show next question
          showQuestion(counter);
        }
      });
    });
  }
}

//Event handler - start quiz
$("#startButton").on("click", onStartButtonClicked);
