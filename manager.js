function MemoryMatch(cols, images, back, base)
{
    this.GameEngine = null;
    this.CardClass = null;

    this.init(cols, images, back, base);
}

MemoryMatch.prototype.init = function(cols, images, back, base)
{
    this.GameEngine = new GameLogic(this);
    this.CardClass = Card;
    this.GameEngine.config(cols, images, back, base);
};

//To create a game you need an image array, back image, and optional image url
var cardimages =  [ 'armbar4.jpg','atosFront.png','chess.jpg','kimura1.jpg','rearNakedChoke.jpg','sweep.jpg', 'tap2.jpg', 'triangle1.jpg', 'triangleArmbar2.jpg'];
var cardback = 'yoda3.jpg';
var baseUrl = 'images/';
var cols = 4;
var game = new MemoryMatch(cols, cardimages, cardback, baseUrl);
