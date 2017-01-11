var PLAYER_WIDTH = 14;
var PLAYER_HEIGHT = 44;
var PLAYER_X_OFFSET = 9;
var PLAYER_Y_OFFSET = 0;
 

Player = function(xSpawnPos, ySpawnPos) {
    game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.jumpSound = null;
    this.catchSound =null; 
    this.xSpawnPos = xSpawnPos;
    this.ySpawnPos = ySpawnPos;
    this.yGravity = 400;
    this.catcher =null; 
    this.health =100; 
};
 
Player.prototype = {
    
    create: function () {
        this.facing = 'right'; // muss nochmal nachgearbeitet werden :///

        this.sprite = game.add.sprite(this.xSpawnPos, this.ySpawnPos, 'dude');
        this.catcher = game.add.sprite(this.xSpawnPos, this.ySpawnPos, 'catcher'); 

        //Uncomment the line below to test the platforms.
        // this.sprite = game.add.sprite(120 * TILE_SIZE, 4 * TILE_SIZE, 'dude');

        this.initializePlayerPhysics();
        this.initializePlayerAnimations();
        this.initializePlayerControls();
        this.initializePlayerAudio();

        this.initializeCatcherPhysics(); 
        this.initializeCatcherAnimations(); 
        this.createScoreBar(); 
         


        this.sprite.body.setSize(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_X_OFFSET, PLAYER_Y_OFFSET);

        // original size of sprite: height 48, width 32
        
        game.camera.follow(player.sprite);
    },

    initializePlayerPhysics: function() {
        // Player Physic wird geladen
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE); 
        //game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = this.yGravity;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.checkCollision.down = true;

        //  Linear damping = resistance/friction on the body as it moves through the world.
        this.sprite.body.linearDamping = 1;
    },

    initializePlayerAnimations: function() {      

        // Animation erstellen
        this.sprite.animations.add("right",[2,3],5,true);
        this.sprite.animations.add("left",[0,1],11, true);
        this.sprite.animations.add("catchR", [3,4,6], 11, true);
        this.sprite.animations.add("catchL", [0,10,1], 11, true);
        //player.animations.add("catch", [4], 5, true);
        this.sprite.animations.add("jumpR", [5],11,true);
        this.sprite.animations.add("jumpL", [9],11,true);
        this.sprite.animations.add("die", [6,7,8], 2, false);
    },

    initializePlayerControls: function() {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  
        this.cursors = game.input.keyboard.createCursorKeys();   
        this.catchButton = game.input.keyboard.addKey(Phaser.Keyboard.C);      
    },

    initializePlayerAudio: function() {
        this.jumpSound = game.add.audio('jump');
        this.catchSound = game.add.audio('whoosh1'); 
    },
 
    update: function() {
        if(!this.ignorePlayerCollisions) {
            this.updateCollisions();
        }

        if(!this.deathInitiated) {      
            this.updateMovement();
            this.updateCatcherMovement(); 
            }
        
        this.catcher.x = Math.floor(this.sprite.x + 20); //Kescher folgt Spongeboy
        this.catcher.y = Math.floor(this.sprite.y - 150); 
        this.sprite.checkWorldBounds = true;
        this.killIfOutOfBounds();
        //game.physics.arcade.overlap(this.player,this.enemyGroup, this.initiateDeath, null, this); // VERLETZT SPIELER 
        //game.physics.arcade.overlap(this.catcher,this.enemyGroup, updateScore, null, this); //EINSAMMELN DER QUALLEN 
    },

    updateScore:function(){
        if (this.catchButton.isDown)
    {
        score += 1;
        scoreText.text = 'Score: ' + score;   
        this.wolf.kill(); // oder qualle
    }
    }, 



    initializeCatcherPhysics: function(){
        game.physics.arcade.enable(this.catcher);
        this.catcher.scale.setTo(1.5,1.5);
        this.catcher.inputEnabled = true;
        this.catcher.input.enableDrag();
        this.catcher.body.moves = false;
        this.catcher.body.collideWorldBounds = true;            

    },

    initializeCatcherAnimations: function(){

         this.catcher.animations.add("idler", [0],6, true); 
         this.catcher.animations.add("idlel", [2], 6, true); 
         this.catcher.animations.add("activeR", [1,0], 6, true); 
         this.catcher.animations.add("activeL", [3,2], 6, true); 
         this.catcher.animations.add("jumpR", [4], 6);
         this.catcher.animations.add("jumpL", [5], 6);

    }, 
    createHealthBar: function(){


    lifeText = game.add.text(92, 40, 'Health:' + this.health + '%', {fontSize: '32px', fill: '#000'} ); 
    lifeText.anchor.set(0.5); 
    lifeText.fixedToCamera =true;}, 

     


    updateCatcherMovement:function(){
        if (this.cursors.right.isDown)
    {
        this.catcher.animations.play("idler");
        this.catcher.x = Math.floor(this.sprite.x); //Kescher folgt Spongeboy
        this.catcher.y = Math.floor(this.sprite.y -65); 
    }
    else if (this.cursors.left.isDown)
    {
        this.catcher.animations.play("idlel"); 
        this.catcher.x = Math.floor(this.sprite.x); //Kescher folgt Spongeboy
        this.catcher.y = Math.floor(this.sprite.y -65);
    }

    else
    {
        this.catcher.animations.stop(); 
        this.catcher.frame = 0; 
    }


    if (this.catchButton.isDown ) 
    {
        if(this.cursors.right.isDown) 
        {
            this.catcher.animations.play("activeR"); 
        }
        else if (this.cursors.left.isDown)
        {
            this.catcher.animations.play("activeL");
            this.catcher.x = Math.floor(this.sprite.x); //Kescher folgt Spongeboy
            this.catcher.y = Math.floor(this.sprite.y -60); 
        }
        else if (this.jumpButton.isDown && this.cursors.right.isDown) 
        {
            this.catcher.animation.play("jumpR"); 

        }
        else if (this.jumpButton.isDown && this.cursors.left.isDown) 
        {
            this.catcher.animations.play("jumpL"); 
        }
        else 
        {
            this.catcher.animations.play("activeR"); 
        }
    }

    }, 

     

    killIfOutOfBounds: function() {
        var maxHeight = this.deathInitiated ? game.camera.view.y + game.camera.height : game.world.height;

        if(this.sprite.position.y > maxHeight) {
            this.killPlayer();
        }
    },

    updateCollisions: function() {
        game.physics.arcade.collide(this.sprite, level.layer);
        game.physics.arcade.overlap(this.sprite, level.victoryFlag, level.triggerVictory, null, level);
        if(level.foreground != null && level.foreground != undefined) {
            game.physics.arcade.collide(this.sprite, level.foreground);    
        }

        game.physics.arcade.overlap(this.sprite, level.checkpoints, level.triggerCheckpoint, null, level);
    },

    
        

        /*if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.left.isDown) {
            this.jump();
            this.sprite.body.x -= level.vineThresholdX;
            this.endClimb();
        } else if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.cursors.right.isDown) {
            this.jump();
            this.sprite.body.x += level.vineThresholdX;
            this.endClimb();
        } else if(this.cursors.up.isDown) {
            this.sprite.animations.play('climb');
            this.sprite.body.velocity.y = -150;
        } else if(this.cursors.down.isDown) {
            this.sprite.animations.play('climb');
            this.sprite.body.velocity.y = 150;
        } else {
            this.sprite.animations.stop();
        }

        if(this.sprite.body.y > level.lowestPointOnCurrentVine + level.vineThresholdY) {
            this.endClimb();
        }*/
    

