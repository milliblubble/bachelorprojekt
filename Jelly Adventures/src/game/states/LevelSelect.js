var MenuButtons = require('../entities/MenuButtons.js');
var MenuArrow = require('../entities/MenuArrow.js');
var FadableState = require('./state_types/FadableState.js');

function LevelSelect() {}

module.exports = LevelSelect;

LevelSelect.prototype = {
	create: function() {
		this.buttonYOffsets = {
			1: - 40,
			2: 60,
			3: 160
		};

		this.buttonSettings = [
			{key: 'level_1_button', yOffset: -40, callback: this.startLevelOne},
			{key: 'level_2_button', yOffset: 60, callback: this.startLevelTwo},
			{key: 'back_button', yOffset: 160, callback: this.loadMenu}
		];

		

		this.buttons = new MenuButtons(this.buttonSettings);
		this.arrow = new MenuArrow('qualle', game.camera.width / 2 - 110, game.camera.height / 2 - 40, this.buttonYOffsets, [0, 1], this.buttons); //arrow hier ändern

		this.fadeIn();

	},

	update: function() {
		this.arrow.animate();
		this.arrow.move();

		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			this.buttons.buttons[this.arrow.arrow.currentButton - 1].callbackFunction.call(this);
		}
	},

	startLevel: function(level) {
		this.fadeOut(function() {
			game.state.start(level);
		});
	},

	startLevelOne: function() {
		this.startLevel("LevelOne");
	},

	startLevelTwo: function() {
		this.startLevel("LevelTwo");
	},

	loadMenu: function() {
		game.state.start("Menu");
	}
}

$.extend(LevelSelect.prototype, FadableState.prototype);