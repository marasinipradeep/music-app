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

    $(".panel").removeClass("hide");
    $(".panel").addClass("show");

    musicAppHeading();
    showQuestion(counter);
}

//Functions to create series of questions.
function showQuestion(counter) {
    // creating new div, fieldset, legend
    var newDiv = $("<div>").addClass("row");
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv");
    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question);

    // pushing newLegend and newFieldSet to newDiv and then pushing newDiv to inputForm
    $(".inputForm").append(newDiv.append(newLegend, newFieldSet));

    showOption(counter);
}

//All the options related to questions are shown by following functions.
function showOption(counter) {

    // for loop, looping throught the length of arrayOfQuestions.Options
    for (let i = 0; i < arrayOfQuestions[counter].Options.length; i++) {
        // declaring options, values and newButton
        var options = arrayOfQuestions[counter].Options[i];
        var values = arrayOfQuestions[counter].Values[i];
        var newButton = $("<button>");

        // setting text of button to options, adding class of button success and options
        newButton.text(options).addClass("button success").attr("type", "button").data("value", values);

        // adding newButton to newDiv
        $(".newDiv").append(newButton);

        // on click newButton
        newButton.on("click", function (event) {
            // prevent reload
            event.preventDefault();

            // declare value as button value
            var value = $(this).data("value");

            // add value to savedArrayOfChoices
            savedArrayOfChoices.push(value);

            // condition
            if (counter === (arrayOfQuestions[counter].Options.length - 1)) {
                // Foundation.css
                $(".panel").addClass("hide");
                $(".flex-video").removeClass("hide");
                $(".flex-video").addClass("show");

                // link to musix-api-script Func findSong parsing savedArrayOfChoices
                findSong(savedArrayOfChoices);
            }
            else {
                counter++;

                $(".inputForm").empty();

                // show next question
                showQuestion(counter);
            }

        })

    }
}

//Event handler - start quiz
$("#startButton").on("click", onStartButtonClicked);