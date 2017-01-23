
var level02 = function(game){};
// KARTENVARIABLE
var background;
var foreground; 
var map;
var bgLayer,wLayer,pLayer;

var ghost;
var chest;

// Soundvariablen
var bMusic;
var jSound;
var woosh1;
var woosh2;
var woosh3;
var deathSound;

var soundOn = true;
var shock;

// VARIABLEN FÜR DEN SPIELER 
var player;
var catcher;  
var playerDead = false;
 

var life = 100; 
var score= 0; 
var test;

//VARIABLEN FÜR DEN ENDBOSS 
var endboss; 
var lightning; 
var lightningBall;
var lifeEndboss = 100; 

// GRUPPENVARIABLE
var quallen, bubbles;

var firstCollision = true;
var firstCollisionDying = true;
var timeCheck;

var cButtonRemove = false;
var catchCounter = 0;

level02.prototype = {
	create:function () 
{
	// FPS ANZEIGE
    this.game.time.advancedTiming = true;

    this.createWorld();  // ERSTELLT DIE WELT
    this.createMusic();  // EINSTELLUNGEN DER MUSIK

    this.createPlayer(); // ERSTELLT DEN SPIELER
    this.createCatcher(); //ERSTELLT DEN KESCHER
    
    this.createControl();  // ERSTELLUNG DER STEUERUNG
    this.createQuallen();  // ERSTELLT QUALLEN AUF DER MAP 

    this.createEndboss(); //ERSTELLT DEN ENDBOSS

    this.createQuallenG();

	
	this.createGhost();
	this.createChest();
	
    this.createForeground(); // ERSTELLT DEN VORDERGRUND
    this.createScoreBar(); //ERSTELLT DIE SCORE & HEALTHBAR
    
    this.createBubbleGroup();
    this.createBubble()

    this.createSoundButton();
    this.createPauseButton();
    this.createMonster();

    //debug();
    //create score and healtbar

}, 
update:function() 
{
    // FPS ANZEIGE
    this.game.debug.text(this.game.time.fps, this.game.width-50, 50, "#00ff00");

    this.game.physics.arcade.collide(player,pLayer); // KOLLISION SPIELER MIT DEN PLATTFORMEN WIRD AKTIVIERT 
    if(firstCollision == true  && firstCollisionDying == true) {
        this.game.physics.arcade.overlap(player,quallen, this.killPlayer, null, this); // VERLETZT SPIELER 
        this.game.physics.arcade.overlap(player,quallenG, this.killPlayerTwo, null, this);
    }
    if(this.game.time.now - timeCheck > 1000) {
        firstCollision = true;
    }
    if(this.checkOverlap(player,monster)) {
        this.gameOver();
    }

    //if (this.checkOverlap(player, attack01))

   /* if(this.checkOverlap(catcher, quallen2) == true) {
       catchButton.onDown.add(this.collectJellyfish2, this);
    }*/
  //  this.game.physics.arcade.overlap(catcher,quallen2, this.collectJellyfish, null, this); //EINSAMMELN DER QUALLEN 
    if(this.checkOverlap(catcher, quallenG)) {
    	catchButton.onDown.add(this.collectJellyfishG);
    	if(cButtonRemove == true) {
    		catchButton.onDown.remove(this.collectJellyfishG);
    	}
    }

    this.game.physics.arcade.overlap(catcher,quallen, this.collectJellyfish, null, this); //EINSAMMELN DER QUALLEN 
    this.game.physics.arcade.collide(quallen,pLayer);  //KOLLISION QUALLEN MIT DEN PLATTFORMEN WIRD AKTIVERT
    this.game.physics.arcade.collide(catcher,pLayer); // KOLLISION KESCHER MIT DEN PLATTFORMEN WIRD AKTIVIERT 
    this.game.physics.arcade.overlap(player,lightning, this.killPlayer, null, this);
    this.game.physics.arcade.overlap(player,lightningBall, this.killPlayer, null, this);
    this.game.physics.arcade.overlap(catcher,endboss, this.killEndboss, null, this);

    catcher.x = Math.floor(player.x +70); //Kescher folgt Spongeboy
    catcher.y = Math.floor(player.y -65);
    
    
    this.checkOverlapAbyss(); //Überprüfung ob spongebob runtergefallen ist
    
    this.updatePlayerControl();  // SPIELERSTEUERUNG WIRD AKTUALLISIERT
    this.updateCatcherControl(); 
    
    this.game.physics.arcade.collide(bubbles,pLayer, this.destroyBubble, null,this);  //KOLLISION BUBBLE MIT DEN PLATTFORMEN WIRD AKTIVERT
    this.game.physics.arcade.collide(player,bubbles);  //KOLLISION BUBBLE MIT DEM PLAYER WIRD AKTIVERT

    this.updateParallax();
    // ZEIGT HITBOXEN
    //debug();
},

createWorld: function()
{
	this.game.stage.backgroundColor ="#15DAFF";
	//background.fixedToCamera = true;
	map = this.game.add.tilemap("level_02");
	background = this.game.add.tileSprite(0,map.height, 10000, 320, "sandBG");
    map.addTilesetImage("SteeringWheel","steeringWheel");
	this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.createBubble, this);

	map.addTilesetImage("tile-sheet","tiles");
    bgLayer2 = map.createLayer("Background Layer 2");
    bgLayer1 = map.createLayer("Background Layer 1");
    pLayer = map.createLayer("Platform Layer");

   // AKtiviert die Kollision für die Platform Layer in den Bereichen 1-20

    map.setCollisionBetween(1, 500, true, 'Platform Layer'); 
	map.setCollisionBetween(1, 100, true, 'Platform Layer');

    // Anzeigen der Kollisionbox
    pLayer.resizeWorld();
},
createForeground: function(){
	foreground = this.game.add.tileSprite(0,map.height, 8000, 147, "vordergrundBG");

}, 
updateParallax:function ()
{
    foreground.tilePosition.x = -(this.game.camera.x * 0.7);
    background.tilePosition.x = -(this.game.camera.x * 0.1); 
},
//Funtkion zum Erstellen des Spielers
createPlayer:function()
{
    player = this.game.add.sprite(map.objects["Player Layer"][0].x,map.objects["Player Layer"][0].y, "player"); //PLAYER WIRD AUF VORDEFINIERTEN BEREICH GESETZT
    player.inputEnabled = true;
    player.input.enableDrag(); 
      
    // Player Physic wird geladen
    this.game.physics.enable(player, Phaser.Physics.ARCADE);  

    // Physic für den Player wird gesetzt
    player.body.gravity.y = 300;
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    
    //Hitbox angepasst
    player.body.setSize(40,55,0,10);

    // Animation erstellen
    player.animations.add("right",[2,3],5,true);
    player.animations.add("left",[0,1],5, true);
    player.animations.add("catchR", [3,4,2], 11, true);
    player.animations.add("catchL", [0,10,2], 11, true);
    //player.animations.add("catch", [4], 5, true);
    player.animations.add("jumpR", [5],11,true);
    player.animations.add("jumpL", [9],11,true);
    player.animations.add("die", [6,7,8], 2, false);


    //Richtung
    player.direction = "right";

    // Die Kamera folgt dem Spieler
    this.game.camera.follow(player);   
    
    // zuweisung des spongeboy sprites und positionierung
    spongeFace = this.game.add.sprite(0,420, 'spongeFace');
    spongeFace.scale.setTo(2,2);
    spongeFace.fixedToCamera = true;
    spongeFace.visible = false;
    spongeFace.animations.add('talk', [0,1],2, true);
},


