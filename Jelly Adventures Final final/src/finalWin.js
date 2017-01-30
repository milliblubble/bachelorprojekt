
var finalWin = function(game){
	 console.log("%cLoad finalWin", "color: white; background: red"); 
};




finalWin.prototype = {
	create:function () 
{
    var winLabel = this.game.add.text(80,80,'YAY YOU WON', { font: '50px Aial', fill: '#00FF00' }); 

    var startLabel = this.game.add.text(80,game.world.height -80,'press R to play again', { font: '25px Aial', fill: '#00FF00' }); 

    var rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R); 
    rKey.onDown.addOnce(this.playAgain, this);

        playAgain: function(){
        game.state.start("gameMenu");   
	}

}
};