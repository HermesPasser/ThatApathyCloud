'use strict';
// ---------------------------------- //
// Ramu 0.6 - Hermes Passer in 09/21  //
//      hermespasser.github.io        //
// blog: gladiocitrico.blogspot.com   //
// ---------------------------------- //

var gameObjs	   = [],
    objsToDraw 	   = [],
    objsToCollide  = [],
	updateLastPriority 	  = 0,
    drawLastPriority	  = 0,
	collisionLastPriority = 0;	
	
//{ Utils

const keyCode = {
	a:    65, b:    66, c:    67, d:    68, e:    69, f:    70, g:    71, h:    72, i:    73, j:    74, 
	k:    75, l:    76, m:    77, n:    78, o:    79, p:    80, q:	  81, r:    82, s:    83, t:    84,
	u:    85, v:    86, w:    87, x:    88, y:    89, z:    90, 
	num0: 48, num1: 49, num2: 50, num3: 51, num4: 52, num5: 53, num6: 54, num7: 55, num8: 56, num9: 57, 
	
	numpad0: 96,  numpad1: 97,  numpad2: 98,  numpad3: 99,  numpad4: 100, numpad5: 101, numpad6: 102, numpad7: 103, 
	numpad8: 104, numpad9: 105,

	space: 32,
	
	f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123,
	
	left_arrow: 37, up_arrow: 38, right_arrow: 39, down_arrow: 40, backspace: 8, tab: 9, enter: 13, shift: 16, 
	
	capslock: 20, numlock: 144, scrolllock: 145, left_window_key: 91, right_window_key: 92, 
	
	open_bracket: 219, close_braket: 221, ctrl: 17, alt: 18, end: 35, home: 36, insert: 45, delete: 46, select: 93, pause_break: 19, 
	
	escape: 27, page_up: 33, page_down: 34, multiply: 106, add: 107, subtract: 109, decimal_point: 110, divide: 111, semi_colon: 186, 

	equal_sign: 187, comma: 188, dash: 189, period: 190, forward_slash: 191, back_slash: 220, grave_accent: 192, single_quote: 222
};

class Rect{	
	constructor(x, y, w, h){
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
}

class RamuMath{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	static overlap(rect1, rect2) {
		return(rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.height + rect1.y > rect2.y);
	}
}

class RamuUtils{
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Get a image with source
	static getImage(src){
		let img = new Image();
		img.src = src;
		return img;
	}
	
	/// Check if image is loaded
	static imageIsLoaded(img){
		if (!(img instanceof Image)) return false;
		return img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
	}
	
	static CustomTypeError(instance, classToCompare){
		return new Error("TypeError: " + Object.keys({instance})[0] + ' must be a ' + classToCompare.name + ' instance.');
	}

}
//}

//{ Engine

class Ramu{
	/// Prevents creating an instance of this class.
	constructor(){
		throw new Error('This is a static class');
	}
	
