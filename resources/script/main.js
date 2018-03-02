
// ta aparecendo a msg de mudar de mapa quando o tiro acerta o teleporte
// mesmo que eu tenha botado para aparecer so se a tag for player


// convem botar um "loading" entre as screens


// bondary tests
// new SimpleRectCollisor(1, 1, 500, 10).tag = "wall";
// new SimpleRectCollisor(1, 12, 10, 475).tag = "wall";
// new SimpleRectCollisor(490, 12, 10, 475).tag = "wall";
// new SimpleRectCollisor(1, 490, 500, 10).tag = "wall";
// new SimpleRectCollisor(300, 220, 50, 200).tag = "wall";

Ramu.init(BASIS.SCREEN_WIDTH, BASIS.SCREEN_HEIGHT);

// Ramu.debugMode = true;


// não esquecer exit option

// jogando exception quando chama o destroy do player
// texto de game over não aparecendo, deve estar atras de algo, mas criar tela de
// game over

// Options

var particleBloodNumber = 1000;
var disappearParticleNumber = 500;
var shotParticleNumber = 300;

// sound
// SOUND.SHOT.volume = 0.1;
// SOUND.GAME.volume = 0.4;
// SOUND.CHANGE_OP.volume = 0.1;
// SOUND.DISAPPEAR.volume = 0.1;
//playSound(audio, constant_volume)

// END - Options

new Machine();

// var t = new LeftTurret(300, 250)

