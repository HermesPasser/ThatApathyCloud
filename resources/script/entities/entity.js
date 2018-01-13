class Entity extends SpritesheetAnimator{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.mainCol = new SimpleRectCollisor(x, y, width, height);
		this.animDrawPriority = LAYER.SAME;
		this.life = 100;
	}

	applyDamage(damage){
		this.life -= 100;
		
		if (this.life <= 0)
			this.die();
	}
	
	die(){ } // virtual
	
	setX(x){
		super.setX(x);
		this.mainCol.x 	= x;
	}
	
	setY(y){
		super.setY(y);
		this.mainCol.y  = y;
	}	
	
	addX(x){
		super.addX(x);
		this.mainCol.x  += x;
	}
	
	addY(y){
		super.addY(y);
		this.mainCol.y  += y;
	}
	
	destroy(){
		this.mainCol.destroy();
		this.mainCol = null;
		super.destroy();
	}
}