createCatcher:function(){

    catcher = this.game.add.sprite(player.x, player.y,'catcher'); 
    catcher.scale.setTo(1.5,1.5); 
    catcher.anchor.set(0.5);

    catcher.inputEnabled = true;
    catcher.input.enableDrag();
    this.game.physics.enable(catcher, Phaser.Physics.ARCADE); //Problem  
    catcher.body.moves = false;
    catcher.body.collideWorldBounds = true; 

    catcher.direction = "right";

    catcher.animations.add("jumpR", [4], 6);
    catcher.animations.add("jumpL", [5], 6);
},

createPauseButton: function() {
    pauseButton = this.game.add.sprite(750, 15, 'pause');
    pauseButton.scale.setTo(0.5,0.5);
    pauseButton.inputEnabled = true;
    pauseButton.fixedToCamera = true;
    if(pause == false) {
        pauseButton.frame = 0;
    }
    pauseButton.events.onInputDown.add(function () {this.game.paused = true; pauseButton.frame = 1;},this);
    this.game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false; pauseButton.frame = 0;},this);
},

createGhost:function()
{
	ghost = this.game.add.group();
	ghost.enableBody = true;
    ghost.enableBodyDebug = true;
	
	ghost.physicsBodyType = Phaser.Physics.ARCADE; 
    this.game.physics.enable(ghost, Phaser.Physics.ARCADE); 
    ghost.inputEnabled = true; 
    
    map.createFromObjects('Object Layer', "SleepingDutchman", 'sleepingDutchman', 0, true, false, ghost);
    
	ghost.callAll('animations.add', 'animations', 'sleep', [0, 1], 2, true);
    ghost.callAll('animations.play', 'animations', 'sleep');
},

