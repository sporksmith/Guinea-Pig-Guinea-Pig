var WinScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		
		// title screen image
		this.title         = null;
		this.font          =  null;
		this.scrollerfont  =  null;
		this.scrollertween = null;
		
		this.scroller = "EVERY NEW PROCEDURE NEEDS A GUINEA PIG";
		this.scrollerpos = 600;
	},
	/* ---
		reset function
	   ----*/
	
	onResetEvent : function()
	{
		if (this.title == null) {
			this.title = me.loader.getImage("title_screen");
			this.font = new me.BitmapFont("32x32_font", 32);
			this.font.set("left");
			
			// set the scroller
			this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont.set("left");
		}
		// reset to default value
		this.scrollerpos = 1024;
		
		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
	
	
	// some callback for the tween objects
	scrollover : function()
	{
		// reset to default value
		this.scrollerpos = 1024;
		this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
	},
		
	/*---
		
		update function
		 ---*/
		
	update : function()
	{
		// enter pressed ?
		if (me.input.isKeyPressed('enter'))
		{
			me.state.change(me.state.PLAY);
		}
		return true;
	},

	
	/*---
	
		the manu drawing function
	  ---*/
	
	draw : function(context)
	{
		context.drawImage(this.title, 0,0);
		
		this.font.draw (context, "PRESS ENTER TO PLAY",	 200, 768/2);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 768-200);
	},
	
	/*---
	
		the manu drawing function
	  ---*/
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
		
		//just in case
		this.scrollertween.stop();
   },

});
