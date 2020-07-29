'use strict';
class Flash extends Drawable{
	constructor(time, color = 'white'){
		super(0, 0, 1, 1, true);
		this.time = time;
		this.started = false;
		this.opacity = 0;
		this.color = color;
	}
	
	init(){
		this.opacity = 0;
		this.started = true;
		this.isFadeIn = true;
	}
	
	update(){
		if (this.drawPriority < Ramu.objsToDraw.length){
			this.drawPriority = Ramu.objsToDraw.length;
			Ramu.callSortDraw = true;
		}

		if (!this.started)
			return;
		
		this.isFadeIn ? this.fadeIn() : this.fadeOut();
	}
	
	fadeIn(){
		this.opacity += Ramu.time.delta;
		if (this.opacity >= this.time){
			this.opacity = 1;
			this.onFadeInEnd();
			this.isFadeIn = false;
		}
	}
	
	fadeOut(){
		this.opacity -= Ramu.time.delta;
		if (this.opacity <= 0){
			this.opacity = 0;
			this.onFadeOutEnd();
			this.started = false;
		}
	}
	
	draw(){
		Ramu.ctx.fillStyle = this.color;
		Ramu.ctx.fillRect(this.x, this.y, Ramu.width, Ramu.height);
		Ramu.ctx.strokeStyle = '#000000'; // reset to default value
	}
	
	onFadeInEnd(){ } // Virtual
	
	onFadeOutEnd(){ } // Virtual
}
