 // KARTENVARIABLE
    var background, foreground;
    var map;
    var bgLayer,wLayer,pLayer;

// Soundvariablen
    //var bMusic;
    //var jSound;


    
 var level01State ={



//HEALTH & SCORE VARIABLEN 
    create: function(){

    game.stage.backgroundColor ="#15DAFF";
    background = game.add.tileSprite(0,game.height+320, 10000, 320, "sandBG");

    map = game.add.tilemap("level_01");
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
    foreground = game.add.tileSprite(0,game.height+500, 8000, 147, "vordergrundBG");



    
    }, 




    
    update: function(){

    foreground.tilePosition.x = -(game.camera.x * 0.7);
    background.tilePosition.x = -(game.camera.x * 0.1); 
        
   } 

   

   /* Win: function(){
        game.state.start('win'); 
    }*/
    
    
}

///////////////////////////////
//////MUSIK MUSS NOCH EINGEBUNDEN WERDEN - PLATZHALTER 
//////////////////////////////

// Funktion zum Musik abspielen
/*createMusic: function ()
{
    bMusic = game.add.audio('fun');
    bMusic.play('', 0, 0.5, true);
    //bMusic.onLoop.add(playBMusic, true);
    
    jSound = game.add.audio('jump');
}, 


// Funktion zum Loopen der Musik
 playBMusic: function()
{
    bMusic.play('', 0, 0.5, true);
} */