createChest:function()
{
	chest = this.game.add.group();
	chest.enableBody = true;
    chest.enableBodyDebug = true;
	
	chest.physicsBodyType = Phaser.Physics.ARCADE; 
    this.game.physics.enable(chest, Phaser.Physics.ARCADE); 
    chest.inputEnabled = true; 
    
    map.createFromObjects('Object Layer', "Chest", 'treasureChest', 0, true, false, chest);
    
	chest.callAll('animations.add', 'animations', 'open', [0, 1], 2, true);
    //chest.callAll('animations.play', 'animations', 'open');
},
createEndboss:function(){
    endboss = this.game.add.sprite(300,1950, "endboss");
    endboss.scale.setTo(0.3,0.3);
    endboss.enableBody = true;
    endboss.enableBodyDebug = true;
    endboss.physicsBodyType = Phaser.Physics.ARCADE;
    this.game.physics.enable(endboss, Phaser.Physics.ARCADE); 

    endboss.animations.add("moving", [0,1], 4, true);
    endboss.animations.play("moving"); 
    endboss.body.moves = false;
    endboss.collideWorldBounds = true;
    this.tween1(); 
    //var tween = this.game.add.tween(endboss).to({y:1800},2000, "Linear", true);
    //tween.onComplete.addOnce(this.tween2, this); 
    //tween.start();
    //tween.yoyo(true, 500);


}, 
 tween1: function(){
    var tween1 = this.game.add.tween(endboss).to({x:300, y:1800},2000, "Linear", true, 5000);  //wartet 2 Sekunden bis der nächste tween aufgerufen wird 
    this.time.events.repeat(Phaser.Timer.SECOND *1, 5, this.attack02, this); 
    tween1.onComplete.addOnce(this.tween2,this); 
    

 }, 
 tween2: function(){    
     var tween2 = this.game.add.tween(endboss).to({x:100, y: 1800},2000, "Linear", true); //wartet 2 Sekunden bis der nächste tween aufgerufen wird      
     tween2.onComplete.addOnce(this.tween3,this);  
 }, 

 tween3:function(){
    var tween3 = this.game.add.tween(endboss).to({x:300, y:1800},2000, "Linear", true,5000);
     this.time.events.repeat(Phaser.Timer.SECOND *1, 5, this.attack01, this); 
    tween3.onComplete.addOnce(this.tween4,this); 

 }, 
 tween4:function(){
    var tween4 = this.game.add.tween(endboss).to({x: 300, y:1950}, 2000, "Linear", true);
    tween4.onComplete.addOnce(this.tween1,this); 

 }, 
 attack01: function(){
    lightning=this.game.add.sprite(100, 1950, "attack01");
    lightning.scale.setTo(0.3,0.3); 
    this.game.physics.enable(lightning, Phaser.Physics.ARCADE); 
    //attack02.body.bounce.y = 0.9;
    lightning.collideWorldBounds = true;
    //attack02.animations.add("rolling", [0,1], 6, true);
    //attack02.animations.play("rolling");
    var tween = this.game.add.tween(lightning).to({x:100, y:2020}, 2000, "Linear", true); 
    //this.time.events.add(20000, this.attack01.kill, this);

 }, 


 attack02: function(){

    lightningBall =this.game.add.sprite(300, 2020, "attack02");
    this.game.physics.enable(lightningBall, Phaser.Physics.ARCADE); 
    lightningBall.body.bounce.y = 0.9;
    lightningBall.collideWorldBounds = true;
    lightningBall.animations.add("rolling", [0,1], 6, true);
    lightningBall.animations.play("rolling");
    var tween = this.game.add.tween(lightningBall).to({x:150, y:2020}, 2000, "Linear", true); 
   
 },



