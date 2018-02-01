
// ta aparecendo a msg de mudar de mapa quando o tiro acerta o teleporte
// mesmo que eu tenha botado para aparecer so se a tag for player



// convem botar um "loading" entre as screens


// tests
new SimpleRectCollisor(1, 1, 500, 10).tag = "wall";
new SimpleRectCollisor(1, 12, 10, 475).tag = "wall";
new SimpleRectCollisor(490, 12, 10, 475).tag = "wall";
new SimpleRectCollisor(1, 490, 500, 10).tag = "wall";
new SimpleRectCollisor(300, 220, 50, 200).tag = "wall";

Ramu.init(500, 500);
// Ramu.debugMode = true;

new Machine();

// boundary tests
// SOUND.SHOT.volume = 0.1;
// SOUND.GAME.volume = 0.4;
// SOUND.CHANGE_OP.volume = 0.1;
// SOUND.DISAPPEAR.volume = 0.1;

//remove
var LOG_TEXT = "";
