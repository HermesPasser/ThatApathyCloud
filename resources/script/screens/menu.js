'use strict';

class TitleScreen extends Screen{
	constructor(){
		super();
		this.titleimg = new Sprite(SCREEN_IMAGE.TITLE_SCREEN,0,0, BASIS.SCREEN_WIDTH, BASIS.SCREEN_HEIGHT);
		// verificar se quando sair do menu e voltar isso volta a tocar, se não acontecer então da para fazer isso dando um "this.titleMusic.stop()" no setActive e um "if(!this.titleMusic.audio.paused) this.titleMusic.play()" no update. Mas se ele voltar normal então voltará de onde a musica estava, não convém voltar do inicio no lugar? Só usar a mesma solução dada acima.
		SOUND.BGM.TITLE_MUSIC.play();
		SOUND.BGM.TITLE_MUSIC.audio.loop = true;
		
		this.createMainMenuButtons();
		this.createOptionButtons();
		this.setActiveOptionsButtons(false);
	}
	
	
	update(){
		if (!SOUND.BGM.TITLE_MUSIC.isPlaying) // just in case of DOM block the audio
			SOUND.BGM.TITLE_MUSIC.play();
	}
	
	createMainMenuButtons(){
		let padding = 10;
		let menuX = 285; // exact value to center the three buttons including the margin of 10 
		let menuY = 250;
				
		this.newBtn = new SimpleSpritesheetButton(
			menuX, menuY, 47,24, BASIS.IMAGE,
			new Rect(200,250,47,24), 
			new Rect(200,275,47,24), 
			new Rect(200,300,47,24)
		);
		this.newBtn.screen = this;
		this.newBtn.setOnHoverEnter(function(){
			SOUND.SFX.SELECT.play();
		});
		this.newBtn.setOnClick(function(){
			// Machine.changeState(Machine.STATE.INTRO);
			console.warn('intro ta funcionando?')
			SOUND.BGM.TITLE_MUSIC.stop();
			Machine.changeState(Machine.STATE.END);
		});

		this.optionBtn = new SimpleSpritesheetButton(
			this.newBtn.x + this.newBtn.width + padding, menuY, 73,24, BASIS.IMAGE,
			new Rect(250,250,73,24), 
			new Rect(250,275,73,24), 
			new Rect(250,300,73,24)
		);
		this.optionBtn.screen = this;
		this.optionBtn.setOnHoverEnter(function(){
			SOUND.SFX.SELECT.play();
		});
		this.optionBtn.setOnClick(function(){
			this.screen.setActiveMainMenuButtons(false);
			this.screen.setActiveOptionsButtons(true);
		});

		this.exitBtn = new SimpleSpritesheetButton(
			this.optionBtn.x + this.optionBtn.width + padding, menuY, 42,24, BASIS.IMAGE,
			new Rect(200,325,42,24), 
			new Rect(250,325,42,24), 
			new Rect(300,325,42,24)
		);
		this.exitBtn.screen = this;
		this.exitBtn.setOnHoverEnter( () => { SOUND.SFX.SELECT.play() });

		this.exitBtn.setOnClick(function(){
			// TODO: verifiy if this is true in nw.js
			// also check if the latest nw.js still supports App.quit()
			if (window['require']) // nw.js
				require('nw.gui').App.quit();
		});	
	}
	
	createOptionButtons(){
		const x = 298;  // exact value to center the three buttons including the margin of 10 
		const y = 250;
		
		this.BGMOption = new Option(x, y, 'BGM Sound ', SOUND.VOLUME.BGM);
		this.BGMOption.onValueChange = function(){
			SOUND.VOLUME.BGM = this.value; // this is refering to Option obj, not to TitleScreen. 
			updateSoundVolume();
		};
			
		this.SFXOption = new Option(x, y + 10, 'SFX Sound  ', SOUND.VOLUME.SFX);
		this.SFXOption.onValueChange = function(){
			SOUND.VOLUME.SFX = this.value;
			updateSoundVolume();
		};
		
		this.backBtn = new SimpleSpritesheetButton(
			(Ramu.width / 2) - (36 / 2), y + 20, 36,19, BASIS.IMAGE,
			new Rect(200,350,36,19), 
			new Rect(200,369,36,19), 
			new Rect(250,350,36,19)
		);
		this.backBtn.screen = this;
		this.backBtn.setOnHoverEnter(function(){
			SOUND.SFX.SELECT.play();
		});
		this.backBtn.setOnClick(function(){
			this.screen.setActiveOptionsButtons(false);
			this.screen.setActiveMainMenuButtons(true);
		});
	}
	
	setActiveMainMenuButtons(bool){
		this.newBtn.setActive(bool)
		this.optionBtn.setActive(bool)
		this.exitBtn.setActive(bool)
	}
	
	setActiveOptionsButtons(bool){
		this.BGMOption.setActive(bool);
		this.SFXOption.setActive(bool);
		this.backBtn.setActive(bool);
	}
	
	setActive(bool){
		super.setActive(bool);
		this.titleimg.setActive(bool);
		this.setActiveMainMenuButtons(bool); // not calling setActiveOptionsButtons too because this need to be hide util the option button is pressed.
		SOUND.SFX.SELECT.setActive(bool); // to not play when change the scene.
	}
	
	destroy(){
		super.destroy();
		this.titleimg.destroy();
		
		this.newBtn.destroy();
		this.optionBtn.destroy();
		this.exitBtn.destroy();
		
		this.newBtn.destroy()
		this.optionBtn.destroy()
		this.exitBtn.destroy()
		this.backBtn.destroy();
	}
}
			