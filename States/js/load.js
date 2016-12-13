/* 
 * The load-state loads the assets and calls the menu state
 */


var loadState={
    
    preload:function(){
        
        // LOADING LABEL 
        var loadingLabel = game.add.text(80,150, 'loading...', 
        {font: '30px Courier', fill: '#ffffff'}); 
        // ADVANCED:  this.load.image('preloaderBar', assets/preloader.png); 
       
        // LADEN DER TILEMAP
        game.load.tilemap("level_01", "assets/Level/level_01.json",null,Phaser.Tilemap.TILED_JSON);

        // LADEN DER TILEMAP
        game.load.image("tiles","assets/Tiles/tile-sheet.png");

        // LADEN DER HINTERGRUENDE
        game.load.image("bikiniBottomBG","assets/BG/sky.png");
        game.load.image("sandBG","assets/BG/sand.png");
        game.load.image("vordergrundBG","assets/BG/vordergrund_01.png");

        // LADEN DER OBJEKTE
        game.load.image("spongeboy_house", "assets/Object/Spongeboy_House.png");  // Spongeboys Haus
        game.load.image("rusty_cancer_house", "assets/Object/Rusty_Cancer_House.png");  // Rusty Cancer Gebauede
        game.load.image("rusty_cancer_shield", "assets/Object/Rusty_Cancer_Shield.png");  // Rusty Cancer Schild

        // LADEN DER SPRITESHEETS
        game.load.spritesheet("player", "assets/Sprites/Spongeboy.png",49,55); // Spieler-Sprite
        game.load.spritesheet('qualle', "assets/Sprites/Qualle01.png", 64, 64);  // Quallen-Sprite
        game.load.image("catcher", "assets/Object/net.png"); //Catcher- Sprites
        game.load.image("burger", "assets/Object/burger.png"); 


        //EINSTELLEN DER MUSIK 
        game.load.audio('fun', 'assets/Audio/fun.mp3');  // Backgroundmusik FUN-Song
        game.load.audio('jump', 'assets/Audio/jump.mp3'); //Jump Sound

            
    }, 
    
    create:function(){
    game.state.start('menu'); 
    }
    
}; 