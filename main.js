var jsApp = {
	/* ---
	
	Initialize the jsApp
	
	---	*/
	onload: function()
	{
		// init the video
		if (!me.video.init('jsapp', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// initialize the "audio"
		//me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
				me.sys.gravity=0;

	},
	/* ---
	   callback when everything is loaded
	   ---  */
		 
	loaded: function ()	
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.MENU, new TitleScreen());
	 
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
	 
		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 250);
	 
		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);
	 
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up", true);
		me.input.bindKey(me.input.KEY.DOWN, "down", true);
		
		// display the menu title
		me.state.change(me.state.MENU);
		//gamepadSupport.init();
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

	onResetEvent: function() {	
		// stuff to reset on state change
		me.levelDirector.loadLevel("area01");
		// add a default HUD to the game mngr
		me.game.addHUD(0, 430, 640, 60); 
		me.game.sort();
		//me.audio.playTrack("DST-InertExponent");
	},
	/* ---
	 action to perform when game is finished (state change)
	---*/
	onDestroyEvent: function() {
		// remove the HUD
		me.game.disableHUD();
		//me.audio.stopTrack();
	}
});
//me.debug.renderHitBox = true;

//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
