//global variables
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardStored = null;
var secondCardStored = null;
var matchCounter = 0;
var totalMatches = 9;
var clicked = true;
/*onload handler and click function.  included addClass to all backs to help distinguish which cards have not been flipped*/
$(document).ready(function(){
    $(".back").addClass("notFlipped");
    $(".back").click(function(){
        if(clicked == true){
            $(this).hide();
            if (firstCardClicked === null) {
                /*firstCardClicked is being assigned the card that is being clicked which will be an image with class of ".back". prev() will go to the previous sibling which in this case will be the image with the class ".front" (don't think first will be needed.)*/
                firstCardClicked = $(this).prev().first().attr("src");
                console.log("first card clicked", firstCardClicked);
                //stores the value of the first clicked card
                firstCardStored = $(this);
            }
            else {
                clicked = false;
                secondCardClicked = $(this).prev().first().attr("src");
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
                    winner();
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

});
/*this is the compare function that will be used to compare the two clicked cards.  if the cards equal the function will remove the assigned class of "notFlipped" so that only the cards without this class will remained flipped. (could possibly just remove the class back and not had to even add a class of notFlipped)*/
function compare(firstCardClicked,secondCardClicked){
    if (firstCardClicked == secondCardClicked) {
        console.log("match");
        $(firstCardStored).removeClass("notFlipped");
        $(secondCardStored).removeClass("notFlipped");
        //this will increment the global variable by 1 everytime there is a match
        matchCounter++;
        console.log("Match Counter:", matchCounter);
    }
    else {
        console.log("no match");
        //if no there are no matches then the cards with the class ".notflipped will still be in play
        $('.notFlipped').show();
    }
}
//winner message function
function winner(){
    // if (matchCounter == totalMatches){
    var winMessage = $("<div>",{
        id: "victory",
        text: "WINNER WINNER CHICKEN DINNER!"
    });
    $("body").append(winMessage);
    // }
}


