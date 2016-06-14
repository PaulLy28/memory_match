
function GameLogic(gameManager){
    var gameScope = gameManager;
    var logicScope = this;
    var attempts = 0;
    var accuracy = 0;
    var games_played = 0;
    logicScope.cardImageBaseUrl = "";
    logicScope.cardBackUrl = "";
    logicScope.title =  "MemMatch";
    logicScope.cardImages = [];
    logicScope.shuffleCount = 3;
    logicScope.cols = 0;
    //current board layout with objects in position
    logicScope.board = [];
    //current card Objects in game
    logicScope.cardObjects = {};
    //run config with amount of columns
    logicScope.config = function(cols, imageArray, imageBack, baseUrl){
        if(imageArray){
            logicScope.cardImages = imageArray;
            logicScope.cardBackUrl = imageBack;
        }
        else{
            alert('no images provided!');
            return
        }
        logicScope.cardImageBaseUrl = baseUrl || "";
        logicScope.cols = logicScope.colCheck(cols);
        logicScope.boardCreate(cols);
        logicScope.boardAdjust();
    };
    //re align cards to match with board dimensions
    logicScope.boardAdjust = function(){
        var width = Math.floor( 100/logicScope.board[0].length );
        var height = Math.floor(100/logicScope.board.length);
        var $grid = $(".gridSquare");
        console.log("width: " + width, "height: " + height, "cols: " + logicScope.cols);
        $grid.width((width -1) + "%").height( (height - 1) + "%");
        if($grid.width() > $grid.height() ){
            $(".card").width($grid.height() + "px");
            $(".front, .back").height($grid.height() + "px");
        }
        else{
            $(".card").width($grid.width() + "px");
            $(".front, .back").height($grid.height() + "px");
        }
    };

    logicScope.boardCreate = function(r){
        var imgArr = [];
        var colSize = 6; //logicScope.colCheck(r);
        console.log(colSize);
        var row = [];
        var rowNum = 0;
        var colNum = 0;
        logicScope.cardObjects = {};
        // copy the cards into the array twice (we need one of each to match)
        imgArr = logicScope.cardImages.concat(logicScope.cardImages);
        // here we shuffle the cards a few times to randomize them each time
        for (var i = 0; i < logicScope.shuffleCount; i++) {
            imgArr = logicScope.shuffle(imgArr);
        }
        //loops through the randomized array and puts them in the board array
        // also adds each card to an card object holder
        for(var j = 0; j < imgArr.length; j++){
            var gridSquare = $("<div>", {
                class: "gridSquare",
                id: rowNum + "" + colNum
            });
            //create a new card object with array position img and index
            logicScope.cardObjects[j] = new gameScope.CardClass(j, imgArr[j], rowNum, colNum, logicScope.cardImageBaseUrl, logicScope.cardBackUrl, gameScope);
            //append a grid div to game area
            $("#game-area").append(gridSquare);
            //tell the card object to append itself;
            logicScope.cardObjects[j].appendCards();
            //push the card object to a row array;
            row.push(logicScope.cardObjects[j]);
            //checks current row is full and creates a new one
            if((j + 1) % colSize == 0){
                logicScope.board.push(row);
                row = [];
                rowNum += 1;
                colNum = 0;
            }
            //keeps adding to array
            else{
                colNum += 1;
            }
        }
        console.log(logicScope.board, logicScope.cardObjects);
    };
    //shuffle an array
    logicScope.shuffle = function(arr) {
        var currNum = arr.length,
            temp, ranNum;
        // While there remain elements to shuffle
        while (currNum) {
            // pick a remaining element
            ranNum = Math.floor(Math.random() * currNum);
            currNum -= 1;
            // and swap it with the current element
            temp = arr[currNum];
            arr[currNum] = arr[ranNum];
            arr[ranNum] = temp;
        }
        return arr;
    };
    //checks if columns will be equal otherwise counts down until 1 vertical column
    logicScope.colCheck = function(num){
        for(var i = num; i > 1 ; i -= 1){
            if((logicScope.cardImages.length * 2) % i == 0){
                return i;
            }
        }
        return 1;
    };

    logicScope.reset = function(){
        logicScope.boardCreate();
    };

    logicScope.Board = function(){

    };

//card logic
    // this.setCards = function(){
    // this.card_clicked = null;
    // var clicked = this.card_clicked;
    logicScope.first_card_clicked = null;
    var first = logicScope.first_card_clicked;
    logicScope.second_card_clicked = null;
    var second = logicScope.second_card_clicked;

    logicScope.firstCardClickedSet = function(id){

        if (first === null){
            first = logicScope.cardObjects[id];
            first.flipBack();
        }
        else if (second !== null || first.id == id){
            return;
        }
        else {
            logicScope.secondCardClickedSet(id);
        }
    };

    logicScope.secondCardClickedSet = function(id){
        second = logicScope.cardObjects[id];
        second.flipBack();

        setTimeout(function() {
            if (first.imgsrc === second.imgsrc) {
                // toggle function
                first.card.addClass("matched").hide();
                second.card.addClass("matched").hide();
                attempts++;
                if((".matched").length == 2) logicScope.config(logicScope.config(5, cardimages, cardback, baseUrl));
            }
            else {
                first.flipBack();
                second.flipBack();
                attempts++;
            }
            logicScope.displayStats();
            first = null;
            second = null;
        }, 1500);

    };

    logicScope.displayAttempts = function() {
        $(".attempts .value").text(attempts);
    };

    logicScope.displayAccuracy = function() {
        $(".accuracy .value").text(function() {
            if (attempts == 0){
                return 0;
            }
            else{
                return Math.round((($('.matched').length/2)/attempts)*100) + "%";
            }
        });
    };

    logicScope.displayGamesPlayed = function() {
        $(".games-played .value").text(games_played);
    };

    logicScope.displayStats = function(){
        logicScope.displayAttempts();
        logicScope.displayAccuracy();
        logicScope.displayGamesPlayed();
    };

    logicScope.reset_stats = function(){
        attempts = 0;
        accuracy = 0;
        games_played++;
        /*matchCounter = 0;*/
        logicScope.board = [];
        logicScope.displayStats();
    };




    logicScope.flipTopCard = function(id) {
        var r = logicScope.cardObjects[id].rowNum;
        var c = logicScope.cardObjects[id].colNum;

        if(typeof logicScope.board[r - 1] !== "undefined" && typeof logicScope.board[r - 1][c] !== "undefined"){
            logicScope.board[r - 1][c].flipBack();
            setTimeout(function(){
                logicScope.board[r - 1][c].flipBack();
            }, 500);
        }

    };


    $( window ).resize(function() {
        logicScope.boardAdjust();
    });

}//close the game logic memory match function





