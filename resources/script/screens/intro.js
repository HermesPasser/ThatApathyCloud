class IntroScreen extends Screen{
	constructor(isIntro = true){
		super(0,0);
		
		let intro = 'A humanidade conquistou o espaço diminuiu consideravelmente a miscigenação entre os povos, dentre esses povos, os habitantes de K’uh adaptaram-se consideravelmente ao ambiente hostil tornando-se quase uma especial a parte ao olhar de um desapercebido.  Os K’uh, sendo uma pequena colônia no fim da galáxia, nunca precisaram se preocupar com tais olhares. Isto é, até decidirem declarar independência.';
		let credits = 'Programming \nDouglas Silva "Hermes Passer" Lacerda \n\nGraphics \nDouglas Silva "Hermes Passer" Lacerda \n\nSound \nDouglas Silva "Hermes Passer" Lacerda \n\n Dubbing \nThomas Daniel \n\nMusic \n...\n \n A Hermes Passer game.\n gladiocitrico.blogspot.com \n hermespasser.github.io \n source code at \n github.com/HermesPasser/ThatApathyCloud'
		
		this.text = isIntro ? intro : credits;
		this.duration = isIntro ? 200 : 600;
		this.isIntro = isIntro;
		this.isOver = false;
		this.canInit = false;

		let posX = this.isIntro ? 1 : Ramu.canvas.width / 2 - 40;
		this.txt = new Text(this.text, posX, Ramu.canvas.height, 500);
		this.txt.fillStyle = "white";
		this.txt.canDraw = false;
		if (this.isIntro)
			SOUND.BGM.GAME_MUSIC.play();
	}
	
	init(){
		this.txt.y = Ramu.canvas.height;
		this.txt.canDraw = true;
		this.isOver = false;
		this.canInit = true;
	}
	
	update(){
		if (!this.canInit)
			return;
		
		if (this.txt.y < -this.duration){
			if (this.isIntro)
				Machine.changeState(Machine.STATE.GAME);
			this.isOver = true;
			return;
		}
		
		this.txt.y -= 30 * Ramu.time.delta;
	}
	
	setActive(bool){
		super.setActive(bool);
		this.txt.setActive(bool);
	}
	
	destroy(){
		super.destroy();
		this.txt.destroy();
	}
}
