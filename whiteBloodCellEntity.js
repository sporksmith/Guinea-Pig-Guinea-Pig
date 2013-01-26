var WhiteBloodCellEntity = FloaterEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		if(!settings){
			settings={};
		}
		// call the parent constructor
		settings.image = "whiteBloodCellEntity";
		settings.spritewidth = 64;
		settings.spriteheight = 64;
		this.parent(x, y, settings);
		this.collidable=false;

		// this actually sets the default acceleration values
		this.setVelocity(1, 5);
		//set max velocity
		this.setMaxVelocity(1,10);
		this.setFriction(0,0);
		this.vel.x = Math.random()*10-5;
		this.vel.y = Math.random()*10-5;
	},
 
	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision: function() {
		this.collidable = false;
		// remove it
		me.game.remove(this);
	},
	
	update: function(){
		if (!this.isFlickering()&&this.pos.x + this.vel.x > me.game.currentLevel.realwidth - this.width){
			this.flicker(30,function(){
				me.game.remove(this);
			})
			me.game.remove(this);
		} else {
			this.parent();
		}
	}
});