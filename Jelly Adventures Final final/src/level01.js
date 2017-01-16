/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var level01 = function(game){};

// KARTENVARIABLE
var background;
var foreground; 
var map;
var bgLayer,wLayer,pLayer;
var level = 1;

// Soundvariablen
var bMusic;
var jSound;
var woosh1;
var woosh2;
var woosh3;
var deathSound;
var eatingSound;
var shock;

// VARIABLEN FÜR DEN SPIELER 
var player;
var catcher;
var burger;  
var playerDead = false;

var life = 100; 
var score= 0; 
var test;

// Variablen für den Dialog
var dialog;
var content = [];

var dialogWinCancer = 
[
"[ Mr. Cancer ]\n Das hast Du gut gemacht, Spongeboy!\n Wag Dich hinaus auf die größeren Felder, dort sind noch viele weitere Quallen\n und Herausforderungen." 
];

var dialogWinSpongeboy = 
[
"[ Spongeboy ]\n Aye Are Mr. Cancer!"
];

var dialogLoseContent = 
[
"[ Mr. Cancer ]\n Immer langsam, Meen Jong, wir brauchen noch einige Quallen für unser Gelee.\n Geh noch mal zurück und sammel noch einige Quallen."
];

var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 400;

// GRUPPENVARIABLE
var quallen, bubbles, mrcancer;

var firstCollision = true;
var firstCollisionDying = true;
var timeCheck;



level01.prototype = {

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

    this.createMrCancer(); // Erstellt MrCancer
    this.createDialog(); // variablen zuweisung mit aussehen des textes


    this.createForeground(); // ERSTELLT DEN VORDERGRUND
    this.createScoreBar(); //ERSTELLT DIE SCORE & HEALTHBAR
    this.createBurger(); //HEALTHPOTION
    
    this.createBubbleGroup();
    this.createBubble()

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
    }
    if(this.game.time.now - timeCheck > 1000) {
        firstCollision = true;
    }
    this.game.physics.arcade.overlap(catcher,quallen, this.collectJellyfish, null, this); //EINSAMMELN DER QUALLEN 
    this.game.physics.arcade.overlap(player,burger, this.getPower, null, this);
    this.game.physics.arcade.collide(quallen,pLayer);  //KOLLISION QUALLEN MIT DEN PLATTFORMEN WIRD AKTIVERT
    this.game.physics.arcade.collide(catcher,pLayer); // KOLLISION KESCHER MIT DEN PLATTFORMEN WIRD AKTIVIERT 

    catcher.x = Math.floor(player.x +70); //Kescher folgt Spongeboy
    catcher.y = Math.floor(player.y -65);
    
    this.levelOneDialog(); // Abspielen des Dialogs in Level 1
    
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
    map = this.game.add.tilemap("level_01");
       map.addTilesetImage("Spongeboy_House","spongeboy_house");
        map.addTilesetImage("Rusty_Cancer_Shield", "rusty_cancer_shield");
        map.addTilesetImage("Rusty_Cancer_House","rusty_cancer_house");
        background = this.game.add.tileSprite(0,map.height + 850, 10000, 320, "sandBG");
    
        map.addTilesetImage("Schild_Laufen", "schild_laufen");
        map.addTilesetImage("Schild_Springen", "schild_springen");
        map.addTilesetImage("Schild_Fangen", "schild_fangen");
        map.addTilesetImage("Schild_Power", "schild_burger");
        map.addTilesetImage("Schild_Danger", "schild_gefahr");

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

createForeground: function()
{foreground = this.game.add.tileSprite(0,this.game.height+500, 8000, 147, "vordergrundBG")}, 

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

// MrCancer erstellen
createMrCancer:function()
{
    mrcancer = this.game.add.group();
    mrcancer.enableBody = true;
    mrcancer.enableBodyDebug = true;
    
    mrcancer.physicsBodyType = Phaser.Physics.ARCADE; 
    this.game.physics.enable(mrcancer, Phaser.Physics.ARCADE); 
    mrcancer.inputEnabled = true; 
    
    map.createFromObjects('Object Layer', "Cancer", 'cancer', 0, true, false, mrcancer);
    
    // zuweisung des mrcancer sprites und positionierung
    cancerFace = this.game.add.sprite(0,420, 'cancerFace');
    cancerFace.scale.setTo(2,2);
    cancerFace.fixedToCamera = true;
    cancerFace.visible = false;
    cancerFace.animations.add('talk', [0,1],2, true);
},

