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

var SOUND = {
	HIT: 	   new Audio('resources/sound/hit.wav'),
	DISAPPEAR: new Audio('resources/sound/disappear.wav')
};

const BASIS = (function(){
	let data = loadXML("resources/tileset/basis.xml");

	return {
		IMAGE: 		  RamuUtils.getImage("resources/tileset/basis.png"),
		IMAGE_WIDTH:  getAttributeInt(data, "image", "width"),
		IMAGE_HEIGHT: getAttributeInt(data, "image", "height"),
		TILE_COUNT:   100,
		TILE_SIZE:    50,
		DATA:  		  data
	};
})()
