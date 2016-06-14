//global variables
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardStored = null;
var secondCardStored = null;
var matchCounter = 0;
var totalMatches = 9;
var clicked = true;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

/*onload handler and click function.*/
$(document).ready(function(){
   cardClicked();
});

/*included addClass to all backs to help distinguish which cards have not been flipped*/
function cardClicked() {
    $(".back").addClass("notFlipped");
    $(".back").click(function(){
        if(clicked == true){
            $(this).hide();
            if (firstCardClicked === null) {
                /*firstCardClicked is being assigned the card that is being clicked which will be an image with class of ".back". prev() will go to the previous sibling which in this case will be the image with the class ".front" (don't think .first() will be needed after prev() so I will remove it.)*/
                /*firstCardClicked = $(this).prev().attr("src");*/
               /* firstCardClicked = $(this).find(".front").find("images").attr("src");*/
                firstCardClicked = $(this).find(".front img").attr("src");
                console.log("first card clicked", firstCardClicked);
                //stores the value of the first clicked card
                firstCardStored = $(this);
            }
            else {
                clicked = false;
                /*secondCardClicked = $(this).prev().attr("src");*/
                secondCardClicked = $(this).find(".front img").attr("src");
                console.log("this is card 2", secondCardClicked);
                secondCardStored = $(this);
                //call the compare function defined below
                compare(firstCardClicked, secondCardClicked);
                firstCardClicked = null;
                secondCardClicked = null;
                console.log(firstCardClicked, secondCardClicked);
                firstCardStored = null;
                secondCardStored = null;
                console.log(firstCardStored, secondCardStored);
                //this will display the winning message
                if (matchCounter == totalMatches){
                    $("#winner").fadeIn();
                    /*  var winMessage = $("<div>",{
                     id: "victory",
                     text: "winner winner chicken dinner!"
                     });
                     $("body").append(winMessage);*/
                }
                //this sets the time before the third image can be clicked
                setTimeout(function(){
                    clicked = true;
                },2000);
            }
        }
    });
    $(".reset").click(function(){
        resetButton();
        console.log("game has been reset");
    })
}


/*this is the compare function that will be used to compare the two clicked cards.  if the cards equal, the function will remove the assigned class of "notFlipped" so that only the cards without this class will remained flipped. (could possibly just remove the class back and not had to even add a class of notFlipped)*/
function compare(firstCardClicked,secondCardClicked){
    if (firstCardClicked == secondCardClicked) {
        console.log("match");
        $(firstCardStored).removeClass("notFlipped");
        $(secondCardStored).removeClass("notFlipped");
        /*this will increment the matchCounter by 1 every time there is a match, attempts will be incremented by one as well. call 3 functions to display the attempts, accuracy, and gamesplayed.*/
        matchCounter++;
        attempts++;
        displayAttempts();
        displayAccuracy();
        displayGamesPlayed();
        console.log("Match Counter:", matchCounter);
    }
    else {
        console.log("no match");
        /*this will increment the attempts and display the attempts, accuracy, and gamesplayed.*/
        attempts++;
        displayAttempts();
        displayAccuracy();
        displayGamesPlayed();
        /*if no there are no matches then the cards with the class ".notflipped will still be in play*/
        setTimeout(function () {
            $('.notFlipped').show();
        }, 1000);
    }
}
//winner message function
/*function winner(){
   // if (matchCounter == totalMatches){
        var winMessage = $("<div>",{
            id: "victory",
            text: "WINNER WINNER CHICKEN DINNER!"
            });
    $("body").append(winMessage);
  // }
}*/

//reset stats when reset button has been clicked


//this function will update the attempts
function displayAttempts(){
    $(".attempts .value").text(attempts);
}
//this function will update the accuracy
function displayAccuracy(){
    $(".accuracy .value").text(function(){
        if (attempts == 0){
            return 0;
        }
        else{
            return Math.round((matchCounter/attempts)*100) + "%";
        }
    });
}
//this function will update games played
function displayGamesPlayed(){
    $(".games-played .value").text(games_played);
}

//display stats
/*function displayStats(){
 $(".games-played .value").text(games_played);
 $(".attempts .value").text(attempts);
 $(".accuracy .value").text(accuracy + "%");
 }*/

function displayStats(){
    displayAttempts();
    displayAccuracy();
    displayGamesPlayed();
}

function reset_stats(){
    attempts = 0;
    accuracy = 0;
    matchCounter = 0;
    displayStats();
}

//this will reset the game
function resetButton(){
    console.log("game reset")
    games_played++;
    reset_stats();
    displayStats();
    $(".back").show();
    $("#winner").fadeOut();
}
