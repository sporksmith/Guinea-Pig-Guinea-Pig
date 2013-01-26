/*------------------- 
a player entity
-------------------------------- */
var PlayerEntity = FloaterEntity.extend({
	/* -----
	constructor
	------ */
	forcedmovement:false,
	init: function(x, y, settings) {
		// call the constructor
		this.parent(x, y, settings);
 
		// this actually sets the default acceleration values
		this.setVelocity(.1, 5);
		//set max velocity
		this.setMaxVelocity(5,20);
		this.setFriction(0.02,0.02);

		// define collision rectangle within sprite
		//this.updateColRect(8, 48, -1, 0);
 
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, new me.Vector2d( 400, 0 ));

		// follow precisely to emphasize 'drift'
		me.game.viewport.setDeadzone(0, 0);
	},
	/* -----
	update the player pos
	------ */
	update: function() {
		var $this=this;
		var gamepad;
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
			this.vel.x -= this.accel.x * me.timer.tick;
		} else if (me.input.isKeyPressed('right')||(gamepad&&gamepad.axes[0]==1)) {
			// face right
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;
		} else {
			// leave velocity alone
			//this.vel.x = 0;
		}
		if (me.input.isKeyPressed('down')||(gamepad&&gamepad.buttons[0])) {
			// 
			console.log("move down: velY: "+this.vel.y+" accelY: "+this.accel.y+" tick: "+me.timer.tick);
			this.vel.y += this.accel.y * me.timer.tick;
			if (this.vel.y > this.maxVel.y){
				this.vel.y=this.maxVel.y;
			}
			console.log("move down result: velY: "+this.vel.y+" tick: "+me.timer.tick);
		}
		if (me.input.isKeyPressed('up')||(gamepad&&gamepad.buttons[1])) {
			// increase upward speed unless already at max
			console.log("move up: velY: "+this.vel.y+" accelY: "+this.accel.y+" tick: "+me.timer.tick);
			this.vel.y -= this.accel.y * me.timer.tick;
			if (this.vel.y < -1*this.maxVel.y){
				this.vel.y=-1*this.maxVel.y;
			}
			console.log("move up result: velY: "+this.vel.y+" tick: "+me.timer.tick);
		}
		// check for collision
		var res = me.game.collide(this);
		if (res) {
			//console.log("collision detected!");
			//console.log(res);
		}
		return this.parent(this);
	}
 
});
