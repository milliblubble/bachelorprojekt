/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var player;
var catcher;
var burger; 

var life =100; 
var score = 0; 

createPlayer: function()
{

    player = game.add.sprite(40,game.height +400, "player"); //Player wird erstellt == parennt
    player.inputEnabled = true;
    player.input.enableDrag(); 
      
    // Player Physic wird geladen
    game.physics.enable(player, Phaser.Physics.ARCADE);  

    // Physic für den Player wird gesetzt
    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;

    // Animation erstellen
    player.animations.add("right",[2,3],5,true);
    player.animations.add("left",[0,1],5, true);
    player.animations.add("catch", [4], 5, true);
    player.animations.add("die", [5,6,7], 5, true)

  
    // Die Kamera folgt dem Spieler
    game.camera.follow(player);   
  
}, 


createCatcher: function (){

  catcher = game.add.sprite(player.x, player.y,'catcher'); 
  catcher.scale.setTo(0.1,0.1); 
  catcher.anchor.set(0.5); 
  catcher.inputEnabled = true;
  catcher.input.enableDrag();
  game.physics.enable(catcher, Phaser.Physics.ARCADE); //Problem  
  catcher.body.moves = false;
  catcher.body.collideWorldBounds = true; 
}, 

//ERSTELLT DIE HEALTHPOTION  
createBurger: function()
{

    burger = game.add.sprite(400, game.height+400, "burger"); 
    burger.scale.setTo(1.5,1.5); 
    burger.inputEnabled = true; //TEST 
    burger.input.enableDrag(); //TEST

}, 

// Funktion zum Einstellen der Steuerung
createControl: function ()
{
    cursors = game.input.keyboard.createCursorKeys();   
    sprungButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    catchButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
}, 

//ERSTELLT DEN SCORE & HEALTH TEXT OBEN LINKS
createScoreBar: function(){

    scoreText = game.add.text(60 ,16, 'Score:' + score + '', { fontSize: '32px', fill: '#000'}); 
    scoreText.anchor.set(0.5); 
    scoreText.fixedToCamera= true;

    lifeText = game.add.text(92, 40, 'Health:' + life + '%', {fontSize: '32px', fill: '#000'} ); 
    lifeText.anchor.set(0.5); 
    lifeText.fixedToCamera =true; 
}, 


updatePlayerControl: function()
{ // Idee für weitere Bearbeitung: updatePlayerControl für die Gruppe armedPlayer überarbeiten
    // Resetet die Player Velocity
    player.body.velocity.x = 0;

    if(cursors.left.isDown)
    {
        // Bewegt sich nach links
        player.body.velocity.x = -150;
        player.animations.play("left");
    }
    else
    {
        if (cursors.right.isDown)
        {
            // Bewegt sich nach rechts
            player.body.velocity.x = 150;
            player.animations.play("right");
        }
        else
        {
            //Still stehenbleiben
            player.animations.stop();
            player.frame = 2;
        }
    }

    // Erlaubt das Springen mit der Pfeiltaste ODER Leertaste, wenn der boden berührt wird.
    if ((sprungButton.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        player.body.velocity.y = -400;
        jSound.play('', 0, 0.5, false);
    }
      
    if(catchButton.isDown)
    {
        player.animations.play("catch");
    }
}, 


/// ERHÖHT DEN SCORE UND TÖTEN GEFANGENE QUALLEN 

collectJellyfish: function (catcher, quallen) {   
  score += 1;
  scoreText.text = 'Score: ' + score;   
  quallen.kill();
} , 


 killPlayer: function (player,quallen){  
  if(life > 0) {
    life -= 10;  
    lifeText.text = 'Health: '+ life +' %';
    quallen.kill();
  }
  if (life <= 0) {
    game.state.restart(); 
    score = 0;
    life = 100;
  } 

   }, 

debug: function ()
{ 
    // ANZEIGE DER HITBOXEN
    game.debug.body(player);  // Spieler-Hitbox
    pLayer.debug = true; // Plattform Hitbox

}, 


update: 
game.debug.text(game.time.fps, game.width-50, 50, "#00ff00");

    game.physics.arcade.collide(player,pLayer); // KOLLISION SPIELER MIT DEN PLATTFORMEN WIRD AKTIVIERT 
    game.physics.arcade.overlap(player,quallen, killPlayer, null, this); // VERLETZT SPIELER 
    game.physics.arcade.overlap(catcher,quallen, collectJellyfish, null, this); //EINSAMMELN DER QUALLEN 
    game.physics.arcade.collide(quallen,pLayer);  //KOLLISION QUALLEN MIT DEN PLATTFORMEN WIRD AKTIVERT
    game.physics.arcade.collide(catcher,pLayer); // KOLLISION KESCHER MIT DEN PLATTFORMEN WIRD AKTIVIERT 

    catcher.x = Math.floor(player.x +30); //Kescher folgt Spongeboy
    catcher.y = Math.floor(player.y -10);


    
    if (checkOverlap(burger, player))
    {
        if (life < 100)
        {         
            life += 10;  
            lifeText.text = 'Health: '+ life +' %';
            burger.kill(); 
        }
    } 
      
  
  
  // ZEIGT HITBOXEN
  //debug();
