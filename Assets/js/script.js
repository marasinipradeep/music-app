
var counter = 0;
init()
function init() {
}

//Function displaying app title and current day on heading.
function musicAppHeading() {
    $("#header #appTitle").text("MUSIC-APP")
    $("#header #currentDay").text(moment().format('dddd, MMMM Do'))
}

//Creating series of questions and options as an objects.
var choiceOfCountry = {
    Question: "Which country music do you like ?",
   // Options: ["Australia", "America", "German", "India"]
    Options: ["AUS", "USA", "UK", "IN"]
   
}

var chiceOfGenre = {
    Question: "Which Genre do you like ?",
    //Options: ["Jazz", "Rock", "Classic", "Pop"],
    Options: [0, 1, 2, 3]
    
}

var choiceOfArtist = {
    Question: "Which Artist do you like ?",
   // Options: ["Australia", "America", "German", "India"],
    Options: [0, 1, 2, 3]
   
}


var choiceOfAlbum = {
    Question: "Which Album do you like ?",
   // Options: ["Australia", "America", "German", "India"],
    Options: [0, 1, 2, 3]
   
}

//Array of questions.All the questions of obejcts pushed inside the following array.
var arrayOfQuestions = []
arrayOfQuestions.push(choiceOfCountry, chiceOfGenre, choiceOfArtist,choiceOfAlbum )

//Array to hold different users choices.
var savedArrayOfChoices = []


//Function to give some css tricks for hiding and displaying html elements.
function onStartButtonClicked() {
    $("#description").addClass("hide");
    $("#startButton").addClass("hide");
    $("#header").removeClass("hide")
    $("#header").addClass("show");
    $("img").addClass("hide")
    $("#initialPage").addClass("hide")
    $(".panel").removeClass("hide")
    $(".panel").addClass("show")
    musicAppHeading()
    showQuestion(counter)
}

//Functions to create series of questions.
function showQuestion(counter) {
    var newDiv = $("<div>").addClass("row")
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv")
    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question)
    newDiv.append(newLegend, newFieldSet)
    $(".inputForm").append(newDiv)
    showOption(counter)
}

//All the options related to questions are shown by following functions.
function showOption(counter) {

    $.each(arrayOfQuestions[counter].Options, function (index, options) {
        var newButton = $("<button>").text(options).addClass("button success optionsButton").attr({ type: "button", id: "" }).data("value", options)
        $(".newDiv").append(newButton)
        newButton.on("click", function (event) {
            event.preventDefault();
            var value = $(this).data("value")
            console.log("on button clicked : " + value)
            savedArrayOfChoices.push(value)
            console.log(...savedArrayOfChoices)
            if (counter === 3) {
                $(".panel").addClass("hide")
                $(".flex-video").removeClass("hide")
                $(".flex-video").addClass("show")
                getCountry(savedArrayOfChoices)
            }
            else{
            counter++;
            $(".inputForm").text("")
            $(".inputForm").empty()
            showQuestion(counter)
        }

        })
    })
}

//Event handler 
$("#startButton").on("click", onStartButtonClicked)

