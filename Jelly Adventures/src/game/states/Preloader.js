var Preloader = function (game) {
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.displayLoadScreen();
    this.loadAssets();
  },

  displayLoadScreen: function () {
    var centerX = game.camera.width / 2;
    var centerY = game.camera.height / 2;

    this.loading = game.add.sprite(centerX, centerY - 20, 'loading');
    this.loading.anchor.setTo(0.5, 0.5);

    this.barBg = game.add.sprite(centerX, centerY + 40, 'load_progress_bar_dark');
    this.barBg.anchor.setTo(0.5, 0.5);

    this.bar = game.add.sprite(centerX - 192, centerY + 40, 'load_progress_bar');
    this.bar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.bar);

    // onLoadComplete is dispatched when the final file in the load queue has been loaded/failed. addOnce adds that function as a callback, but only to fire once.
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },

  loadAssets: function () {
    // LADEN DES MENÜ-BILDSCHIRMS 
    this.load.image('game_logo','assets/sprites/menu/game_logo.png'); 
    this.load.image('play_button', 'assets/sprites/menu/play_button.png'); 
    this.load.image('help_button', 'assets/sprites/menu/help_button.png'); 
    this.load.image('credits_button', 'assets/sprites/menu/credits_button.png');

    //LADEN DER LEVELAUSWAHL --> eventuell später einfügen 
    this.load.image('select_level', 'assets/sprites/menu/select_level.png');
    this.load.image('level_1_button', 'assets/sprites/menu/level_01_button.png');
    this.load.image('level_2_button', 'assets/sprites/menu/level_02_button.png');
    this.load.image('back_button', 'assets/sprites/menu/back_button.png');

    // Load victory screen image
    this.load.image('level_completed', 'assets/sprites/menu/level_completed.png');

    // Load title screens --> später hinzufügen 
    this.load.image('level_one_title', 'assets/Sprites/menu/levelonetitle.png');
    this.load.image('level_two_title', 'assets/Sprites/menu/leveltwotitle.png');

    // Load tiles.
    //this.load.tilemap('levelOne', 'assets/levels/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    //this.load.image('levelOneTiles', 'assets/tiles/area02_level_tiles.png');
    this.load.tilemap('levelTwo', 'assets/levels/levelTwo.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('levelTwoTiles', 'assets/tiles/area01_level_tiles.png');
    // LADEN DER TILEMAP
    this.load.tilemap("level_01", "assets/levels/level_01.json",null,Phaser.Tilemap.TILED_JSON);

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

    //LADEN DER SCHILDER --> nochmals versuchen
    /*game.load.image("schild_laufen", "assets/Object/laufen.png");  
    game.load.image("schild_springen", "assets/Object/springen.png"); 
    game.load.image("schild_fangen", "assets/Object/fangen.png"); 
    game.load.image("schild_gefahr", "assets/Object/danger.png"); 
    game.load.image("schild_burger", "assets/Object/power.png");*/
    
    // Load miscellaneous sprites/images.
    this.load.image('platform', 'assets/sprites/misc/paddle-small.png');
    this.load.spritesheet('flag', 'assets/sprites/misc/flag.png', 34, 54);

    // Load backgrounds.
    this.load.image('space', 'assets/backgrounds/space.png');
   

    // Load enemies.
    this.load.spritesheet('baddie', 'assets/sprites/enemies/baddie.png', 32, 32);
    this.load.spritesheet('wolf', 'assets/sprites/enemies/wolf.png', 58, 41);
    this.load.spritesheet('missile', 'assets/sprites/misc/missile.png', 48, 21);
    this.load.spritesheet('gunship', 'assets/sprites/enemies/gunship.png', 70, 52);
    this.load.spritesheet('phoenix', 'assets/sprites/enemies/phoenixsprite.png', 48, 32);
    this.load.spritesheet('squirrel', 'assets/sprites/enemies/squirrel.png', 49, 30);
    this.load.image('fireball', 'assets/sprites/misc/fireball.png');
    this.load.spritesheet('bird', 'assets/sprites/enemies/bluebirdsprite.png', 48, 32);

    // Load assets for main character.
    this.load.spritesheet('dude', 'assets/sprites/player/Spongeboy3.png', 64, 62);
    // LADEN DER SPRITESHEETS
    this.load.spritesheet("player", "assets/sprites/player/Spongeboy3.png",64,62); // Spieler-Sprite
    this.load.spritesheet('qualle', "assets/sprites/enemies/Qualle01.png", 64, 64);  // Quallen-Sprite
    this.load.spritesheet("bubble", "assets/sprites/Bubble.png", 64, 64);  // Quallen-Sprite
    this.load.spritesheet("catcher", "assets/sprites/Kescher.png",64,128); //Catcher- Sprites
    this.load.spritesheet("burger", "assets/Object/burger.png");
   


    //EINSTELLEN DER MUSIK 
    this.load.audio('fun', 'assets/Audio/fun.mp3');  // Backgroundmusik FUN-Song
    this.load.audio('jump', 'assets/Audio/jump.mp3'); //Jump Sound
    this.load.audio('woosh1', 'assets/Audio/woosh01.mp3'); // catcher sound
    this.load.audio('woosh2', 'assets/Audio/woosh02.mp3');
    this.load.audio('woosh3', 'assets/Audio/woosh03.mp3');
},

  update: function () {
    if (!!this.ready) { // !! is "bang bang you're a boolean". Not sure why it's necessary here....me either
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};

},{}],"C:\\wamp\\www\\AndrewWorld\\src\\game\\states\\Victory.js":[function(require,module,exports){
var Victory = function() {};

module.exports = Victory;

Victory.prototype = {
    create: function() {
        var victoryImage = game.add.image(-game.cache.getImage('level_completed').width, game.camera.height / 2, 'level_completed');
        victoryImage.anchor.setTo(0.5, 0.5);

        var tween = game.add.tween(victoryImage);
        tween.to({x: game.camera.width / 2}, 500, null);
        tween.start();
    },

    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('Menu');
        }
    }
};