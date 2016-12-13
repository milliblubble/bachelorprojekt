/* 
 * bootState simply starts the physicsSystem and calls the load-state
 */

var bootState ={
    create: function(){
        
        //starts the pyhsicsSystem 
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 500;
        game.time.advancedTiming = true;
        
        //Calling the load state
        game.state.start('load'); 
        
    } 
}; 


