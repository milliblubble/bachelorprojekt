var gameOver = function(game){}; 

var aktLevel;

gameOver.prototype = {
	init: function(level){
		aktLevel = level;
		console.log(aktLevel);
	},
	
  	create: function(){
  		var gameOvertext = this.game.add.text(400,300, 'Game over! Press R to restart', 
                                    {font: '50px Arial', fill: '#ffffff'}); 
		gameOvertext.anchor.set(0.5); 
		gameOvertext.fixedToCamera= true;

		var restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R); 
		restartKey.onDown.add(this.playTheGame, this);
	
	},
	playTheGame: function(){
		if (aktLevel == 1)
		{
			this.game.state.start("Level01");
		}
		else if (aktLevel == 2)
		{
			this.game.state.start("Level02");
		}
	}
}; 
