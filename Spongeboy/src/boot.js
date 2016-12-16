var boot = function(game){
    console.log("%cStarting my awesome game", "color: white; background: red"); 
    
}; 

boot.prototype = {
    preload: function(){
        // LoadingBar wird geladen 
        this.game.load.image("loading", "assets/loading.png"); 
    }, 
    create: function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	//this.scale.pageAlignHorizontally = true;
	//this.scale.setScreenSize();
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;
        this.game.time.advancedTiming = true;
        
	this.game.state.start("Preload");
    }
}; 


