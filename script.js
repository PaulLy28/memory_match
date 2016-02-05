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

/*onload handler and click function.  included addClass to all backs to help distinguish which cards have not been flipped*/
$(document).ready(function(){
    $(".back").addClass("notFlipped");
    $(".back").click(function(){
        if(clicked == true){
            $(this).hide();
            if (firstCardClicked === null) {
                /*firstCardClicked is being assigned the card that is being clicked which will be an image with class of ".back". prev() will go to the previous sibling which in this case will be the image with the class ".front" (don't think .first() will be needed after prev() so I will remove it.)*/
                firstCardClicked = $(this).prev().attr("src");
                /*firstCardClicked = $(this).find(".front").find("img").attr("src");*/
                console.log("first card clicked", firstCardClicked);
                //stores the value of the first clicked card
                firstCardStored = $(this);
            }
            else {
                clicked = false;
                secondCardClicked = $(this).prev().attr("src");
              /*  secondCardClicked = $(this).find(".front").find("img").attr("src");*/
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
});
/*this is the compare function that will be used to compare the two clicked cards.  if the cards equal, the function will remove the assigned class of "notFlipped" so that only the cards without this class will remained flipped. (could possibly just remove the class back and not had to even add a class of notFlipped)*/
//dan start
//this is a function that will compare the first card clicked and the second card clicked
function compare(firstCardClicked,secondCardClicked){
//this is a statement comparing the first card clicked to the second card clicked if they ar equal in value.
    if (firstCardClicked == secondCardClicked) {
//this will console out the string match if statement above is true (if first card clicked is equal to second card clicked)
        console.log("match");
//when the if statement is true meaning if first card clicked is equal to the second card clicked the class associated with the first and second card will be removed from those matched cards this will keep the cards that still have the class of notFlipped remain not flipped over.
        //first card stored stores the first card clicked. when the if statement is true the class of notFlipped will be removed
        $(firstCardStored).removeClass("notFlipped");
        //second card stored stores the second card clicked. when the if statement is true the class of notFlipped will be removed
        $(secondCardStored).removeClass("notFlipped");
        //this will increment the matchCounter by 1 every time there is a match
        matchCounter++;
        //this will increment the attempts made to match the cards by one
        attempts++;
        //this will display the stats of the attempts made, the accuracy, and the amount of games played
        displayStats();
        console.log("Match Counter:", matchCounter);
    }
//if the statement above is not true which means if first card clicked does not equal second card clicked this section will run
    else {
    //if the first card clicked does not equal the second card clicked the console will show a message of no match
        console.log("no match");
        //this will increment the attempts made to match the cards by one
        attempts++;
        //this will display the stats of the attempts made, the accuracy, and the amount of games played
        displayStats();
//if there are no matches then the cards with the class notFlipped will still be in play
        //this is a function that will determine how long the card stays flipped
        setTimeout(function () {
        //this will target the cards that have the class of not flipped to show the back of the card (back of the card means the card have not been matched)
            $('.notFlipped').show();
        //this will have the card stay flipped showing the front image for 1000 milliseconds (1 second) before flipping the card back to show the back of the card.
        }, 1000);
    }
}
//dan end
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
