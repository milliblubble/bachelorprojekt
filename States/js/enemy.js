/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// GRUPPENVARIABLE
    var quallen;

    
    createQuallen: function ()
{

    quallen = game.add.group();
    quallen.enableBody =true; //apply Physics
    quallen.physicsBodyType = Phaser.Physics.ARCADE; 
    game.physics.enable(quallen, Phaser.Physics.ARCADE); 
    quallen.inputEnabled = true; 

    //  Die Gruppe für Quallen wird erstellt
    quallen = game.add.group();
    // Quallen erhalten einen Körper
    quallen.enableBody = true;
    quallen.enableBodyDebug = true;
    //  Alle Objecte im Object Layer mit der gid=1 erhalten den spritesheet qualle und werden der gruppe zugeordnet 
    map.createFromObjects('Object Layer', 1, 'qualle', 0, true, false, quallen);
     
    // ANNIMATION DER QUALEN
    quallen.callAll('animations.add', 'animations', 'wackeln', [0, 1, 2, 3], 3, true);
    quallen.callAll('animations.play', 'animations', 'wackeln');
}, 

