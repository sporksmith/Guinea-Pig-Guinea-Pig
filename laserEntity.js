var LaserEntity = me.ObjectEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		if(!settings){
			settings={};
		}
		// call the parent constructor
		settings.image = "laserEntity";
		settings.spritewidth = 32;
		this.maxwidth = 32;
		this.parent(x, y, settings);
		this.collidable=true;
		if(!this.name){
			this.name="laserentity";
		}
		// this actually sets the default acceleration values
		this.setVelocity(10, 5);
		//set max velocity
		this.setMaxVelocity(25,0);
		this.setFriction(0,0);
		this.vel.x = 20;
		this.vel.y = 0;
		//console.log(this);
	},
	// this function is called by the engine, when
	// an object is touched by something (here collected)
	/*
	onCollision: function(res, obj) {
		if(obj.name!="mainplayer"){
			if(obj.name=="virusentity"){
				//this.collidable = false;
				me.game.remove(this);
				//me.gamestat.add("score.caught",1);
			}else{
				//console.log("virus collided with "+obj.name);
			}
		}
	},*/
	update: function(){
		this.pos.x = this.pos.x + this.vel.x*me.timer.tick;
		//var collision = this.updateMovement();
		var res = me.game.collide(this);
		this.parent();
		return true;
		/*
		if (!this.isFlickering()&&this.pos.x + this.vel.x > me.game.currentLevel.realwidth - this.width){
			this.flicker(30,function(){
				me.game.remove(this);
			})
			me.game.remove(this);
		} else {
			this.parent();
		}*/
	}
});
