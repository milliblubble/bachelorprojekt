var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  //LADEN DER LOADBAR
  preload: function () {
    this.load.image('loading', 'assets/sprites/preloader/loading.png');
    this.load.image('load_progress_bar_dark', 'assets/sprites/preloader/progress_bar_bg.png');
    this.load.image('load_progress_bar', 'assets/sprites/preloader/progress_bar_fg.png');
    this.load.image('menuBG', 'assets/BG/gametitle.png');
    this.load.image('bikinibottom', 'assets/BG/BikiniBottom.png'); 
    
    
    
  },

  create: function () {
    game.stage.disableVisibilityChange = true; // So that game doesn't stop when window loses focus.
    game.input.maxPointers = 1;
    if (game.device.desktop) {
      game.stage.scale.pageAlignHorizontally = true;
    } else {
      game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      game.stage.scale.minWidth =  480;
      game.stage.scale.minHeight = 260;
      game.stage.scale.maxWidth = 640;
      game.stage.scale.maxHeight = 480;
      game.stage.scale.forceLandscape = true;
      game.stage.scale.pageAlignHorizontally = true;
      game.stage.scale.setScreenSize(true);
    }    

    game.state.start('Preloader');
  }
};
