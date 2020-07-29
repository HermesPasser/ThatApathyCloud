class Screen extends GameObj{
	// instances must be in start and default values in resetValues
	center(img){
		img.x = (Ramu.width / 2) - (img.width / 2);
		img.y = (Ramu.height / 2) - (img.height / 2);
	}
}