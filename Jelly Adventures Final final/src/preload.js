var preload = function (game) {
  this.ready = false;
  console.log("%cStarting Preloader", "color: white; background: red"); 
    
};


preload.prototype = {

  preload: function () {
    this.displayLoadScreen();
    this.loadAssets();
  },

  displayLoadScreen: function () {
    var centerX = this.game.camera.width / 2;
    var centerY = this.game.camera.height / 2;
    

    this.loading = this.game.add.sprite(centerX, centerY - 20, 'loading');
    this.loading.anchor.setTo(0.5, 0.5);

    this.barBg = this.game.add.sprite(centerX, centerY + 40, 'load_progress_bar_dark');
    this.barBg.anchor.setTo(0.5, 0.5);

    this.bar = this.game.add.sprite(centerX - 192, centerY + 40, 'load_progress_bar');
    this.bar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.bar);

    // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. addOnce adds that function as a callback, but only to fire once.
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },

  loadAssets: function () {
    // LADEN DES MENÜ-BILDSCHIRMS 
    this.load.image('game_logo','assets/sprites/menu/game_logo.png'); 
    this.load.image('play_button', 'assets/sprites/menu/play_button.png'); 
    //this.load.image('help_button', 'assets/sprites/menu/help_button.png'); <-- Hilfsknopf muss noch hinzugefügt werden
    this.load.image('credits_button', 'assets/sprites/menu/credits_button.png');

    //LADEN DER LEVELAUSWAHL --> eventuell später einfügen 
    // this.load.image('select_level', 'assets/sprites/menu/select_level.png');
    this.load.image('level_1_button', 'assets/sprites/menu/level_01_button.png');
    this.load.image('level_2_button', 'assets/sprites/menu/level_02_button.png');
    this.load.image('back_button', 'assets/sprites/menu/back_button.png');

    // Load victory screen image
    this.load.image('level_completed', 'assets/sprites/menu/level_completed.png');

    // Load title screens --> später hinzufügen 
   // this.load.image('level_one_title', 'assets/Sprites/menu/levelonetitle.png');
   // this.load.image('level_two_title', 'assets/Sprites/menu/leveltwotitle.png');

    // Load tiles.
        // LADEN DER TILEMAP
    this.load.tilemap("level_01", "assets/Level/level_01.json",null,Phaser.Tilemap.TILED_JSON);
    this.load.tilemap("level_02", "assets/Level/level_02.json",null,Phaser.Tilemap.TILED_JSON);

    // LADEN DER TILEMAP
    this.load.image("tiles","assets/tiles/tile-sheet.png");


    /// LADEN DER HINTERGRUENDE
    this.load.image("bikiniBottomBG","assets/BG/sky.png");
    this.load.image("sandBG","assets/BG/sand.png");
    this.load.image("vordergrundBG","assets/BG/vordergrund_01.png");    

    // LADEN DER OBJEKTE
    this.load.image("spongeboy_house", "assets/Object/Spongeboy_House.png");  // Spongeboys Haus
    this.load.image("rusty_cancer_house", "assets/Object/Rusty_Cancer_House.png");  // Rusty Cancer Gebauede
    this.load.image("rusty_cancer_shield", "assets/Object/Rusty_Cancer_Shield.png");  // Rusty Cancer Schild
    this.load.image("steeringWheel", "assets/Object/SteeringWheel.png");  // Rusty Cancer Schild

    //Laden Dialog
    this.load.spritesheet("cancerFace", "assets/Sprites/MrCancerDialogue.png",62,62);
    this.load.spritesheet("spongeFace", "assets/Sprites/SpongeboyDialogue.png",64,64);

    //LADEN DER SCHILDER --> nochmals versuchen
    this.game.load.image("schild_laufen", "assets/Object/laufen.png");  
    this.game.load.image("schild_springen", "assets/Object/springen.png"); 
    this.game.load.image("schild_fangen", "assets/Object/fangen.png"); 
    this.game.load.image("schild_gefahr", "assets/Object/danger.png"); 
    this.game.load.image("schild_burger", "assets/Object/power.png");
    
    // LADEN DER SPRITESHEETS
    this.game.load.spritesheet("player", "assets/Sprites/Spongeboy4.png",64,64); // Spieler-Sprite
    this.game.load.spritesheet('qualle', "assets/Sprites/Qualle01.png", 64, 64);  // Quallen-Sprite
    this.game.load.spritesheet("bubble", "assets/Sprites/Bubble.png", 64, 64);  // Quallen-Sprite
    this.game.load.spritesheet("catcher", "assets/Sprites/Kescher.png",64,128); //Catcher- Sprites
    this.game.load.spritesheet("burger", "assets/Object/burger.png"); 
    this.game.load.spritesheet("cancer", "assets/Sprites/MrCancer.png",48,62);

    this.game.load.spritesheet("qualle2","assets/Sprites/Qualle2.png",57, 70);

    this.game.load.spritesheet("seeungeheuer", "assets/Sprites/Seamonster.png", 59, 202);
	
	this.game.load.spritesheet("treasureChest", "assets/Sprites/TreasureChest2.png",67,61);
	this.game.load.spritesheet("sleepingDutchman", "assets/Sprites/SleepingDutchman.png",256,256);


    //EINSTELLEN DER MUSIK 
    
    this.game.load.audio('fun', 'assets/Audio/fun.mp3');  // Backgroundmusik FUN-Song
    this.game.load.audio('jump', 'assets/Audio/jump.mp3'); //Jump Sound
    this.game.load.audio('woosh1', 'assets/Audio/woosh01.mp3'); // catcher sound
    this.game.load.audio('woosh2', 'assets/Audio/woosh02.mp3');
    this.game.load.audio('woosh3', 'assets/Audio/woosh03.mp3');
    this.game.load.audio('deathSound', 'assets/Audio/deathSound.mp3');
    this.game.load.audio('eatingSound', 'assets/Audio/eating.mp3');
    this.game.load.audio('shock', 'assets/Audio/shock.mp3');

     //MUSIC AN/AUS UND PAUSE BUTTON
    this.game.load.spritesheet("sound", "assets/Sprites/soundOnOff.png", 64, 64);
    this.game.load.spritesheet("pause", "assets/Sprites/pauseandplay.png", 64, 64);
},

  update: function () {
    if (!!this.ready) { // !! is "bang bang you're a boolean". Not sure why it's necessary here....me either
      this.game.state.start('GameMenu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
