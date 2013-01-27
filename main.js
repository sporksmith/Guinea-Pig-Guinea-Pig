var jsApp = {
	/* ---
	
	Initialize the jsApp
	
	---	*/
	onload: function()
	{
		// init the video
		if (!me.video.init('jsapp', 1024, 768, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// initialize the "audio"
		me.audio.init("ogg,mp3,wav");
		
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
		me.entityPool.add("whiteBloodCellEntity", WhiteBloodCellEntity);
		me.entityPool.add("virusEntity", VirusEntity);
		me.entityPool.add("virusSpawnPoint", VirusSpawnPoint);
		me.entityPool.add("whiteBloodCellSpawnPoint", WhiteBloodCellSpawnPoint);
		me.entityPool.add("laserEntity", LaserEntity);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up", true);
		me.input.bindKey(me.input.KEY.DOWN, "down", true);
		me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
		
		// display the menu title
		me.state.change(me.state.MENU);
		//gamepadSupport.init();
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = (function(){
	var costTimer = 0;
	var spawntimer=0;
	var spawnPoints = [];
	return me.ScreenObject.extend(
	{
		init: function(){
			this.parent(true);
		},
		onResetEvent: function() {	
			// stuff to reset on state change
			me.levelDirector.loadLevel("area01");
			// add a default HUD to the game mngr
			//me.game.addHUD(0, 430, 640, 60); 
			me.game.sort();
			me.gamestat.add("score.caught",0);
			me.gamestat.add("score.destroyed",0);
			me.gamestat.add("score.escaped",0);
			me.gamestat.add("score.cost",0);
			me.gamestat.add("score.premium",2500);
			me.gamestat.add("endurance",0);
			me.gamestat.add("health",100);
			//spawnPoints = me.game.getEntityByName("virusSpawnPoint");
			//console.log(spawnPoints);
			//me.audio.playTrack("DST-InertExponent");
			updateHeartbeat(); // kick start the heart
			window.setTimeout(function(){me.audio.playTrack("bangthataccordion");},10000);
		},
		update: function(){
			var scoreCaught = me.gamestat.getItemValue("score.caught");
			var scoreDestroyed = me.gamestat.getItemValue("score.destroyed");
			var scoreEscaped = me.gamestat.getItemValue("score.escaped");
			var scoreCost = me.gamestat.getItemValue("score.cost");
			var scorePremium = me.gamestat.getItemValue("score.premium");
			var scoreEndurance = me.gamestat.getItemValue("endurance");
			var scoreHealth = me.gamestat.getItemValue("health");
			
			if(++costTimer==85){
				var randomCostIncrease = Math.random()*95;
				scorePremium+=randomCostIncrease;
				scoreCost+=randomCostIncrease*1.75;
				costTimer = 0;
			}
			me.gamestat.setValue("score.cost",scoreCost);
			me.gamestat.setValue("score.premium",scorePremium);
			ScoreBoardElements["caught"].innerHTML = scoreCaught;
			ScoreBoardElements["destroyed"].innerHTML = scoreDestroyed;
			ScoreBoardElements["escaped"].innerHTML = scoreEscaped;
			ScoreBoardElements["endurance"].innerHTML = scoreEndurance;
			ScoreBoardElements["health"].innerHTML = scoreHealth;
			if(scoreHealth>75){
				ScoreBoardElements["health"].className="";
			} else if(scoreHealth>50){
				ScoreBoardElements["health"].className="caution";
			} else if(scoreHealth>25){
				ScoreBoardElements["health"].className="warning";
			} else if(scoreHealth>10){
				ScoreBoardElements["health"].className="danger";
			} else {
				ScoreBoardElements["health"].className="crisis";
			}
			
			ScoreBoardElements["cost"].innerHTML = "$"+Math.round(scoreCost)+".95"
			ScoreBoardElements["premium"].innerHTML = "$"+Math.round(scorePremium)+".95"
		},
		/* ---
		 action to perform when game is finished (state change)
		---*/
		onDestroyEvent: function() {
			// remove the HUD
			//me.game.disableHUD();
			me.audio.stopTrack();
		}
	});
})();
//me.debug.renderHitBox = true;

//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
	
});
var ScoreBoardElements;
window.addEventListener("load",function(){
	//console.log("onload");
	ScoreBoardElements = {
		caught:document.getElementById("caughtCounter"),
		destroyed:document.getElementById("destroyedCounter"),
		escaped:document.getElementById("escapedCounter"),
		endurance:document.getElementById("enduranceCounter"),
		health:document.getElementById("healthCounter"),
		cost:document.getElementById("insurance.cost"),
		premium:document.getElementById("insurance.premium")
	}
},true);
