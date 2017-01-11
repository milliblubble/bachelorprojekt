Enemy = function(x, y, spritesheetKey, animation, speed) {

	
	this.sprite = game.add.sprite(x, y, spritesheetKey);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.animations.add( 'movement', animation,  6, true);
	this.sprite.animations.play('movement');

	//this.sprite.animations.add('movement', animation, 10, true);
	//this.sprite.animations.add( 'movement', animation,  10, true);
	this.speed = speed;
	//this.sprite.parentEntity = this;
}

Enemy.prototype = {
	 

	update:function(){
		 
		this.handleCollisions()
		this.deathAnimation(); 
	}, 
	handleCollisions: function() {
		// game.physics.arcade.collide(this.sprite, level.movingPlatforms);
		game.physics.arcade.collide(this.sprite, level.pLayer);
		game.physics.arcade.overlap(this.sprite, player.sprite, player.initiateDeath, null, player);
	},

	deathAnimation: function() {
		var tween = game.add.tween(player.sprite);
		tween.to({angle: 180}, 500, null);
		tween.start();
	}	

	
};

module.exports = Enemy;