updateMovement: function() {
        // Resetet die Player Velocity
    this.sprite.body.velocity.x = 0; 


        if(this.cursors.left.isDown)     //funktioniert
        {
            // Bewegt sich nach links
            this.sprite.body.velocity.x = -250;
            this.sprite.animations.play("left");
        }
        else
        {
            if (this.cursors.right.isDown)  //funktioniert
            {
                // Bewegt sich nach rechts
                this.sprite.body.velocity.x = 250;
                this.sprite.animations.play("right");
            }
            else                        // funtioniert
            {
                //Still stehenbleiben
                this.sprite.animations.stop();
                this.sprite.frame = 2;
            }
        }

        // Erlaubt das Springen mit der Pfeiltaste ODER Leertaste, wenn der boden berührt wird.
        if ((this.jumpButton.isDown || this.cursors.up.isDown) && this.cursors.left.isDown && this.sprite.body.onFloor())    //funktioniert
        {
        //  player.frame = 9;
            this.sprite.animations.play("jumpL");
            this.sprite.body.velocity.y = -500;
            this.jumpSound.play('', 0, 0.5, false);
        }
        else if ((this.jumpButton.isDown || this.cursors.up.isDown) && this.sprite.body.onFloor() && this.cursors.right.isDown) {  //funktioniert
            this.sprite.animations.play("jumpR");
            this.sprite.body.velocity.y = -500;
            this.jumpSound.play('', 0, 0.5, false);
        }
        else if ((this.jumpButton.isDown || this.cursors.up.isDown) && this.sprite.body.onFloor()) {    //funktioniert
            this.sprite.animations.play("jumpR");
            //this.sprite.frame = 5;
            this.sprite.body.velocity.y = -400;
            this.jumpSound.play('', 0, 0.5, false);
        }
        else if(this.sprite.body.onFloor() !== true && this.cursors.right.isDown)
        {
            this.sprite.frame = 5;
        }
        else if(this.sprite.body.onFloor() !== true && this.cursors.left.isDown)
        {
            this.sprite.frame = 9;
        }
        else if(this.sprite.body.onFloor() !== true) {
            this.sprite.frame = 5;
        }
        
          
        //catchButton.onDown.add(function(){
        if(this.catchButton.isDown) {

            if(this.cursors.left.isDown) {
                this.sprite.frame = 10;
               // this.sprite.animations.play(catchL);
                this.catchSound.play('', 0, 0.5, false);
            }
            else if(this.cursors.right.isDown){
                this.sprite.frame = 4;
            }
            else {
                this.sprite.frame = 4;
            }
        
        }
    
 
    },

    jump: function() {
        this.sprite.body.position.y -= 5;
        this.sprite.body.velocity.y = -300;
        this.jumpSound.play();
    },


    initiateDeath: function() {
        if(window.invincible) {
            return;
        }

        // only one death animation can be in progress at once.
        // This field is reset after the player is killed.
        if(!this.deathInitiated) {
            this.deathInitiated = true;

            game.camera.unfollow();

            level.freezeSpritesAndProjectiles();

            this.sprite.body.allowGravity = false;
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;

            this.sprite.anchor.setTo(0.5, 0.5);

            var tween = game.add.tween(this.sprite);
            tween.to({angle: 540}, 300, null);
            tween.onComplete.add(function() {
                this.sprite.body.velocity.y = 700;
                this.ignorePlayerCollisions = true;
            }, this);
            tween.start();
        }
    },

    killPlayer: function() {
        // console.trace();
        this.ignorePlayerCollisions = false;
        this.deathInitiated = false;
        this.sprite.body.allowGravity = true;
        this.sprite.body.gravity.y = this.yGravity;

        if(level.title) {
            level.title.destroy();
        }

        this.sprite.kill();
        level.restart();
        level.fadeIn();
    }
};

module.exports = Player;