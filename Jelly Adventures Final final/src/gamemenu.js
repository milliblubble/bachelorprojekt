

var gameMenu = function(game){}; 

gameMenu.prototype = {

    create: function(){

    	this.playMusic();		
		//this.buttonSettings = [
			//{key: 'play_button', yOffset: -40, callback: this.levelSelect},
			//{key: 'credits_button', yOffset: 60, callback: this.showCredits}];	

		// To exit the how-to or credits menu, I can press any button. This is to stop that same button press from
		// taking other actions on the menu (for example if I press the "up" key to exit, I don't want this to exit AND go to
		// the next menu item up).
		//this.justExitedSubmenu = false;
		var ocean = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'bikinibottom'); 
		ocean.anchor.setTo(0.5,0.5); 
		ocean.scale.setTo(1.5,1.5); 
		
		var menuLogo = this.game.add.image(0,0, 'game_logo');
		//menuLogo.anchor.setTo(0.5,0.5); 
		menuLogo.fixedToCamera = true;
		menuLogo.scale.setTo(1.5,1.5);

		//TITEL des Spiels hinzufügen
		//this.gameTitle = game.add.image(game.camera.width / 2, game.camera.height / 2 - 150, 'game_logo');
		//this.gameTitle.anchor.setTo(0.5, 0.5);

		 this.addLevel01(); 
		 this.addLevel02(); 		
		 this.addArrow(); 	

		//this.buttons = new MenuButtons(this.buttonSettings);
		//this.arrow = new MenuArrow('qualle', game.camera.width / 2 - 110, game.camera.height / 2 - 40, this.buttonYOffsets, [0, 1], this.buttons); //arrow hier ändern

		//this.fadeIn();
	},
	addLevel01:function(){
		var level01_button = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2 -40, 'level_1_button', this.startLevel01, this);	
		level01_button.anchor.setTo(0.5, 0.5);
		level01_button.scale.x = 0.5;
		level01_button.scale.y = 0.5;
		//level01_button.onInputOver.add(startLevel01, this);	
		//level01_button.callbackFunction = this.startLevel01(); 
		return level01_button; 

	}, 

	addLevel02:function(key, yOffset, callback){
		var level02_button = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2 +60 , 'level_2_button', this.startLevel02, this);	
		level02_button.anchor.setTo(0.5, 0.5);
		level02_button.scale.x = 0.5;
		level02_button.scale.y = 0.5;
		//level01_button.onInputOver.add(startLevel02, this);	
		//level02_button.callbackFunction = this.startLevel02(); 
		return level02_button;
	}, 

	addArrow:function(){

    this.arrow = this.game.add.sprite(this.game.camera.width / 2 - 110, this.game.camera.height / 2 - 40, 'qualle');
    this.arrow.anchor.setTo(0.5, 0.5);
    this.arrow.animations.add('move', [0,1], 5, true); 	    
	this.arrow.frame = frames[0];
	this.arrow.animations.play('move');
	// Initial settings.
	this.arrow.currentButton = 1;
	this.arrow.canMove = true;},

	playMusic: function() {
		if(window.music && window.music.name == 'fun') {
			return;
		} else if(window.music) {
			music.stop();
		}

		music = this.game.add.audio('fun', 1, true);
     	music.play('', 0, 0.5, true);
	},

	update: function () {	
},


	startLevel01: function(){
		music.stop(); 
		this.game.state.start('Level01');
	}, 
	startLevel02:function(){
		this.game.state.start('Level02');
	}
	


}; 


