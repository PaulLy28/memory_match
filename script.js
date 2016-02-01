/*card flipping and storing code*/
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardStored = null;
var secondCardStored = null;

$(document).ready(function(){
    $(".back").addClass("notFlipped");
    $(".back").click(function(){
        $(this).hide();
        if(firstCardClicked === null){
            firstCardClicked = $(this).prev().first().attr("src");
            console.log("first card clicked", firstCardClicked);
            firstCardStored = $(this);
        }
        else {
            secondCardClicked = $(this).prev().first().attr("src");
            console.log("this is card 2", secondCardClicked);
            secondCardStored = $(this);
            compare(firstCardClicked, secondCardClicked);
            firstCardClicked = null;
            secondCardClicked = null;
            console.log(firstCardClicked, secondCardClicked);
            firstCardStored = null;
            secondCardStored = null;
            console.log(firstCardStored, secondCardStored);
        }
    });
});

function compare(firstCardClicked,secondCardClicked){
    if (firstCardClicked == secondCardClicked) {
        console.log("match");
        $(firstCardStored).removeClass("notFlipped");
        $(secondCardStored).removeClass("notFlipped");
    }
    else {
        console.log("no match");
        $('.notFlipped').show();
    }
}