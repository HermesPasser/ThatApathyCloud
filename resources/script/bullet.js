// adicionar condicao para decidir se da dano no inimigo ou no player
class Bullet extends GameObj{
	constructor(x, y, direction){
		super(x,y);	
		this.size = 7;
		this.tag = "shot";
		this.direction = direction;
				
		this.coll = new SimpleRectCollisor(x, y, this.size, this.size);
		this.sprite = new Spritesheet(BASIS.IMAGE, new Rect (50, 0, this.size, this.size), x, y, this.size, this.size);
		this.sprite.drawPriority = LAYER.SAME;
		Drawable.sortPriority();
		
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
