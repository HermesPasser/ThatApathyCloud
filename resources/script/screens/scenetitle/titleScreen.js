'use strict';

class SceneTitle extends Screen {
	constructor(){
		super();
		this.background = new Sprite(SCREEN_IMAGE.TITLE_SCREEN,0,0, BASIS.SCREEN_WIDTH, BASIS.SCREEN_HEIGHT);
		// verificar se quando sair do menu e voltar isso volta a tocar, se não acontecer então da para fazer isso dando um "this.titleMusic.stop()" no setActive e um "if(!this.titleMusic.audio.paused) this.titleMusic.play()" no update. Mas se ele voltar normal então voltará de onde a musica estava, não convém voltar do inicio no lugar? Só usar a mesma solução dada acima.
		SOUND.BGM.TITLE_MUSIC.play();
		SOUND.BGM.TITLE_MUSIC.audio.loop = true;
		
		this.createMainMenuButtons();
		this.createOptionButtons();
		this.setActiveOptionsButtons(false);
	}
	
	updateScene(){
		if (!SOUND.BGM.TITLE_MUSIC.isPlaying) // just in case of DOM block the audio
			SOUND.BGM.TITLE_MUSIC.play();
	}
	
	input(){
		if (keyCode.w in Ramu.pressedKeys) {
			console.log("w")
			Machine.changeState(Machine.STATE.SPLASH)
		}
	}

	createMainMenuButtons(){
		this.mainMenu = new TitleMenu();
		this.mainMenu.setOptionClicked( () => {
			this.mainMenu.setActive(false);
			this.setActiveOptionsButtons(true);
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
			this.screen.mainMenu.setActive(true);
		});
	}

	setActiveOptionsButtons(bool){
		this.BGMOption.setActive(bool);
		this.SFXOption.setActive(bool);
		this.backBtn.setActive(bool);
	}
	
	setActive(bool){
		// not deactiving the options since will manually through the other methods
		super.setActive(bool);
		this.mainMenu.setActive(bool);
		this.background.setActive(bool);
		SOUND.SFX.SELECT.setActive(bool); // to not play when change the scene.
	}
	
	destroy(){
		this.background.destroy();
		this.mainMenu.destroy();
		this.backBtn.destroy();
		this.BGMOption.destroy();
		this.SFXOption.destroy();
		
		super.destroy();
	}
}
