var VirusEntity = FloaterEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		if(!settings){
			settings={};
		}
		// call the parent constructor
		settings.image = "virusEntity";
		settings.spritewidth = 32;
		this.parent(x, y, settings);
		this.collidable=true;

		// this actually sets the default acceleration values
		this.setVelocity(1, 5);
		//set max velocity
		this.setMaxVelocity(2,20);
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
	}
});
