'use strict';

class Option extends GameObj{
	constructor(x, y, text, value){
		super(x,y);
		if (arguments.length !== 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.value = value;
		this.rawText = text;
		this.objText = new Text(text + value, x, y, 150);
		this.objText.fillStyle = 'white';
		// this.objText.font = "14px sans-serif"
		this.addMinusButton();
		this.addPlusButton();
	}

	addMinusButton(){
		this.btnMinus = new SimpleSpritesheetButton(
			this.x + 90, this.y - 8, 9, 9, BASIS.IMAGE,
			new Rect(332, 250, 9, 9),
			new Rect(332, 259, 9, 9),
			new Rect(332, 268, 9, 9)
		);
		this.btnMinus.opt = this;
		this.btnMinus.setOnHoverEnter(function(){
			this.opt.objText.fillStyle = 'gray';
		});
		this.btnMinus.setOnHoverExit(function(){
			this.opt.objText.fillStyle = 'white';
		});
		this.btnMinus.setOnClick(function(){
			this.opt.value -= 10;
			if (this.opt.value < 0)
				this.opt.value = 0;
			
			SOUND.SFX.SELECT.play();
			this.opt.objText.text = this.opt.rawText + this.opt.value;
			this.opt.onValueChange();
		});
	}
	
	addPlusButton(){
		this.btnPlus = new SimpleSpritesheetButton(
			this.x + 100, this.y - 8, 9, 9, BASIS.IMAGE,
			new Rect(324, 250, 9, 9), 
			new Rect(324, 259, 9, 9), 
			new Rect(324, 268, 9, 9)
		);
		this.btnPlus.opt = this;
		this.btnPlus.setOnHoverEnter(function(){
			this.opt.objText.fillStyle = 'gray';
		});
		this.btnPlus.setOnHoverExit(function(){
			this.opt.objText.fillStyle = 'white';
		});
		this.btnPlus.setOnClick(function(){
			this.opt.value += 10;
			if (this.opt.value > 100)
				this.opt.value = 100;
			
			SOUND.SFX.SELECT.play();
			this.opt.objText.text = this.opt.rawText + this.opt.value;
			this.opt.onValueChange();
		});
	}
	
	onValueChange(){ } // Virtual
	
	setActive(bool){
		super.setActive(bool);
		this.objText.setActive(bool);
		this.btnMinus.setActive(bool);
		this.btnPlus.setActive(bool);
	}
	
	destroy(){
		super.destroy();
		this.objText.destroy();
		this.btnMinus.destroy();
		this.btnPlus.destroy();
	}
}
