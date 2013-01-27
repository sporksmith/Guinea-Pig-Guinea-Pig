var FloaterEntity = me.ObjectEntity.extend({
	init:function(x, y, settings){
		this.parent(x, y, settings);
	},
	updateMovement: function(){
		this.computeVelocity(this.vel);

		// check for collision
		var collision = this.collisionMap.checkCollision(this.collisionBox, this.vel);

		// update some flags
		this.onslope  = collision.yprop.isSlope || collision.xprop.isSlope;

		// y collision
		if (collision.y) {

			if (collision.y > 0) {
				if (collision.yprop.isSolid	|| (collision.yprop.isPlatform && (this.collisionBox.bottom - 1 <= collision.ytile.pos.y))) {
					// adjust position to the corresponding tile
					this.pos.y = ~~this.pos.y;
					this.vel.y = (this.falling) ?collision.ytile.pos.y - this.collisionBox.bottom: 0 ;
					this.falling = false;
				}
				else if (collision.yprop.isSlope && !this.jumping) {
					// we stop falling
					this.checkSlope(collision.ytile, collision.yprop.isLeftSlope);
					this.falling = false;
				}
			}
			// going up, collision with ceiling
			else if (collision.y < 0) {
				if (!collision.yprop.isPlatform	&& !collision.yprop.isLadder) {
					this.falling = true;
					// cancel the y velocity
					//this.vel.y = 0;
				}
			}
		}

		// x collision
		if (collision.x) {

			this.onladder = collision.xprop.isLadder ;

			if (collision.xprop.isSlope && !this.jumping) {
				this.checkSlope(collision.xtile, collision.xprop.isLeftSlope);
				this.falling = false;
			} else {
				// can walk through the platform & ladder
				if (!collision.xprop.isPlatform && !collision.xprop.isLadder) {
					if (collision.xprop.isBreakable	&& this.canBreakTile) {
						// remove the tile
						me.game.currentLevel.clearTile(collision.xtile.col, collision.xtile.row);
						if (this.onTileBreak) {
							this.onTileBreak();
						}
					} else {
						this.vel.x = 0;
					}
				}
			}
		}


		// update player position
		this.pos.add(this.vel);

		// returns the collision "vector"
		return collision;
	},
	update: function(){
		var result=false;
		//update velocity in direction of heartbeat
		this.vel.x+=heartbeat_a;
		// check & update player movement
		var collision = this.updateMovement();
		if(collision.x!=0||collision.y!=0){
			//console.log("a collision map hit occurred - vel.x: "+this.vel.x+" vel.y: "+this.vel.y);
			if(collision.y!=0){
				this.vel.y *= -3;
			}

			if (this.name == 'mainplayer') {
				if (Math.random() > .5) {
					me.audio.play("sfx_gerbil_bounce_1");
				} else {
					me.audio.play("sfx_gerbil_bounce_2");
				}
			}

		}
		if (this.vel.x!=0 || this.vel.y!=0) {
			// update objet animation
			this.parent(this);
			result=true;
		}
		 
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return result;
	}
});