createQuallen:function()
{
    //  Die Gruppe für Quallen wird erstellt
    quallen = this.game.add.group();
    // Quallen erhalten einen Körper
    quallen.enableBody = true;
    quallen.enableBodyDebug = true;
    
    quallen.physicsBodyType = Phaser.Physics.ARCADE; 
    this.game.physics.enable(quallen, Phaser.Physics.ARCADE); 
    quallen.inputEnabled = true; 
    
    map.createFromObjects('Object Layer', "Qualle", 'qualle', 0, true, false, quallen);
     
    // ANNIMATION DER QUALEN
    quallen.callAll('animations.add', 'animations', 'wackeln', [0, 1, 2, 3], 3, true);
    quallen.callAll('animations.play', 'animations', 'wackeln');
},

createQuallenG: function() {
	quallenG = this.game.add.sprite(500, 1950, "qualle2");
	quallenG.animations.add("move", [0, 1, 2 , 3], 3, true);
	quallenG.animations.play("move");
	this.game.physics.enable(quallenG, Phaser.Physics.ARCADE); 
	quallenG.body.moves = false;
	quallenG.body.immovable = false;	
},


createBubbleGroup: function()
{
	bubbles = this.game.add.group();
	bubbles.enableBody = true;
	bubbles.physicsBodyType = Phaser.Physics.ARCADE;
},
createBubble: function()
{
	map.createFromObjects('Object Layer', "Bubble", "bubble", 3, true, false, bubbles);

	bubbles.setAll("body.allowGravity", false);
	bubbles.setAll("body.immovable", true);
},

destroyBubble: function(bubbles, pLayer)
{
	bubbles.kill();
},
// Funktion zum Einstellen der Steuerung
createControl:function()
{
    cursors = this.game.input.keyboard.createCursorKeys();   
    sprungButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    catchButton =this.game.input.keyboard.addKey(Phaser.Keyboard.C);
},

// Funktion zum Musik abspielen
createMusic:function()
{
    bMusic = this.game.add.audio('fun');
    bMusic.play('', 0, 0.5, true);
    //bMusic.onLoop.add(playBMusic, true);
    
    jSound = this.game.add.audio('jump');
    woosh1 = this.game.add.audio('woosh1');
    woosh2 = this.game.add.audio('woosh2');
    woosh3 = this.game.add.audio('woosh3');
    deathSound = this.game.add.audio('deathSound');
    eatingSound = this.game.add.audio('eatingSound');
    shock = this.game.add.audio('shock');
},

// Funktion zum Loopen der Musik
playBMusic:function()
{
    bMusic.play('', 0, 0.5, true);
},

createSoundButton: function() 
{
    soundButton = this.game.add.sprite(700, 15, "sound");
    soundButton.scale.setTo(0.5,0.5);
    soundButton.events.onInputDown.add(this.musicOnOff);
    soundButton.inputEnabled = true;
    soundButton.collideWorldBounds = true;
    soundButton.fixedToCamera = true;
    if(soundOn == true) {
        soundButton.frame = 0;
    }
    
},

musicOnOff: function() 
{
    if(soundOn == true) {
        bMusic.stop();
        soundOn = false;
        soundButton.frame = 1; 
    }
    else {
        bMusic.play();        
        soundOn = true;
        soundButton.frame = 0;
    }
},

createMonster: function() {
    monster = this.game.add.sprite(200, 2000, "seeungeheuer");
    monster.animations.add("bite", [0,1], 2, true);
    monster.animations.play("bite");
    monster.inputEnabled = true;
    this.game.physics.enable(monster, Phaser.Physics.ARCADE); 
    monster.body.moves = false;
    monster.collideWorldBounds = true;
    var tween = this.game.add.tween(monster).to({y:1500},5000, "Linear", true, 0, -1);
    tween.start();
    tween.yoyo(true, 500);
},

checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
},



