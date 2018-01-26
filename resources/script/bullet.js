class Bullet extends GameObj{
	constructor(x, y, direction, damage = 100, damageTag){		
		super(x,y);	
		this.size = 7;
		this.tag = "shot";
		this.direction = direction;
		this.damage = damage;
				
		this.coll = new SimpleRectCollisor(x, y, this.size, this.size);
		this.coll.damageTag = damageTag;
		this.coll.onCollision = function(){			
			
			// Add damage
			for (var i = 0; i < this.collision.length; i++){
				if (this.collision[i].tag === this.damageTag){
					this.collision[i].applyDamage(this.damage);
					this.destroy();	// Destroy the Bullet			
				}
			}
		}
				
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

	
		// Destroy if is out of the canvas
		if (this.x < -this.size || this.x > Ramu.canvas.width ||
			this.y < -this.size || this.y > Ramu.canvas.height)
				this.destroy();
	}
}
