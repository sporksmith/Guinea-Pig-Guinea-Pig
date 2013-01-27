var WhiteBloodCellEntity = FloaterEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {
		if(!settings){
			settings={};
		}
		// call the parent constructor
		settings.image = "whiteBloodCellEntity";
		settings.spritewidth = 160;
		settings.spriteheight = 160;
		this.parent(x, y, settings);
		this.collidable=true;

		// this actually sets the default acceleration values
		this.setVelocity(1, 5);
		//set max velocity
		this.setMaxVelocity(1,10);
		this.setFriction(0,0);
		this.vel.x = Math.random()*10-5;
		this.vel.y = Math.random()*10-5;
		this.health=20;
		this.setAnimationFrame( Math.round( Math.random()*1000 ) );
	},
 
	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision: function(ref,obj) {
		if(obj.name=="mainPlayer"){
			this.collidable = false;
			me.game.remove(this);
		}else{
			//console.log("white blood cell collided with "+obj.name);
		}
	},
	
	update: function(){
		if (!this.isFlickering()&&this.pos.x + this.vel.x > me.game.currentLevel.realwidth - this.width){
			this.flicker(30,function(){
				me.game.remove(this);
			})
			me.game.remove(this);
		} else {
			var res = me.game.collide(this);
			if(res&&res.obj&&res.obj.name!="mainPlayer"){
				//console.log("whiteBloodCell collided with "+res.obj.name);
				if(res.obj.name=="virusentity"){
					this.health=this.health-1;
					if(this.health==0){
						this.collidable=false;
						this.flicker(60,function(){
							me.game.remove(this);
						});
					}
				}
			}
			this.parent();
		}
	}
});
