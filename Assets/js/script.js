var counter = 0;

// declaring global string for choice made
var choice = "";

// ????
init()
function init() {
}

//Function displaying app title and current day on heading.
function musicAppHeading() {
    $("#header #appTitle").text("MUSIC-APP");
    $("#header #currentDay").text(moment().format('dddd, MMMM Do'));
}

//Creating series of questions and options as an objects.
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
    var newDiv = $("<div>").addClass("row");
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv");

    // console.log(arrayOfQuestions[counter].Question);

    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question);
    newDiv.append(newLegend, newFieldSet);
    $(".inputForm").append(newDiv);
    showOption(counter);
}

//All the options related to questions are shown by following functions.
function showOption(counter) {

    for (let i = 0; i < arrayOfQuestions[counter].Options.length; i++) {
        var options = arrayOfQuestions[counter].Options[i];
        var values = arrayOfQuestions[counter].Values[i];
        var newButton = $("<button>").text(options).addClass("button success optionsBtutton").attr({ type: "button", id: "" }).data("value", values);
        $(".newDiv").append(newButton);
        newButton.on("click", function (event) {
            event.preventDefault();
            var value = $(this).data("value");
            console.log("on button clicked : " + value);
            savedArrayOfChoices.push(value);
            console.log(...savedArrayOfChoices);
            if (counter === 3) {
                $(".panel").addClass("hide");
                $(".flex-video").removeClass("hide");
                $(".flex-video").addClass("show");
                findSong(savedArrayOfChoices);
            }
            else {
                counter++;
                $(".inputForm").text("");
                $(".inputForm").empty();
                showQuestion(counter);
            }

        })

    }
}

//Event handler 
$("#startButton").on("click", onStartButtonClicked);