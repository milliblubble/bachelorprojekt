var Healthpotion = function(x, y) {
	this.burger = this.burger = game.add.sprite(x,y, "burger");  
	this.healingPower = 10;

};

Healthpotion.prototype ={
	create: function(){
		this.burger.scale.setTo(1.5,1.5); 
		this.burger.inputEnabled = true; //TEST 
		this.burger.input.enableDrag(); //TEST

		this.heal(); 
	},

	heal:function(){
		if (player.health <100){
			this.player.health = this.player.health+10; 
			this.burger.kill(); 
		}


	}, 

	update:function(){

		game.physics.arcade.overlap(player,burger, heal, null, this); // VERLETZT SPIELER 
	}

}

module.exports = Flag;

Flag.prototype = Object.create(Phaser.Sprite.prototype);
// $.extend(Flag.prototype, Phaser.Sprite.prototype);
// why doesn't it work when I do extend?
 
			this.burger.scale.setTo(1.5,1.5); 
			this.burger.inputEnabled = true; //TEST 
			this.burger.input.enableDrag(); //TEST