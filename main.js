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
		me.debug.displayFPS=false;
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
		me.state.set(me.state.GAME_END, new WinScreen());
		me.state.set(me.state.GAME_OVER, new LoseScreen());
	 
		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 250);
	 
		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);
		me.entityPool.add("whiteBloodCellEntity", WhiteBloodCellEntity);
		me.entityPool.add("virusEntity", VirusEntity);
		me.entityPool.add("virusSpawnPoint", VirusSpawnPoint);
		me.entityPool.add("whiteBloodCellSpawnPoint", WhiteBloodCellSpawnPoint);
		me.entityPool.add("winTransitionPoint", WinTransitionPoint);
		me.entityPool.add("laserEntity", LaserEntity);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
		
		// display the menu title
		me.state.change(me.state.MENU);
		//gamepadSupport.init();
	}

}; // jsApp
var firstRun=true;
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

			this.font = new me.BitmapFont("16x16_font", 16);
			this.font.set("left");

			//spawnPoints = me.game.getEntityByName("virusSpawnPoint");
			//console.log(spawnPoints);
			if(firstRun){
				firstRun=false;
				updateHeartbeat(); // kick start the heart
			}
			window.setTimeout(function(){me.audio.playTrack("bangthataccordion");},0);
		},
		update: function(){
			var scoreCaught = me.gamestat.getItemValue("score.caught");
			var scoreDestroyed = me.gamestat.getItemValue("score.destroyed");
			var scoreEscaped = me.gamestat.getItemValue("score.escaped");
			var scoreCost = me.gamestat.getItemValue("score.cost");
			var scorePremium = me.gamestat.getItemValue("score.premium");
			var scoreEndurance = me.gamestat.getItemValue("endurance");
			var scoreHealth = me.gamestat.getItemValue("health");
			var oldScoreCost = scoreCost;
			if(++costTimer==85){
				var randomCostIncrease = Math.random()*95;
				scorePremium+=randomCostIncrease;
				scoreCost+=randomCostIncrease*1.75;
				costTimer = 0;
			}
			me.gamestat.setValue("score.cost",scoreCost);
			me.gamestat.setValue("score.premium",scorePremium);

			/*
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
			} else if(scoreHealth>0){
				ScoreBoardElements["health"].className="crisis";
			} else {
			*/

			if (scoreHealth <= 0) {
				me.state.change(me.state.GAME_OVER);
			}
			
			ScoreBoardElements["caught"].innerHTML = scoreCaught;
			ScoreBoardElements["cost"].innerHTML = "$"+Math.round(scoreCost)+".95"
			ScoreBoardElements["premium"].innerHTML = "$"+Math.round(scorePremium)+".95"
			if(scoreCost>4000){
				ScoreBoardElements["status"].innerHTML = "DENIED";
				ScoreBoardElements["status"].className = "critical";
			}
		},
		/* ---
		 action to perform when game is finished (state change)
		---*/
		onDestroyEvent: function() {
			// remove the HUD
			//me.game.disableHUD();
			me.audio.stopTrack();
		},
		repeat : function(s, count) { // this is a general utility. should probably be elsewhere :P
			if (count <= 0) {
				return "";
			}
			return (new Array(count + 1)).join(s);
		},
		draw : function(context)
		{
			var scoreHealth = me.gamestat.getItemValue("health");
			this.font.draw (context, "HEALTH:   " + this.repeat("I", Math.floor(scoreHealth/5)), me.game.viewport.pos.x, 0);

			var scoreEndurance = me.gamestat.getItemValue("endurance");
			this.font.draw (context, "STRENGTH: " + this.repeat("I", Math.floor(scoreEndurance/50)), me.game.viewport.pos.x, 20);
		}
	});
})();
//me.debug.renderHitBox = true;

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
		premium:document.getElementById("insurance.premium"),
		status:document.getElementById("insurance.status")
	}
},true);
