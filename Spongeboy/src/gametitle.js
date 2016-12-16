/* 
 * To change this license header, choose License Headers in Project Properties.
 * 
 */

var gameTitle = function(game){}; 

gameTitle.prototype = {
    create: function(){
      
     var gameTitle = this.game.add.image(0,0,"gametitle");
     gameTitle.scale.setTo(0.8,0.8);
   
     var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
     playButton.anchor.setTo(0,5);   //TODO: zentriert positionieren        
    }, 
    
    playTheGame: function(){
        this.game.state.start("Level01"); 
    }

}; 


