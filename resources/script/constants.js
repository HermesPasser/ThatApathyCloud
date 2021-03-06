function getAttributeInt(xml, tag, attribute){
	xml = xml.getElementsByTagName(tag)[0];
	return parseInt(xml.getAttribute(attribute));
}
	
function loadXML(filename){
	let req = new XMLHttpRequest();
	req.open("GET", filename, false);
	req.setRequestHeader("Content-Type", "text/xml");
	req.send(null);
	return req.responseXML;
}

//------------------------------|
// Layer	Priority			|
//------------------------------|
// 0		Below the character |
// 1		Same as character   |
// 2		Above the character |
//------------------------------|

const DIRECTION = {TOP: 0, LEFT: 1, RIGHT: 2, BOTTOM: 3};
const LAYER = {BELOW: 0, SAME: 1, ABOVE: 2};

const SOUND = {
	SHOT: 	   new Audio('resources/sound/shot.wav'),
	CRY: 	   new Audio('resources/sound/cry.wav'),
	END:	   new Audio('resources/sound/endmusic.wav'),
	GAME:	   new Audio('resources/sound/gamemusic.wav'),
	CHANGE_OP: new Audio('resources/sound/menusound.wav'),
	DISAPPEAR: new Audio('resources/sound/disappear.wav')
};


const ENDING_IMAGES = {
	SPACE0: RamuUtils.getImage("resources/sprite/outerspace0.png"),
	SPACE1: RamuUtils.getImage("resources/sprite/outerspace1.png"),
	PLANET: RamuUtils.getImage("resources/sprite/planet.png")
}

const PARTICLE_IMAGE = {
	YELLOW: RamuUtils.getImage("resources/sprite/particleyellow.png"),
	BLOOD: RamuUtils.getImage("resources/sprite/particlered.png"),
	BLUE: RamuUtils.getImage("resources/sprite/particleblue.png")
} 

const SCREEN_IMAGE = {
	SPLASH0: RamuUtils.getImage("resources/sprite/logo_gladio.png"),
	SPLASH1: RamuUtils.getImage("resources/sprite/logo_hermes.png"),
	TITLE_SCREEN: RamuUtils.getImage('resources/sprite/title_screen.png')
}

const BASIS = (function(){
	let data = loadXML("resources/tileset/basis.xml");
	let lines = 15, colunms = 12, tilesize = 50;
	
	return {
		IMAGE: 		  	RamuUtils.getImage("resources/tileset/basis.png"),
		IMAGE_WIDTH:  	getAttributeInt(data, "image", "width"),
		IMAGE_HEIGHT: 	getAttributeInt(data, "image", "height"),
		TILE_COUNT:   	lines * colunms,
		TILE_SIZE:    	tilesize,
		SCREEN_WIDTH: 	lines * tilesize,
		SCREEN_HEIGHT:	colunms * tilesize,
		DATA:  		  	data
	};
})()
