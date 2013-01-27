WinTransitionPoint = me.InvisibleEntity.extend({
		init:function(x,y,settings){
			//console.log("winTransitionPoint.init");
			this.parent(x,y,settings);
			this.collidable=true;
		},
		onCollision:function(res,obj){
			//console.log("winTransitionPoint.onCollision");
			if(obj.name=="mainplayer"){
				me.state.change(me.state.GAME_END);
			}
		}
		
	}
);
