//------------------------------|
// Layer	Priority			|
//------------------------------|
// 0		Below the character |
// 1		Same as character   |
// 2		Above the character |
//------------------------------|

const DIRECTION = {TOP: 0, LEFT: 1, RIGHT: 2, BOTTOM: 3};
const LAYER = {BELOW: 0, SAME: 1, ABOVE: 2};

// adicionar condicao para decidir se da dano no inimigo ou no player
class Bullet extends GameObj{
	constructor(x, y, direction){
		super(x,y);	
		this.size = 7;
		this.tag = "shot";
		this.direction = direction;
				
		this.coll = new SimpleRectCollisor(x, y, this.size, this.size);
		this.sprite = new Spritesheet(BASIS.IMAGE, new Rect (50, 0, this.size, this.size), x, y, this.size, this.size);
		
		this.coll.tag = "shot";
	}
	
	start(){
		super.start();
		SOUND.SHOT.play();
	}
	
	destroy(){
		this.sprite.destroy();
		this.coll.destroy();
		super.destroy();
	}
	
	update(){
		var force = 120 * Ramu.time.delta;
		var fx = 0, fy = 0;
		
		switch (this.direction){
			case DIRECTION.TOP:    fy = -force; break;
			case DIRECTION.LEFT:   fx = -force; break;
			case DIRECTION.RIGHT:  fx = force;  break;
			case DIRECTION.BOTTOM: fy = force;
		}
		
		// Move
		this.x += fx;
		this.y += fy;
		this.sprite.x += fx;
		this.sprite.y += fy;
		this.coll.x += fx;
		this.coll.y += fy; 

		// Kill the enemy if collide
		for (var i = 0; i < this.coll.collision.length; i++){
			if (this.coll.collision[i].tag == "enemy"){
				this.coll.collision[i].applyDamage(10);
				this.destroy();					
			}
		}
		
		// Destroy if is out of the canvas
		if (this.x < -this.size || this.x > Ramu.canvas.width ||
			this.y < -this.size || this.y > Ramu.canvas.height)
				this.destroy();
	}
}

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
