class IntroScreen extends Screen{
	start(){		
		// alterar o txt
		this.text = 'A humanidade conquistou o espaço diminuiu consideravelmente a miscigenação entre os povos, dentre esses povos, os habitantes de K’uh adaptaram-se consideravelmente ao ambiente hostil tornando-se quase uma especial a parte ao olhar de um desapercebido.  Os K’uh, sendo uma pequena colônia no fim da galáxia, nunca precisaram se preocupar com tais olhares. Isto é, até decidirem declarar independência.';
		
		this.txt = new Text(this.text, 1, Ramu.canvas.height, 500);
		this.txt.fillStyle = "white";	
		
		SOUND.GAME.play();
	}
	
	update(){
		if (this.txt.y < -100){
			// mostrar logo aqui
			
			// dar fade out no logo
			
			// tocar a musica em game
			
			// change state
			Machine.changeState(Machine.STATE.GAME);
			return;
		}
		
		this.txt.y -= 45 * Ramu.time.delta;
	}
	
	destroy(){
		this.txt.destroy();
		delete this.txt;
		super.destroy();
	}
}
