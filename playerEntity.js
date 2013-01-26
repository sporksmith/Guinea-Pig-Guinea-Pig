/*------------------- 
a player entity
-------------------------------- */
var PlayerEntity = FloaterEntity.extend({
	/* -----
	constructor
	------ */
	max_endurance:1000,
	endurance: 1000,
	forcedmovement:false,
	init: function(x, y, settings) {
		// call the constructor
		this.parent(x, y, settings);
 
		// this actually sets the default acceleration values
		this.setVelocity(1, 5);
		//set max velocity
		this.setMaxVelocity(5,20);
		this.setFriction(0.02,0.02);

		// define collision rectangle within sprite
		//this.updateColRect(8, 48, -1, 0);
		me.gamestat.setValue("endurance",100);
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// follow precisely to emphasize 'drift'
		me.game.viewport.setDeadzone(0, 0);
	},
	/* -----
	update the player pos
	------ */
	update: function() {
		var $this=this;
		var gamepad;
		var moved=false;
		if(window.gamepads){
			if(navigator.webkitGamepads){
				gamepad=navigator.webkitGamepads[0];
			}else if (navigator.webkitGetGamepads){
				var gamepads = navigator.webkitGetGamepads();
				if(gamepads.length){
					gamepad=gamepads[0];
				}
			}
		}
		if (me.input.isKeyPressed('left')||(gamepad&&gamepad.axes[0]==-1)) {
			console.log(me.timer.tick);
			// face left
			this.flipX(true);
			// update the entity velocity
			if(this.endurance-10>0){
				this.vel.x -= this.accel.x * me.timer.tick;
				this.endurance-=10;
			}
			moved=true;
			
		} else if (me.input.isKeyPressed('right')||(gamepad&&gamepad.axes[0]==1)) {
			// face right
			this.flipX(false);
			// update the entity velocity
			if(this.endurance-5>0){
				this.vel.x += this.accel.x * me.timer.tick;
				this.endurance-=5;
			}
			moved=true;
		} else {
			// leave velocity alone
			//this.vel.x = 0;
		}
		if (me.input.isKeyPressed('down')||(gamepad&&gamepad.buttons[0])) {
			// 
			if(this.endurance-3>0){
				console.log("move down: velY: "+this.vel.y+" accelY: "+this.accel.y+" tick: "+me.timer.tick);
				this.vel.y += this.accel.y * me.timer.tick;
				if (this.vel.y > this.maxVel.y){
					this.vel.y=this.maxVel.y;
				}
				console.log("move down result: velY: "+this.vel.y+" tick: "+me.timer.tick);
				this.endurance-=3;
			}
			moved=true;
		}
		if (me.input.isKeyPressed('up')||(gamepad&&gamepad.buttons[1])) {
			// increase upward speed unless already at max
			console.log("move up: velY: "+this.vel.y+" accelY: "+this.accel.y+" tick: "+me.timer.tick);
			if(this.endurance-3>0){
				this.vel.y -= this.accel.y * me.timer.tick;
				if (this.vel.y < -1*this.maxVel.y){
					this.vel.y=-1*this.maxVel.y;
				}
				console.log("move up result: velY: "+this.vel.y+" tick: "+me.timer.tick);
				moved=true;
				this.endurance-=3;
			}
			moved=true;

		}
		if(this.endurance<this.max_endurance&&!moved){
			this.endurance = this.endurance + 10;
		}
		me.gamestat.setValue("endurance",this.endurance);
		// check for collision
		var res = me.game.collide(this);
		if (res) {
			//console.log("collision detected!");
			//console.log(res);
		}
		return this.parent(this);
	}
 
});
