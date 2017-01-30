var finalWin = function(game){}; 



finalWin.prototype = {	
	
  	create: function(){
  		var gameOvertext = this.game.add.text(400,300, 'Yay you won! Press R to play again', 
                                    {font: '50px Arial', fill: '#ffffff'}); 
		gameOvertext.anchor.set(0.5); 
		gameOvertext.fixedToCamera= true;

		var restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R); 
		restartKey.onDown.add(this.playTheGame, this);
	
	},
	playTheGame: function(){
		
			this.game.state.start("GameMenu");
		}		
		
}; 
