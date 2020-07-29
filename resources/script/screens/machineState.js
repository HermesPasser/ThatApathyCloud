class Machine extends GameObj{	
	static init(){
		console.warn("talvez checar se é nulo antes de instantiar para evitar que a tela seja chamada duas vezes caso sega a segunda jogada");
		console.warn("bom criar um metodo reset para resetar as scenas (tipo a splash que o valor current esta maior que o time)");
		
		Machine.STATE = {
			SPLASH: 0, TITLE: 1, INTRO: 2, GAME: 3, END: 4
		};
		
		Machine.screens = [ // must be in same order as STATE
			new SplashScreen(), //SPLASH
			new TitleScreen(), //TITLE
			new IntroScreen(), //INTRO
			new GameObj(),//new GameScreen(), //GAME// provisorio
			new EndScreen() //END
		];
		
		for (let i = 0; i < Machine.screens.length; i++){
			if (i !== 0)
				Machine.screens[i].setActive(false);
		}
		
		// Machine.GLOBAL_BLACK_FLASH = new Flash(4, 'black');
		
		Machine.CURRENT_STATE = Machine.STATE.SPLASH;
	}
	
	static get current_state(){
		// change CURRENT_STATE to _current_state
		return Machine.screens[Machine.CURRENT_STATE];
	}
	
	static changeState(state){
		if (void(0) === state)
			throw new Error('ArgumentError: state is undefined.');
		if (state < 0 || state > Machine.screens.length)
			throw new Error('ArgumentError: state is out of the range.');
		
		Machine.current_state.setActive(false); // deactive current screen
		Machine.screens[state].setActive(true); // active the new screen
		Machine.CURRENT_STATE = state; 			// update current screen value
	}
	
	// static changeStateWithFade(state){
		// não consegui fazer um fadin/out funcional, talvez tentar no proprio game end?
		// Machine.GLOBAL_BLACK_FLASH.state = state;
		// Machine.GLOBAL_BLACK_FLASH.onFadeInEnd = function(){
			// Machine.current_state.setActive(false); // deactive current screen
			// Machine.screens[this.state].setActive(true); // active the new screen
			// Machine.CURRENT_STATE = this.state; // update current screen value
		// };
		// Machine.GLOBAL_BLACK_FLASH.onFadeOutEnd = function(){
		// };
		
		// Machine.GLOBAL_BLACK_FLASH.init();
	// }
}