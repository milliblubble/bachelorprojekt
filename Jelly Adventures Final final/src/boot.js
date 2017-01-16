var boot = function(game){
    console.log("%cStarting my awesome game", "color: white; background: red"); 
    
}; 

boot.prototype = {
    preload: function(){
        // LoadingBar wird geladen 
    this.load.image('loading', 'assets/sprites/preloader/loading.png');
    this.load.image('load_progress_bar_dark', 'assets/sprites/preloader/progress_bar_bg.png');
    this.load.image('load_progress_bar', 'assets/sprites/preloader/progress_bar_fg.png');
    this.load.image('menuLogo', 'assets/menu/game_logo.png');
    this.load.image('bikinibottom', 'assets/BG/BikiniBottom.png'); 
    }, 
    create: function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	//this.scale.pageAlignHorizontally = true;
	//this.scale.setScreenSize();
     this.game.physics.startSystem(Phaser.Physics.ARCADE);
     this.game.physics.arcade.gravity.y = 500;
     this.game.time.advancedTiming = true;
     this.game.stage.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
     this.game.input.maxPointers = 1;   
     this.game.stage.scale.pageAlignHorizontally = true;
           
	 this.game.state.start("Preload");
    }
}; 


