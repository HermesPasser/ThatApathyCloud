class Machine extends GameObj{
	start(){
		Machine.STATE = {
			SPLASH: 0, TITLE: 1, GAME: 2, OVER: 4
		};
		
		Machine.CURRENT_STATE = Machine.STATE.GAME;//SPLASH;
		Machine.machine();
	}
	
	static changeState(state){
		Machine.currentScreen.destroy();
		Machine.CURRENT_STATE = state;
		Machine.machine();
	}
	
	static machine(){
		switch (Machine.CURRENT_STATE){
			case Machine.STATE.SPLASH:
				Machine.currentScreen = new SplashScreen();
				break;
			case Machine.STATE.TITLE:
				Machine.currentScreen = new MenuScreen();
				break;
			case Machine.STATE.GAME:
				Machine.currentScreen = new GameScreen();
				break
			case Machine.STATE.OVER:
			
				break;	
		}	
	}
}