VirusSpawnPoint = me.InvisibleEntity.extend(
	{
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.spawntimer=0;
			this.spawntick = Math.round(Math.random()*60)+1;
		},
		update:function(){
			console.log("spawnpoint update");
			this.spawntimer++;
			if(this.spawntick==this.spawntimer){
				var obj = new VirusEntity(16, 16)
				// add the object and give the z index of the current object
				me.game.add(obj,3);
				// sort the object list (to ensure the object is properly displayed)
				me.game.sort();
				this.spawntimer=0;
			}
		}
		
	}
);
