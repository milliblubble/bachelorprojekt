require('../Common');

var Wolf = require('../enemies/Wolf');
//var burger = require('../entities/Flag'); 


var Level = require('./Level');
//var PlatformLevel = require('./level_types/PlatformLevel');

//var PADDLE_SPEED = 130;


LevelOne = function() {
	// TODO Quallenpostion hier eintragen 
	this.wolfSpawnSettings =[
		{x: 18, y: 32, direction: 'right'},
		{x: 30, y: 30, direction: 'left'},
		{x: 44, y: 30, direction: 'left'},
		{x: 142, y: 30, direction: 'left'}]; 

	this.startingCameraPosX = 0;
	this.startingCameraPosY = 0;
	this.spawnPosX = 150;
	this.spawnPosY = 300;

	// this.spawnPosX = 320;
	// this.spawnPosY = 300;

	// this.spawnPosX = 177 * TILE_SIZE;
	// this.spawnPosY = 5 * TILE_SIZE;


	// this.spawnPosX = 106 * TILE_SIZE;
	// this.spawnPosY = 6 * TILE_SIZE;

	this.map = null;
    this.pLayer = null;
   // this.movingPlatforms = [];

    this.bg = null;
    
    this.bgLayer1 = null;
    this.bgLayer2= null;
    this.background= null;
    this.foreground= null; 
    this.burger = null; 

   // this.emptySpaceTiles = [1];
}

LevelOne.prototype = {
	create: function() {

		this.playMusic();
		 
		//burger = new Flag(400,100); 
		
		// No real reason to use tilesprite instead of static image... doing it just for the hell of it.
		this.bg = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'bikiniBottomBG');
		this.bg.fixedToCamera = true;

		this.initLevel('level_01', 'tile-sheet', 'tiles');


		this.setTileCollisions();
		this.createLayers();
		player.create();
		this.enemyGroup = game.add.group();
		this.createEnemies();
		this.createHealthPotion(); 
		
		
		

		//this.createPlatforms();
		//this.createVictoryFlag(184 * TILE_SIZE, 4 * TILE_SIZE - 54);

		//this.cursors = game.input.keyboard.createCursorKeys(); // make this global?

		

		this.fadeIn(function() {
			this.displayLevelTitle('level_one_title')
		}, this);
	
	}, 

	createLayers: function() {
		this.background = game.add.tileSprite(0,this.map.height+900, 10000, 320, "sandBG");
		this.bgLayer2 = this.map.createLayer("Background Layer 2");
    	this.bgLayer1 = this.map.createLayer("Background Layer 1");
    	this.pLayer = this.map.createLayer("Platform Layer");
    	this.foreground = game.add.tileSprite(0,game.height+500, 8000, 147, "vordergrundBG");
    	this.house = this.map.addTilesetImage("Spongeboy_House","spongeboy_house");
		this.shield =this.map.addTilesetImage("Rusty_Cancer_Shield", "rusty_cancer_shield");
		this.rustyCancer = this.map.addTilesetImage("Rusty_Cancer_House","rusty_cancer_house");



		/*map = game.add.tilemap("level_01");
		map.addTilesetImage("Spongeboy_House","spongeboy_house");
		map.addTilesetImage("Rusty_Cancer_Shield", "rusty_cancer_shield");
		map.addTilesetImage("Rusty_Cancer_House","rusty_cancer_house");
		background = game.add.tileSprite(0,map.height+900, 10000, 320, "sandBG");
		bgLayer2 = map.createLayer("Background Layer 2");
    	bgLayer1 = map.createLayer("Background Layer 1");
    	pLayer = map.createLayer("Platform Layer");

		this.background = this.map.createLayer('Background');
		this.layer = this.map.createLayer('World');*/

		//this.background.resizeWorld();
		this.pLayer.resizeWorld();
	},

	createEnemies: function() {
		Wolf.spawn(this.wolfSpawnSettings, this.enemyGroup);
		
	},

	createHealthPotion:function(){
			this.burger = game.add.sprite(400,1000, "burger"); 
			this.burger.scale.setTo(1.5,1.5); 
			this.burger.inputEnabled = true; //TEST 
			this.burger.input.enableDrag(); //TEST

	},

	setTileCollisions: function() {

		this.map.setCollisionBetween(1, 500, true, 'Platform Layer'); 
        this.map.setCollisionBetween(1, 100, true, 'Background Layer 1');
	},

	update: function() {
		game.physics.arcade.collide(player.sprite, this.pLayer);// KOLLISION SPIELER MIT DEN PLATTFORMEN WIRD AKTIVIERT
		
		//game.physics.arcade.collide(quallen,pLayer);  //KOLLISION QUALLEN MIT DEN PLATTFORMEN WIRD AKTIVERT
		game.physics.arcade.collide(this.catcher,this.pLayer); // KOLLISION KESCHER MIT DEN PLATTFORMEN WIRD AKTIVIERT 

		player.update();

		if(player.deathInitiated) {
			return;
		}
	
		

		//this.movePlatforms();

		this.enemyGroup.forEach(function(enemy) {
			try {
				game.physics.arcade.collide(enemy, this.movingPlatforms);
				enemy.parentEntity.update();
			} catch (e) {
				// If game is still in update loop when restarting due to death.
			}
			
		});
		} 


		


	
	
};

module.exports = LevelOne;
