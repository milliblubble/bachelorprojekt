
var finalWin = function(game){};




finalWin.prototype = {
	create:function () 
{
    var winLabel = game.add.text(80,80,'YAY YOU WON', { font: '50px Aial', fill: '#00FF00' }); 

    var startLabel = game.add.text(80,game.world.height -80,'press R to play again', { font: '25px Aial', fill: '#00FF00' }); 

    var rKey = game.input.keyboard.addKey(Phaser.Keyboard.R); 
    rKey.onDown.addOnce(this.playAgain, this);


}, 
update:function() 
{
    playAgain: function(){
        game.state.start("level01"); 

    }

   
}

}, 