//ERSTELLT DEN SCORE & HEALTH TEXT OBEN LINKS
createScoreBar:function(){

    scoreText = this.game.add.text(60 ,16, 'Score:' + score + '', { fontSize: '32px', fill: '#000'}); 
    scoreText.anchor.set(0.5); 
    scoreText.fixedToCamera= true;

    lifeText = this.game.add.text(92, 40, 'Health:' + life + '%', {fontSize: '32px', fill: '#000'} ); 
    lifeText.anchor.set(0.5); 
    lifeText.fixedToCamera =true; 
},

updatePlayerControl:function()
{
    // Resetet die Player Velocity
    player.body.velocity.x = 0; 

    if(playerDead !== true){

        if(cursors.left.isDown)     //funktioniert
        {
            // Bewegt sich nach links
            player.direction = "left";
            player.body.velocity.x = -250;
            player.animations.play("left");
        }
        else if (cursors.right.isDown)  //funktioniert
        {
            // Bewegt sich nach rechts
            player.direction = "right";
            player.body.velocity.x = 250;
            player.animations.play("right");
        }
        else                        // funtioniert
        {
            //Still stehenbleiben       
            player.animations.stop();
            if(player.direction == "left"); {
                player.frame = 1;       
            }
            if(player.direction == "right"){
                player.frame = 2;           
            }
        }
    
        // Erlaubt das Springen mit der Pfeiltaste ODER Leertaste, wenn der boden berührt wird.
        if ((sprungButton.isDown || cursors.up.isDown) && cursors.left.isDown && player.body.onFloor())    //funktioniert
        {
            player.direction = "left";
            player.animations.play("jumpL");
            player.body.velocity.y = -500;
            if(soundOn == true) {
                jSound.play('', 0, 0.5, false);
            }
        }
        else if ((sprungButton.isDown || cursors.up.isDown)  && cursors.right.isDown && player.body.onFloor())  //funktioniert
        {  
            player.direction = "right";
            player.animations.play("jumpR");
            player.body.velocity.y = -500;
            if(soundOn == true) {
                jSound.play('', 0, 0.5, false);
            }
        }
        else if ((sprungButton.isDown || cursors.up.isDown) && player.body.onFloor())   //funktioniert
        {    
            if(player.direction == "left") {
                player.frame = 9;
            }
            if(player.direction == "right") {
                player.frame = 5;
            }
            player.body.velocity.y = -400;
            if(soundOn == true) {
                jSound.play('', 0, 0.5, false);
            }
        }
        else if(player.body.onFloor() !== true && cursors.right.isDown)     //funktioniert
        {
            player.direction = "right"
            player.frame = 5;
        }
        else if(player.body.onFloor() !== true && cursors.left.isDown)      //funktioiert
        {
            player.direction = "left"
            player.frame = 9;
        }
        else if (player.body.onFloor() !== true) {
            if(player.direction == "left") {
                player.frame = 9;
            }
            if(player.direction == "right") {
                player.frame = 5;
            }
        }
    
        //catchButton.onDown.add(function(){
        if(catchButton.isDown) 
        {
            if(cursors.left.isDown) {
                player.direction = "left";
                player.frame = 10;
            }
            else if(cursors.right.isDown) {
                player.direction = "right";
                player.frame = 4;
            }
            else {
                if(player.direction == "left") {
                    player.frame = 10;      
                }
                if(player.direction == "right"){
                    player.frame = 4;           
                }
            }
            if(soundOn == true) {
                woosh3.play('', 0, 0.5, false);
            }
        }
    }
},

