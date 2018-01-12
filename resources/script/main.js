// aparentemente os colliders do tileset nao estao funcionando,

// GameScreen.player = new Player(200,200);

new Machine();

// ta aparecendo a msg de mudar de mapa quando o tiro acerta o teleporte
// mesmo que eu tenha botado para aparecer so se a tag for player



Ramu.init(500, 500);
// Ramu.debugMode = true;

if (Machine.CURRENT_STATE == Machine.STATE.GAME){
	// ao inves disso criar classe que mostra texto e o texto some depois
	var LOG_TEXT = "";
	var LOG = new Drawable(0,0,0,0);
	LOG.drawPriority = 100;
	LOG.draw = function(){
		// Ramu.ctx.fillStyle = "red";
		// Ramu.ctx.font = "30px Arial";
		// Ramu.ctx.fillText(LOG_TEXT, 0, 50);
		// LOG_TEXT = "";
	}
}