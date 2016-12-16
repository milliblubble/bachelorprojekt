/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var level01 = function(game){
   
    
  
}; 

// KARTENVARIABLE
var background, foreground;
var map;
var bgLayer,wLayer,pLayer;

// Soundvariablen

var bMusic;
var jSound;

level01.prototype = {
    
    
    
    create: function(){
       
        this.stage.backgroundColor = "#15DAFF"; 
        background = this.game.add.tileSprite(0,0, 10000, 320, "sandBG"); 
        map = this.game.add.tilemap("level_01");
        map.addTilesetImage("tile-sheet","tiles");
        map.addTilesetImage("Spongeboy_House","spongeboy_house");
        map.addTilesetImage("Rusty_Cancer_Shield", "rusty_cancer_shield");
        map.addTilesetImage("Rusty_Cancer_House","rusty_cancer_house");

        bgLayer2 = map.createLayer("Background Layer 2");
        bgLayer1 = map.createLayer("Background Layer 1");
        pLayer = map.createLayer("Platform Layer");
        
        // AKtiviert die Kollision für die Platform Layer in den Bereichen 1-20

        map.setCollisionBetween(1, 500, true, 'Platform Layer'); 
         
        map.setCollisionBetween(1, 100, true, 'Platform Layer');
        
        // Anzeigen der Kollisionbox
         pLayer.resizeWorld();
         this.createForeground();
         this.updateParallax(); 
         this.createMusic(); 
         
        
                      
    }, 
        createForeground: function()
           {
            foreground = this.game.add.tileSprite(0,200, 8000, 147, "vordergrundBG");
           }, 
        
        updateParallax: function ()
            {
                foreground.tilePosition.x = -(this.game.camera.x * 0.7);
                background.tilePosition.x = -(this.game.camera.x * 0.1); 
            }, 
        createMusic: function()
            {
                    bMusic = this.game.add.audio('fun');
                    bMusic.play('', 0, 0.5, true);
                    //bMusic.onLoop.add(playBMusic, true);

                    jSound = this.game.add.audio('jump');
            }, 
        playBMusic: function()
            {
                    bMusic.play('', 0, 0.5, true);
            }, 
    	
    update:function(){
            this.updateParallax();
            // FPS ANZEIGE
            this.game.debug.text(this.game.time.fps, this.game.width-50, 50, "#00ff00");

            //this.game.physics.arcade.collide(player,pLayer); // KOLLISION SPIELER MIT DEN PLATTFORMEN WIRD AKTIVIERT
            //this.game.physics.arcade.collide(quallen,pLayer);  //KOLLISION QUALLEN MIT DEN PLATTFORMEN WIRD AKTIVERT
            //this.game.physics.arcade.collide(catcher,pLayer); // KOLLISION KESCHER MIT DEN PLATTFORMEN WIRD AKTIVIERT 
        }
    
}; 