createDialog:function()
{
    dialog = this.game.add.text(125,420, '', {
        fontSize: '18px', 
        fill: '#000', 
        backgroundColor: '#c2b280'      
    });
    dialog.fixedToCamera = true;
},

createBubbleGroup:function()
{
    bubbles = this.game.add.group();
    bubbles.enableBody = true;
    bubbles.physicsBodyType = Phaser.Physics.ARCADE;
},

createBubble:function()
{
    map.createFromObjects('Object Layer', "Bubble", "bubble", 3, true, false, bubbles);

    bubbles.setAll("body.allowGravity", false);
    bubbles.setAll("body.immovable", true);
},

destroyBubble:function(bubbles, pLayer)
{
    bubbles.kill();
},

//ERSTELLT DIE HEALTHPOTION  
createBurger:function()
{

    burger = this.game.add.sprite(3550, this.game.height + 80, "burger"); 
    burger.scale.setTo(1.5,1.5); 
    this.game.physics.enable(burger, Phaser.Physics.ARCADE); 
    burger.body.moves = false;
    burger.body.collideWorldBounds = true; 
    burger.inputEnabled = true; //TEST 
    burger.input.enableDrag(); //TEST
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
            jSound.play('', 0, 0.5, false);
        }
        else if ((sprungButton.isDown || cursors.up.isDown)  && cursors.right.isDown && player.body.onFloor())  //funktioniert
        {  
            player.direction = "right";
            player.animations.play("jumpR");
            player.body.velocity.y = -500;
            jSound.play('', 0, 0.5, false);
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
            jSound.play('', 0, 0.5, false);
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
    
            var x = Math.floor(Math.random()*3+1);
            if(x===1) {
                woosh1.play('', 0, 0.5, false);
            }
            if(x===2) {
                woosh2.play('', 0, 0.5, false);
            }
            if(x===3) {
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
} ,

getPower:function(player,burger) {
    if(life < 100) {
        life = 100;
        lifeText.text = 'Health:' + life + '%';
        burger.kill();
        eatingSound.play('', 0, 0.5, false);
    }
},

killPlayer:function(player,quallen)
{  
    if(life > 0)
    {
        life -= 10;  
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
    deathSound.play('', 0, 0.5, false);
    firstCollisionDying = false;

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

// starten des dialogs
levelOneDialog:function()
{
    if(this.checkOverlap(player, mrcancer))
    {
        if(score >= 1)
        {   
            this.nextLine(dialogWinCancer);
            cancerFace.visible = true;
            cancerFace.play("talk");
            this.game.time.events.add(5000, this.levelOneWin, this);
        }
        else
        {
            this.nextLine(dialogLoseContent);
            cancerFace.play("talk");
        }
    }
    else
    {
        dialog.text = "";
        cancerFace.visible = false;
        spongeFace.visible = false;
    }
},

// starten wenn man gewonnen hat -- im moment wird resetet muss aber zu level 2
levelOneWin:function()
{
    cancerFace.destroy();
    spongeFace.visible = true;
    spongeFace.play("talk");
    dialog.text = "";
    lineIndex = 0;
    this.nextLine(dialogWinSpongeboy);
    
    this.game.time.events.add(2000, this.level2, this);
}, 

// level2 funktion
level2:function()
{
    //level = 2;
    bMusic.stop();
    this.game.state.restart();
},
// nextLine und nextWord ist gedacht um einzelne worte auszugeben und nicht den kompletten text
nextLine:function(c) {
    content = c;
    
    if (lineIndex == 1)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

    //  Advance to the next line
    lineIndex++;
},

nextWord:function() {

    //  Add the next word onto the text string, followed by a space
    dialog.text = dialog.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex == line.length)
    {
        //  Add a carriage return
        dialog.text = dialog.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        this.game.time.events.add(lineDelay,this.nextLine, this);
    }
},

checkOverlap:function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
},

// wenn spongebob zu weit unten ist stirbt er
checkOverlapAbyss:function()
{
    if(player.y == 1151 && firstCollisionDying == true)
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
