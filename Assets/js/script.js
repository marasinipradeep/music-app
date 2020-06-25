//giphy
//emVJkP2qAM1mr95yGqEgW0VXJHEfbTbO

init()
function init() {
   
}

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
}

function musicAppHeading() {
    $("#header #appTitle").text("your choice of music...")
    $("#header #appSubTitle").text(moment().format('dddd, MMMM Do'))
  
}



$("#startButton").on("click", onStartButtonClicked)