updateCatcherControl:function()
{

    if (cursors.right.isDown)
    {
        catcher.direction = "right";
        catcher.frame = 0; 
    }
    else if (cursors.left.isDown)
    {
        catcher.direction = "left";
        catcher.frame = 2;
        catcher.x = Math.floor(player.x + 50); //Kescher folgt Spongeboy
        catcher.y = Math.floor(player.y - 65);
    }
    else
    {
        if(catcher.direction == "left") {
            catcher.frame = 2;  
            catcher.x = Math.floor(player.x + 50); //Kescher folgt Spongeboy
            catcher.y = Math.floor(player.y - 65);
        }
        if(catcher.direction == "right"){
            catcher.frame = 0;              
        }
    }

    if (catchButton.isDown ) 
    {
        if(cursors.right.isDown) 
        {   
            catcher.direction = "right";
            catcher.frame = 1;
            catcher.x = Math.floor(player.x + 60);
        }
        else if (cursors.left.isDown)
        {
            catcher.direction = "left";
            catcher.frame = 3;
            catcher.x = Math.floor(player.x); //Kescher folgt Spongeboy
            catcher.y = Math.floor(player.y - 60); 
        }
        else if (sprungButton.isDown && cursors.right.isDown) 
        {
            catcher.direction = "right";
            catcher.animation.play("jumpR"); 
        }
        else if (sprungButton.isDown && cursors.left.isDown) 
        {
            catcher.direction = "left";
            catcher.animations.play("jumpL"); 
        }
        else 
        {
            if(catcher.direction == "left") {
                catcher.frame = 3;
                catcher.x = Math.floor(player.x); //Kescher folgt Spongeboy
                catcher.y = Math.floor(player.y - 60); 
            }
            if(catcher.direction == "right"){
                catcher.frame = 1;  
                catcher.x = Math.floor(player.x + 60);  
            }
        }
    }
},

/// ERHÖHT DEN SCORE UND TÖTEN GEFANGENE QUALLEN 
collectJellyfish:function(catcher, quallen)
{   
    if (catchButton.isDown)
    {
        score += 1;
        scoreText.text = 'Score: ' + score;   
        quallen.kill();
    }
},

killEndboss: function(catcher, endboss){

    if (catchButton.isDown && (lifeEndboss > 0))
    {
        lifeEndboss -= 10;  
        console.log("%cEndboss: " + lifeEndboss, "color: white; background: red");        
    }

    else if(lifeEndboss = 0)
    {
        lightning.kill(); 
        lightningBall.kill(); //TODO
        endboss.kill(); 
    }

}, 

collectJellyfishG: function()
{
	catchCounter += 1;
	score += 1;
	scoreText.text = 'Score: ' + score;
	if(catchCounter == 2) {
		quallenG.kill();
		cButtonRemove = true;
		catchCounter = 0;
	}
	
},




killPlayer:function(player,quallen)
{  
    if(life > 0)
    {
        life -= 10;  
        console.log("%c life : " +life , "color: white; background: red"); 
        shock.play('', 0, 0.3, false);
        lifeText.text = 'Health: '+ life +' %';
        if(player.direction == "right") {
            player.frame = 11;
        }
        if(player.direction == "left") {
            player.frame = 12;
        }
        firstCollision = false;
        timeCheck = this.game.time.now;
    }
    if (life <= 0)
    {
        firstCollisionDying = false;
        this.gameOver();
    }
},

killPlayerTwo:function(player,QuallenG)
{  
    if(life > 0)
    {
        life -= 20;  
        shock.play('', 0, 0.3, false);
        lifeText.text = 'Health: '+ life +' %';
        if(player.direction == "right") {
            player.frame = 11;
        }
        if(player.direction == "left") {
            player.frame = 12;
        }
        firstCollision = false;
        timeCheck = this.game.time.now;
    }
    if (life <= 0)
    {
        firstCollisionDying = false;
        this.gameOver();
    }
},



gameOver:function()
{
    bMusic.stop();
    catcher.kill();
    playerDead = true;
    player.animations.play("die");
    if(soundOn == true) {
        deathSound.play('', 0, 0.5, false);
    }
   // firstCollisionDying = false;

    var gameOvertext = this.game.add.text(400,150, 'Game over! Press R to restart', 
                                    {font: '50px Arial', fill: '#ffffff'}); 
    gameOvertext.anchor.set(0.5); 
    gameOvertext.fixedToCamera= true;

    var restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R); 
    restartKey.onDown.addOnce(this.level2);
       // playerDead = false;
        //this.level2(); 
        playerDead = false; 
        score = 0;
        life = 100;
     
},
// level2 funktion
level2: function()
{
	bMusic.stop();
	this.game.state.restart();
}, 

checkOverlap:function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
},

// wenn spongebob zu weit unten ist stirbt er
checkOverlapAbyss:function()
{
    if(player.y == 2335 && firstCollisionDying == true)
    {
        this.gameOver();
    }
},

debug:function()
{ 
    // ANZEIGE DER HITBOXEN
    this.game.debug.body(player);  // Spieler-Hitbox
    pLayer.debug = true; // Plattform Hitbox
}
} 

