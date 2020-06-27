//giphy
//emVJkP2qAM1mr95yGqEgW0VXJHEfbTbO
var counter = 0;
init()
function init() {
}

function musicAppHeading() {
    $("#header #appTitle").text("your choice of music...")
    $("#header #appSubTitle").text(moment().format('dddd, MMMM Do'))

}


var choiceOfCountry = {
    Question: "Which country music do you like one ?",
    Options: ["Australia", "America", "German", "India"]
}


var typeOfSong = {
    Question: "Which Type of music do you like two ?",
    Options: ["Jazz", "Rock", "Classic", "Pop"]
}


var choiceOfSinger = {
    Question: "Which Type of music do you like three ?",
    Options: ["Australia", "America", "German", "India"]
}


var arrayOfQuestions = []
arrayOfQuestions.push(choiceOfCountry, typeOfSong, choiceOfSinger)
console.log(arrayOfQuestions)

var savedArrayOfChoices =[]


function onStartButtonClicked() {
    $("#description").addClass("hide");
    $("#startButton").addClass("hide");
    $("#header").removeClass("hide")
    $("#header").addClass("show");
    $("img").addClass("hide")
    $("#initialPage").addClass("hide")

    $(".panel").removeClass("hide")
    $(".panel").addClass("show")

    $(".flex-video").removeClass("hide")
    $(".flex-video").addClass("show")
    musicAppHeading()
    showQuestion(counter)
}




function showQuestion(counter) {

    console.log("COunter is : " + counter)
    var newDiv = $("<div>").addClass("row")
    var newFieldSet = $("<fieldset>").addClass("small-6 columns newDiv")
    var newLegend = $("<legend>").text(arrayOfQuestions[counter].Question)
    newDiv.append(newLegend, newFieldSet)
    $(".inputForm").append(newDiv)
    showOption(counter)
}


function showOption(counter) {

    $.each(arrayOfQuestions[counter].Options, function (index, options) {
        console.log(options)
        // var newInput = $("<input>").attr({ type: "radio", value: "metal" })
        // var newLabel = $("<label>").attr("for", "metalType").text(options)
        var newButton = $("<button>").text(options).addClass("button success optionsButton").attr({type:"button",id:""}).data("value", options)
        $(".newDiv").append(newButton)

        newButton.on("click", function (event){
            event.preventDefault();
            var value = $(this).data("value")
            console.log("on button clicked : " + value)
            savedArrayOfChoices.push(value)
            console.log(...savedArrayOfChoices)
            if(counter===2){
                alert("End of questions")
            }
            counter ++;
            $(".inputForm").text("")
            $(".inputForm").empty()
            showQuestion(counter)

        })
    })
}
$("#startButton").on("click", onStartButtonClicked)

