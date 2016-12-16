/*
 * This state is the actuale game preloader. 
 * All assets and graphics are preloaded here.
 */

var preload = function(game){}; 
        
    preload.prototype ={
        
        preload: function(){
        // Loading Bar 
        var loadingBar = this.add.sprite(160,240, "loading"); 
        loadingBar.anchor.setTo(0.5,0.5); 
        this.load.setPreloadSprite(loadingBar);
        
        //LDEN DES GAMETITLES
        this.game.load.image ("gametitle", "assets/gametitle.png",10,10); 
        
        // LADEN DER TILEMAP
	this.game.load.tilemap("level_01", "assets/Level/level_01.json",null,Phaser.Tilemap.TILED_JSON);

	// LADEN DER TILEMAP
	this.game.load.image("tiles","assets/Tiles/tile-sheet.png");
        
        // LADEN DER HINTERGRUENDE
	this.game.load.image("bikiniBottomBG","assets/BG/sky.png");
	this.game.load.image("sandBG","assets/BG/sand.png");
	this.game.load.image("vordergrundBG","assets/BG/vordergrund_01.png");

	// LADEN DER OBJEKTE
	this.game.load.image("spongeboy_house", "assets/Object/Spongeboy_House.png");  // Spongeboys Haus
	this.game.load.image("rusty_cancer_house", "assets/Object/Rusty_Cancer_House.png");  // Rusty Cancer Gebauede
	this.game.load.image("rusty_cancer_shield", "assets/Object/Rusty_Cancer_Shield.png");  // Rusty Cancer Schild

	// LADEN DER SPRITESHEETS
	this.game.load.spritesheet("player", "assets/Sprites/Spongeboy2.png",63,55); // Spieler-Sprite
	this.game.load.spritesheet('qualle', "assets/Sprites/Qualle01.png", 64, 64);  // Quallen-Sprite
	this.game.load.image("catcher", "assets/Object/net.png"); //Catcher- Sprites
	this.game.load.image("burger", "assets/Object/burger.png"); 


	//EINSTELLEN DER MUSIK 
	this.game.load.audio('fun', 'assets/Audio/fun.mp3');  // Backgroundmusik FUN-Song
	this.game.load.audio('jump', 'assets/Audio/jump.mp3'); //Jump Sound
        
        this.game.load.spritesheet("spongeboy", "assets/Spongeboy2.png", 100,100);
        this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
        this.game.load.image("bikini", "assets/BikiniBottom.png");   
        this.game.load.image("play","assets/play.png");
        this.game.load.image("higher","assets/higher.png");
	this.game.load.image("lower","assets/lower.png");
	this.game.load.image("gameover","assets/gameover.png");
    }, 
    
        create:function(){
            this.game.state.start("GameTitle"); 
        }
          
}; 
 



