/* 
 *Creates the Phaser.Game Object  and maps it to the gameDiv.
 *Starts boot-state
 */

var game = new Phaser.Game(800,600, Phaser.AUTO, ''); 

/*
 * Adds each state with a casual anme that is used to call the state( i.e.
 * 'boot') and an official name that will be used  to define the state later. 
 * 
 */

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level01', level01State);
game.state.add('win', winState);

//After all state are added, the game is started by calling boot-state

game.state.start('boot'); 


