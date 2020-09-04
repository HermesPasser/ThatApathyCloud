'use strict';

class TitleMenu {
    constructor() {
        this.padding = 10;
		this.menuX = 285; // exact value to center the three buttons including the margin of 10 
		this.menuY = 250;
        this._createNew();
        this._createOption();
        this._createExit();
    }

    _createNew() {
        this.newBtn = new SimpleSpritesheetButton(
			this.menuX, this.menuY, 47,24, BASIS.IMAGE,
			new Rect(200,250,47,24), 
			new Rect(200,275,47,24), 
			new Rect(200,300,47,24)
		);
		this.newBtn.setOnHoverEnter(() => {
			SOUND.SFX.SELECT.play();
		});
		this.newBtn.setOnClick(function(){
			SOUND.BGM.TITLE_MUSIC.stop();
			Machine.changeState(Machine.STATE.INTRO);
		});
    }

    _createOption() {
        this.optionBtn = new SimpleSpritesheetButton(
			this.newBtn.x + this.newBtn.width + this.padding, this.menuY, 73,24, BASIS.IMAGE,
			new Rect(250,250,73,24), 
			new Rect(250,275,73,24), 
			new Rect(250,300,73,24)
		);
		this.optionBtn.setOnHoverEnter( () => {
			SOUND.SFX.SELECT.play();
		});
    }

    _createExit() {
        this.exitBtn = new SimpleSpritesheetButton(
			this.optionBtn.x + this.optionBtn.width + this.padding, this.menuY, 42,24, BASIS.IMAGE,
			new Rect(200,325,42,24), 
			new Rect(250,325,42,24), 
			new Rect(300,325,42,24)
		);
		this.exitBtn.setOnHoverEnter( () => { SOUND.SFX.SELECT.play() });
		this.exitBtn.setOnClick( () => {
			// TODO: verifiy if this is true in nw.js
			// also check if the latest nw.js still supports App.quit()
			if (window['require']) // nw.js
				require('nw.gui').App.quit();
		});	
    }
    
    setOptionClicked(func) {
		this.optionBtn.setOnClick(func);
    }

    setActive(bool){
		this.newBtn.setActive(bool);
		this.optionBtn.setActive(bool);
        this.exitBtn.setActive(bool);
    }
    
    destroy() {
        this.newBtn.destroy();
        this.optionBtn.destroy();
        this.exitBtn.destroy();
    }
}
