var VirusEntity = FloaterEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	HOSTILE:0,
	FRIENDLY:1,
	init: function(x, y, settings) {
		if(!settings){
			settings={};
		}
		// call the parent constructor
		settings.image = "virusEntity";
		settings.spritewidth = 32;
		settings.spriteheight = 32;
		this.parent(x, y, settings);
		this.collidable=true;
		// this actually sets the default acceleration values
		this.setVelocity(1, 5);
		//set max velocity
		this.setMaxVelocity(2,20);
		this.setFriction(0,0);
		this.vel.x = Math.random()*10-5;
		this.vel.y = Math.random()*10-5;
		this.mode = this.HOSTILE;
		this.addAnimation ("hostile", [0,1,2,3,4,5,6,7]);
		this.addAnimation ("friendly", [8,9,10,11,12,13]);
		this.setCurrentAnimation("hostile");
	},
 
	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision: function(res, obj) {
		//console.log("virus in mode "+this.mode+" collided with "+obj.name);
		if(this.mode==this.HOSTILE){
			if(obj.name=="mainplayer"){
				this.collidable = false;
				me.game.remove(this);
				obj.flicker(30);
				me.gamestat.setValue("health",me.gamestat.getItemValue("health")-10);
				me.audio.play("sfx_whblcell_hurt");
			}else if (obj.name=="laserentity"){
				this.mode=this.FRIENDLY;
				this.setCurrentAnimation("friendly");
				me.game.remove(obj);
				me.audio.play("crash");
			}else if (obj.name=="whitebloodcellentity"){
				
			} else {
				//console.log(obj);
			}
		}else{
			if(obj.name=="mainplayer"){
				this.collidable = false;
				me.gamestat.setValue("score.caught",me.gamestat.getItemValue("score.caught")+1);
				me.gamestat.setValue("health",me.gamestat.getItemValue("health")+5);
				me.game.remove(this);
				me.audio.play("sfx_gerbil_yay_2");
			}else if (obj.name=="laserentity"){
				this.collidable=false;
				this.flicker(30,function(){
					me.game.remove(this);
				});
				me.game.remove(obj);
				me.audio.play("crash");
			}else if (obj.name=="whitebloodcellentity"){
				
			} else {
				//console.log(obj);
			}
				
		}
	},
	
	update: function(){
		//console.log( this.visible, this.pos.x, me.game.viewport.pos.x );
		if (this.pos.x < me.game.viewport.pos.x-me.game.viewport.width) {
			// offscreen to the left: teleport
			this.pos.x = me.game.viewport.pos.x + me.game.viewport.width + 100;
			//console.log('teleport');
		}
		if (!this.isFlickering()&&this.pos.x + this.vel.x > me.game.currentLevel.realwidth - this.width){
			// off-level to the right: destroy
			this.flicker(30,function(){
				me.game.remove(this);
			})
			me.game.remove(this);
		} else {
			this.parent();
		}
	}
});
