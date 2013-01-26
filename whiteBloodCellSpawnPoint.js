WhiteBloodCellSpawnPoint = me.InvisibleEntity.extend(
	{
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.spawntimer=0;
			this.spawntick = Math.round(Math.random()*125);
		},
		update:function(){
			//console.log("spawnpoint update");
			this.spawntimer++;
			if(this.spawntick==this.spawntimer){
				var obj = new WhiteBloodCellEntity(this.pos.x, this.pos.y)
				// add the object and give the z index of the current object
				me.game.add(obj,3);
				// sort the object list (to ensure the object is properly displayed)
				me.game.sort();
				this.spawntimer=0;
			}
		}
		
	}
);
