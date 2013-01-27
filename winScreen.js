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
		
		this.scroller = "THE OPERATION WAS A SUCCESS!";
		this.scrollerpos = 700;
	},
	/* ---
		reset function
	   ----*/
	
	onResetEvent : function()
	{
		if (this.title == null) {
			this.title = me.loader.getImage("win_screen");
			this.font = new me.BitmapFont("32x32_font", 32);
			this.font.set("left");
			
			// set the scroller
			this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont.set("left");
		}
		// reset to default value
		this.scrollerpos = 1024;
		
		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this)
				.to({scrollerpos: -2200 }, 10000)
				.onComplete(this.scrollover.bind(this)).start();
		
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
			me.state.change(me.state.MENU);
		}
		return true;
	},

	
	/*---
	
		the manu drawing function
	  ---*/
	
	draw : function(context)
	{
		context.drawImage(this.title, 0,0);
		
		this.font.draw (context, "CONGRATULATIONS!", 250, 20);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 700);
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
