
// ta aparecendo a msg de mudar de mapa quando o tiro acerta o teleporte
// mesmo que eu tenha botado para aparecer so se a tag for player


// convem botar um "loading" entre as screens


// bondary tests
// new SimpleRectCollisor(1, 1, 500, 10).tag = "wall";
// new SimpleRectCollisor(1, 12, 10, 475).tag = "wall";
// new SimpleRectCollisor(490, 12, 10, 475).tag = "wall";
// new SimpleRectCollisor(1, 490, 500, 10).tag = "wall";
// new SimpleRectCollisor(300, 220, 50, 200).tag = "wall";

Ramu.init(500, 500); // (800, 600); // resolução final (já que ele provavelmente aguenta mapas maiores)

Ramu.debugMode = true;

// Options

var particleBloodNumber = 1000;
var disappearParticleNumber = 500;

// sound
// SOUND.SHOT.volume = 0.1;
// SOUND.GAME.volume = 0.4;
// SOUND.CHANGE_OP.volume = 0.1;
// SOUND.DISAPPEAR.volume = 0.1;

// END - Options

new Machine();


//remove
var LOG_TEXT = "";
