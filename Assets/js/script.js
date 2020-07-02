// declaring global counter for quiz
var counter = 0;

// Function displaying app title and current day on heading.
function musicAppHeading() {
    $("#header #appTitle").text("Music Quiz");
    $("#header #currentDay").text(moment().format('dddd, MMMM Do'));
}

// Creating series of questions and options as an objects.
var q1 = {
    Question: "What is your favourite pizza topping?",
    Options: ["Pepperoni", "Pineapple", "Ham", "Chicken"],
    Values: ["AUS", "USA", "UK", "CA"]

};

var q2 = {
    Question: "What is your favourite movie?",
    Options: ["The Notebook", "Shawshank Redemption", "Anchorman", "Frozen"],
    Values: [0, 1, 2, 3]

};

var q3 = {
    Question: "What closest matches your personality?",
    Options: ["Joker", "Thinker", "Leader", "Lover"],
    Values: [0, 1, 2, 3]

};

var q4 = {
    Question: "What’s the first thing you do if you won $10m dollars?",
    Options: ["Buy a Mansion", "Donate to Charity", "Travel the World ", "Purchase a Business"],
    Values: [0, 1, 2, 3]

};

var q5 = {
    Question: "What is your favourite sport?",
    Options: ["Soccer", "Cricket", "Tennis", "Football"],
    Values: [0, 1, 2, 3]

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

    $("#header").removeClass("hide")
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
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv").attr("id", "");
    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question).attr("id", "");

    // pushing newLegend and newFieldSet to newDiv and then pushing newDiv to inputForm
    $(".inputForm").append(newDiv.append(newLegend, newFieldSet));

   
    getGiphyImage(counter)
}


//All the options related to questions are shown by following functions.
function getGiphyImage(counter) {
    // for loop, looping throught the length of arrayOfQuestions.Options
    for (let i = 0; i < arrayOfQuestions[counter].Options.length; i++) {
        //var musicStyle = ["music-guitar", "classic-music", "music-metal", "piano-music"];
        queryURL = "https://api.tenor.com/v1/search?q=" + arrayOfQuestions[counter].Options[i] + "&key=ZFKX4SZGA5FO&limit=1";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            // declaring options, values,newrow and newButton
            var options = arrayOfQuestions[counter].Options[i];
            var values = arrayOfQuestions[counter].Values[i];
            var newRow = $("<div>").addClass("grid-x")

            var newColumn = $("<p>")
            newColumn.addClass("cell small-2");

            var newButton = $("<button>")
            newButton.text(options).addClass("button  option cell small-8").attr("type", "button").data("value", values);
            newRow.append(newColumn,newButton)
            // declaring figure and image
            var newFigure = $("<figure>")
            var newImage = $(`<img src="${response.results[0].media[0].gif.url}">`)
            //var newImage = $("<img>").attr("src",`${getGiphyImage()}`)
            newFigure.append(newImage)
            newButton.append(newFigure)
            $(".newDiv").append(newRow)

            // on click newButton
            newButton.on("click", function (event) {
                event.preventDefault();
                // declare value as button value
                var value = $(this).data("value")
                savedArrayOfChoices.push(value)
                console.log(...savedArrayOfChoices)

                // checking length of array
                if (counter === (arrayOfQuestions[counter].Options.length - 1)) {
                    // Foundation.css
                    $(".Panel").addClass("hide");
                    $(".flex-video").removeClass("hide");
                    $(".flex-video").addClass("show");

                    // link to musix-api-script Func findSong parsing savedArrayOfChoices
                  //  findSong(savedArrayOfChoices);
                }
                else {
                    counter++;
                    $(".inputForm").empty()
                    // show next question
                    showQuestion(counter)
                }

            })
        })

    };
}

//Event handler - start quiz
$("#startButton").on("click", onStartButtonClicked);