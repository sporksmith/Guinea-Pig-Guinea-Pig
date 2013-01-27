VirusSpawnPoint = me.InvisibleEntity.extend(
	{
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.resetSpawnTimer();
		},

		resetSpawnTimer:function(){
			this.spawntimer=Math.round(Math.random()*100);
		},

		update:function(){
			//console.log("spawnpoint update");
			this.spawntimer--;
			if(this.spawntimer < 0){
				var y = Math.round(Math.random() * me.game.viewport.height);
				var x = me.game.viewport.pos.x + me.game.viewport.width + 100;
				var obj = new VirusEntity(x, y)
				// add the object and give the z index of the current object
				me.game.add(obj,3);
				// sort the object list (to ensure the object is properly displayed)
				me.game.sort();
				this.resetSpawnTimer();
			}
		}
		
	}
);