	/// Init the Ramu and the main loop.
	static init(width = 500, height = 500){
		if (!document.body)
			throw new Error('No body tag found.');
		
		Ramu.canvas = document.createElement("canvas");
		Ramu.canvas.width  = width
		Ramu.canvas.height = height
		Ramu.ctx = Ramu.canvas.getContext("2d");
		document.body.appendChild(Ramu.canvas);
		
		Ramu.debugMode = false;
		Ramu.inLoop = true;
		
		// Deltatime is actually a timestep and frametime is originally the delta time,
		// change of terms exists for timestep be used instead of delta (frametimne)
		Ramu.time = { last: Date.now(), delta: 1/60, frameTime: 0 };
		
		Ramu.input();
		Ramu.start();
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Start all input events listeners
	static input(){
		Ramu.pressedKeys	 = {}; // The key continues on this list until the key up.
		Ramu.lastKeysPressed = {}; // The key continues on this list until the end of frame.
		
		document.body.addEventListener("keydown", function(e){	
			Ramu.pressedKeys[e.keyCode] = e.keyCode;
			Ramu.lastKeysPressed[e.keyCode] = e.keyCode;
		}, false);
		
		document.body.addEventListener("keyup", function(e){
			delete Ramu.pressedKeys[e.keyCode];
		}, false);
		
		// Ramu.canvas.addEventListener('click',      function(e){},  false);
		// Ramu.canvas.addEventListener('mousemove'   function(e){},  false);
		// Ramu.canvas.addEventListener('touchstart', function(e){},  false);
		// Ramu.canvas.addEventListener('touchmove',  function(e){},  false);
	}

	/// Game loop of Ramu.
	static loop(){
		
		let now = 0;
		if (Ramu.inLoop){
			now = Date.now();
			Ramu.time.frameTime = Ramu.time.frameTime + Math.min(1, (now - Ramu.time.last) / 1000);
		
			while(Ramu.time.frameTime > Ramu.time.delta) {
				Ramu.start();
				Ramu.checkCollision();
				Ramu.update();
				Ramu.time.frameTime = Ramu.time.frameTime - Ramu.time.delta;
				
				// Panic | from isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
				let numUpdateSteps = 0;
				if (++numUpdateSteps >= 240) {
					Ramu.time.frameTime = 0;
					console.warn("Panic.")
					break;
				}
			}
		}
		
		Ramu.draw();
		Ramu.lastKeysPressed = {};
		
		if (Ramu.inLoop) Ramu.time.last = now;
		window.requestAnimationFrame(Ramu.loop);
	}
	
	/// Executes all start methods of all gameObjs in the game.
	static start(){
		for (var i = 0; i < gameObjs.length; i++){
			
			// If this was defined then start already was called, so skip it
			if (gameObjs[i]._start_was_called)
				continue;
			
			// Even if this attribute receives false, the start is not called again
			// because of this attribute is alreay defined
			gameObjs[i]._start_was_called = true;
			gameObjs[i].start();
		}
	}
	
	/// Update all gameObjs in the game.
	static update(){
		for (var i = 0; i < gameObjs.length; i++)
			gameObjs[i].update();	
	}
	
	/// Check all collisions in the game.
	static checkCollision(){
		for (var i = 0; i < objsToCollide.length; i++)
			objsToCollide[i].checkCollision();
	}
	
	/// Executes all draw methods of all gameObjs in the game.
	static draw(){
		Ramu.ctx.imageSmoothingEnabled = true; // reset the defaut value
		Ramu.ctx.clearRect(0, 0, Ramu.canvas.width, Ramu.canvas.height);
		
		for (var i = 0; i < objsToDraw.length; i++){
			let positionWidth = objsToDraw[i].x + objsToDraw[i].width;		
			let positionHeigh = objsToDraw[i].y + objsToDraw[i].height;
			
			let isOutOfCanvas = positionWidth >= 0 && objsToDraw[i].x <= Ramu.canvas.width &&
								positionHeigh >= 0 && objsToDraw[i].y <= Ramu.canvas.height // Renderiza somente o que esta no Ramu.canvas
			
			if (objsToDraw[i].drawOutOfCanvas || isOutOfCanvas)
				objsToDraw[i].drawInCanvas();
		}
	}
}

class GameObj{	
	constructor(x = 0, y = 0, w = 0, h = 0){
		if (arguments.length > 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.tag =  this.tag || "none";
		this.updatePriority = updateLastPriority++;
		
		GameObj.addObjt(this);
	}
	static addObjt(obj){
		gameObjs.push(obj);
		GameObj.sortPriority();
	}
	
	static sortPriority(){
		for (let i = 0; i < gameObjs.length; ++i){
			for (let j = i + 1; j < gameObjs.length; ++j){
				if (gameObjs[i].updatePriority > gameObjs[j].updatePriority){
					let temp 	=  gameObjs[i];
					gameObjs[i] = gameObjs[j];
					gameObjs[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		for (let i = 0; i < gameObjs.length; i++){
			if (gameObjs[i] === this){
				gameObjs.splice(i, 1);
				break;
			}
		}
	}
	
	/// Virtual start to be inherited.
	start() { }
	
	/// Virtual update to be inherited.
	update() { }
}

class Drawable extends GameObj{
	constructor(x, y, width, height, canDraw = false){
		super();
		if (arguments.length < 4) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canDraw = canDraw;
		this.drawPriority     = drawLastPriority++;
		this.flipHorizontally = false;
		this.flipVertically   = false;
		this.drawOutOfCanvas  = false;
		this.opacity = 1;
		Drawable.addObjt(this)
	}
	
	static addObjt(drawableObj){
		objsToDraw.push(drawableObj);
		Drawable.sortPriority();
	}
	
	static sortPriority(){
		for (let i = 0; i < objsToDraw.length; ++i){
			for (let j = i + 1; j < objsToDraw.length; ++j){
				if (objsToDraw[i].drawPriority > objsToDraw[j].drawPriority){
					let temp =  objsToDraw[i];
					objsToDraw[i] = objsToDraw[j];
					objsToDraw[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		super.destroy();
		for (let i = 0; i < objsToDraw.length; i++){
			if (objsToDraw[i] === this){
				objsToDraw.splice(i, 1);
				break;
			}
		}
	}
	
	drawInCanvas(){		
		if (this.canDraw){

			Ramu.ctx.globalAlpha = this.opacity;
		
			// To flip anything that is drawn (the position need be recalculated in draw() method).
			if (this.flipHorizontally || this.flipVertically){
				Ramu.ctx.save();
				Ramu.ctx.scale(this.flipHorizontally ? -1 : 1, this.flipVertically ? -1 : 1);
			}
			
			this.draw();
			
			if (this.flipHorizontally || this.flipVertically)
				Ramu.ctx.restore();
		}
	}
	
	/// Virtual draw to be inherited.
	draw(){ }
}

//}

//{ Collisor

class Collisor extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.canCollide = true;
		this.collision = [];
		this.collisionPriority = collisionLastPriority++;

		Collisor.addObjt(this);
	}
	
	static addObjt(colObj){
		objsToCollide.push(colObj);
		Collisor.sortPriority();
	}
	
	static sortPriority(){
		for (let i = 0; i < objsToCollide.length; ++i){
			for (let j = i + 1; j < objsToCollide.length; ++j){
				if (objsToCollide[i].collisionPriority > objsToCollide[j].collisionPriority){
					let temp =  objsToCollide[i];
					objsToCollide[i] = objsToCollide[j];
					objsToCollide[j] = temp;
				}
			}
		}
	}
	
	destroy(){
		for (let i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this){
				objsToCollide.splice(i, 1);
				break;
			}
		}
		super.destroy();
	}
	
	update(){
		this.canDraw = Ramu.debugMode;
	}
	
	get isInCollision(){ 
		return this.collision.length != 0; 
	}
	
	/// Virtual onCollision to be inherited.
	onCollision(){ }

	checkCollision(){
		if(!this.canCollide) return;
		
		this.collision = [];
		for (let i = 0; i < objsToCollide.length; i++){
			if (objsToCollide[i] === this || !objsToCollide[i].canCollide)
				continue;
			
			let rect1 = new Rect(this.x, this.y, this.width, this.height);
			let rect2 = new Rect(objsToCollide[i].x, objsToCollide[i].y, objsToCollide[i].width, objsToCollide[i].height);
			
			if (RamuMath.overlap(rect1, rect2)){
				objsToCollide[i].collision.push(this);
				this.collision.push(objsToCollide[i]);
				this.onCollision();
			}
		}
	}
}

class SimpleRectCollisor extends Collisor{	
	draw(){
		if (Ramu.debugMode){
			
			if (this.canCollide)
				if (this.isInCollision)
					Ramu.ctx.strokeStyle = "red";
				else Ramu.ctx.strokeStyle = "blue";	
			else Ramu.ctx.strokeStyle = "green";

			Ramu.ctx.strokeRect(this.x, this.y, this.width, this.height);
			Ramu.ctx.strokeStyle = "#000000"; // reset to default value
		}
	}
}

class Raycast extends Collisor{
	constructor(){
		super(1, 1, 1, 1);
		this.started  = false;
		this.abord();
	}

	onRaycastEnd(){} // Virtual
	
	init(initX, initY, velocityX, velocityY, lifeTime){
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');

		this.x = initX;
		this.y = initY;
		this.initX = initX;
		this.initY = initY;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.lifeTime = lifeTime;
		this.currentTime = 0;
		this.started = true;
	}
	
	abord(){
		this.currentTime = 0;
		this.started = false;
	}
	
	update(){
		if (this.started && this.currentTime >= this.lifeTime){			
			this.onRaycastEnd();
			this.abord();
		}
	
		if (!this.started || this.currentTime >= this.lifeTime)
			return;
		
		if (this.started){			
			super.update();
					
			this.currentTime += Ramu.time.delta;
			this.x += this.velocityX * Ramu.time.delta;
			this.y += this.velocityY * Ramu.time.delta;
		}
	}
	
	draw(){
		if (this.canCollide)
			if (this.isInCollision)
				Ramu.ctx.strokeStyle = "red";
			else Ramu.ctx.strokeStyle = "blue";	
		else Ramu.ctx.strokeStyle = "green";
			
		Ramu.ctx.beginPath();
		Ramu.ctx.moveTo(this.x, this.y);
		Ramu.ctx.lineTo(this.initX, this.initY);
		Ramu.ctx.stroke();

		Ramu.ctx.strokeStyle = "#000000"; // reset to default value
	}
}

//}

//{ Sprite

/// Displays an entire image
class Sprite extends Drawable{
	constructor(img, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw RamuUtils.CustomTypeError(img, Image);

		this.img = img;
		this.canDraw = canDraw;	
	}
	
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (!RamuUtils.imageIsLoaded(this.img)){
			Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}
		
		//if (this.canDraw)
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.img, originX, originY, this.width, this.height);
	}
}

/// Displays an region (sprite sheet) of a image
class Spritesheet extends Drawable{
	constructor(image, sheetRect, x, y, w, h, canDraw = true){
		super(x, y, w, h);
		if (arguments.length < 6) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(image instanceof Image)) throw RamuUtils.CustomTypeError(image, Image);

		this.img = image;
		this.setSheet(sheetRect);
		this.canDraw = canDraw;	
	}
	
	setSheet(sheetRect){
		if (!(sheetRect instanceof Rect)) throw RamuUtils.CustomTypeError(sheetRect, Rect);

		this.sheet = sheetRect;
	}
	
	setPosition(x, y){
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}
	
	draw(){					
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		// does not work
		let originY = this.flipVertically   ? -this.height - this.y : this.y;

		if (!RamuUtils.imageIsLoaded(this.img)){
			Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
			return;
		}
		
		Ramu.ctx.imageSmoothingEnabled = false;
		Ramu.ctx.drawImage(this.img, this.sheet.x, this.sheet.y, this.sheet.width, this.sheet.height, 
					originX, originY, this.width, this.height);
	}
}

/// Displays an animation that uses various images
class SpriteAnimation extends Drawable{
	constructor(x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		this.frames 		 = [];
		this.currentFrame 	 = 0;
		this.currentTime 	 = 0;
		this.animationTime 	 = 2;
		this.animationPause  = false;
		this.animationIsOver = false;
		this.playInLoop 	 = true;
	}
	
	addFrame(img){ 
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw RamuUtils.CustomTypeError(img, Image);
		
		this.frames.push(img);
	}
	
	reset(){
		this.animationIsOver = false;
		this.currentFrame = 0;
		this.currentTime  = 0;
	}
	
	update(){
		if (this.animationPause) return;
		if (this.currentFrame == this.frames.length - 1){
			this.animationIsOver = true;
			if (!this.playInLoop) return;
			
		} else this.animationIsOver = false;
		
		this.currentTime += Ramu.time.delta;
		if (this.frames.length > 0 && this.currentTime > this.animationTime){ 
			this.currentFrame = (this.currentFrame + 1) % this.frames.length;
			this.currentTime = 0;
		} 
	}
		
	draw(){
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		
		if (this.frames.length > 0){
			if (!RamuUtils.imageIsLoaded(this.frames[this.currentFrame])){
				Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}
			
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.frames[this.currentFrame], originX, originY, this.width, this.height);
		}
	}
}

// se eu colocar para ele se mexer em x ou y com algum valor que nao seja inteiro
// e ele tiver setado para girar o sprite em vertical ou horizontal
// ele desenha parte fora do sprite
// isso acontece mesmo se a animação tiver um frame
/// Displays an animation that uses various sprite sheets of a single image
class SpritesheetAnimation extends SpriteAnimation{
	constructor(img, x, y, width, height){
		super(x, y, width, height);
		if (arguments.length != 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw RamuUtils.CustomTypeError(img, Image);

		this.img = img;
	}
	
	addFrame(rect){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(rect instanceof Rect)) throw RamuUtils.CustomTypeError(rect, Rect);
		if (rect.x < 0 || rect.y < 0) throw new Error('ArgumentOutOfRangeError: The rect position cannot be negative.');

		this.frames.push(rect);
	}
	
	draw(){
		// o problema deve estar aqui
		let originX = this.flipHorizontally ? -this.width - this.x : this.x;
		let originY = this.flipVertically   ? -this.height - this.y : this.y;
		let rect    = this.frames[this.currentFrame];
		
		if (RamuUtils.imageIsLoaded(this.img) && (rect.width > this.img.width || rect.height > this.img.height))
			throw new Error('The rect size cannot be greater than the image size.');

		//Draw
		if (this.frames.length > 0){
			if (!RamuUtils.imageIsLoaded(this.img)){
				Ramu.ctx.fillRect(originX, originY, this.width, this.height); // Draw a black rect instead of image
				return;
			}	
			
			Ramu.ctx.imageSmoothingEnabled = false;
			Ramu.ctx.drawImage(this.img, 
								rect.x, 
								rect.y, 
								rect.width, 
								rect.height, 
								originX, 
								originY, 
								this.width, 
								this.height);	
		}
	}
}

/// Control SpritesheetAnimations
class SpritesheetAnimator extends GameObj{
	constructor(x, y, width, height){
		super(x,y,width,height);
		if (arguments.length != 4) throw new Error('ArgumentError: Wrong number of arguments');
		
		this.anim = {};
		this.animDrawPriority = drawLastPriority++;
		this.currentID = "";
	}
	
	setCanDraw(bool){
		if (!(typeof(bool) == "boolean")) throw RamuUtils.CustomTypeError(bool, Boolean);
	
		this.anim[this.currentID].canDraw = bool;
	}
	
	setDrawPriority(integer){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');

		for (var key in this.anim)
			this.anim[key].drawPriority = parseInt(integer);
	}
	
	addAnimation(nameID, spritesheetAnimation){
		if (arguments.length != 2) throw new Error('ArgumentError: Wrong number of arguments');
		// if (!(nameID instanceof String)) throw RamuUtils.CustomTypeError(nameID, String);
		if (!(spritesheetAnimation instanceof SpritesheetAnimation)) throw RamuUtils.CustomTypeError(spritesheetAnimation, SpritesheetAnimation);
		
		spritesheetAnimation.x = this.x;
		spritesheetAnimation.y = this.y;
		spritesheetAnimation.canDraw = false;
		spritesheetAnimation.drawPriority = this.animDrawPriority;
		Drawable.sortPriority();
		this.anim[nameID] = spritesheetAnimation;
	}
	
	setCurrentAnimation(nameID){
		if (arguments.length != 1) throw new Error('ArgumentError: Wrong number of arguments');
		// if (!(nameID instanceof String)) throw RamuUtils.CustomTypeError(nameID, String);

		this.currentID = nameID;
		for (var key in this.anim)
			this.anim[key].canDraw = false;
		
		if (this.anim[key] != null)
			this.anim[nameID].canDraw = true;
	}
	
	getCurrentAnimationID(){
		for (var key in this.anim)
			if (this.anim[key].canDraw)
				return key;
		return null;		
	}
	
	setFlipHorizontally(bool){
		if (!(typeof(bool) == "boolean")) throw RamuUtils.CustomTypeError(bool, Boolean);

		for (var key in this.anim)
			this.anim[key].flipHorizontally = bool;
	}
	
	setFlipVertically(bool){
		if (!(typeof(bool) == "boolean")) throw RamuUtils.CustomTypeError(bool, Boolean);

		for (var key in this.anim)
			this.anim[key].flipVertically = bool;
	}
	
	setX(x){
		this.x = x;
		for (var key in this.anim)
			this.anim[key].x = x;
	}
	
	setY(y){
		this.y = y;
		for (var key in this.anim)
			this.anim[key].y = y;
	}	
	
	addX(x){
		this.x += x;
		for (var key in this.anim)
			this.anim[key].x += x;
	}
	
	addY(y){
		this.y += y;
		for (var key in this.anim)
			this.anim[key].y += y;
	}
	
	destroy(){
		for (var key in this.anim){
			this.anim[key].destroy();
			delete this.anim[key]; //= null;
		}
		this.anim = {};
		super.destroy();
	}
}

//}

//{ Other
class Parallax extends GameObj{
	constructor(img, x, y, w, h, velocity = 20){
		super(x, y, w, h);
		if (arguments.length < 5) throw new Error('ArgumentError: Wrong number of arguments');
		if (!(img instanceof Image)) throw RamuUtils.CustomTypeError(img, Image);

		this.left   = new Sprite(img, x - w, y, w, h);
		this.center = new Sprite(img, x  + w  , y, w, h);
		this.right  = new Sprite(img, x + w, y, w, h);
		this.velocity = velocity;
		this.setDrawPriority(-1);
	}
	
	canDraw(bool){
		if (!(bool instanceof Boolean)) throw RamuUtils.CustomTypeError(bool, Boolean);

		this.left.canDraw   = bool;
		this.center.canDraw = bool;
		this.right.canDraw  = bool;
	}
	
	setDrawPriority(num){
		this.left.drawPriority   = parseInt(num);
		this.center.drawPriority = parseInt(num);
		this.right.drawPriority  = parseInt(num);
		Drawable.sortPriority();
	}
	
	update(){
		let vel = this.velocity * Ramu.time.delta;
		this.left.x   += vel;
		this.center.x += vel;
		this.right.x  += vel;
		
		// Left
		if (this.center.x >= Ramu.canvas.width)
			this.center.x = this.right.x - this.right.width;
		
		if (this.right.x >= Ramu.canvas.width)
			this.right.x = this.center.x - this.center.width;
		
		// Right
		if (this.center.x + this.center.width <= 0)
			this.center.x = this.right.width;
		
		if (this.right.x + this.right.width <= 0)
			this.right.x = this.center.width;
	}
	
	destroy(){
		this.left.destroy();
		delete this.left; //= null;
		this.center.destroy();
		delete this.center; //= null;
		this.right.destroy();
		delete this.right; //= null;
		super.destroy();
	}
}

class Text extends Drawable {
	constructor(text, x, y, maxWidth, lineHeight = 25){
		super(x, y, 1, 1, true);
		this.text = text;
		this.maxWidth = maxWidth;
		this.lineHeight = lineHeight;
		
		this.font = Ramu.ctx.font;
		this.fillStyle = Ramu.ctx.fillStyle;
		
		this.drawOutOfCanvas = true;
	}
	
	start(){
		this.setUp();
	}
	
	// Adapted from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial
	draw(){
		let y = this.y, testWidth = 0;
		let line = '', testLine = '', metrics = null;
		
		let oldFont = Ramu.ctx.font;
		let oldStyle = Ramu.ctx.fillStyle;
		
		Ramu.ctx.font = this.font;
		Ramu.ctx.fillStyle = this.fillStyle;
		
		for(var n = 0; n < this._words.length; n++) {
			testLine = line + this._words[n] + ' ';
			metrics = Ramu.ctx.measureText(testLine);			
			testWidth = metrics.width;
			
			if (this._words[n] == "\\n"){
				Ramu.ctx.fillText(line, this.x, y);
				line = '';
				y += this.lineHeight;
				
			}
			
			else if (testWidth > this.maxWidth && n > 0) {
				Ramu.ctx.fillText(line, this.x, y);
				line = this._words[n] + ' ';
				y += this.lineHeight;
			}
			else {
				line = testLine;
			}
		}
		
		Ramu.ctx.fillText(line, this.x, y);
		Ramu.ctx.font = oldFont;
		Ramu.ctx.fillStyle = oldStyle;
	}
	
	setUp(){
		this._words = this.text.replace(/\n/g, " \\n ").split(' ');
	}
}

//}

