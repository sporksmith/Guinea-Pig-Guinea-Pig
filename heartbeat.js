//heartbeat.js
var heartbeat_a = 1; // current accel to apply

// our base model
var heartbeat_seq = [
	{ 'a': -.5, 't': .5, 'audio': "ba" }, // 'ba-'
	{ 'a': .2, 't': 1.5, 'audio': "bum" }, // '-bump!'
	{ 'a': 0.1, 't': 3}, // '---'
	]
var heartbeat_idx=0;
var heartbeat_rate=300;
function updateHeartbeat(){
	heartbeat = heartbeat_seq[ heartbeat_idx ];
	heartbeat_a = heartbeat['a'];
	timeout = heartbeat['t'] * heartbeat_rate;
	audio = heartbeat_seq[ heartbeat_idx]['audio' ];

	if (audio) {
		me.audio.play(audio);
	}

	heartbeat_idx = (heartbeat_idx + 1) % heartbeat_seq.length;
	//console.log( heartbeat_idx, heartbeat_a, timeout );

	window.setTimeout(updateHeartbeat, timeout);
}
//updateHeartbeat();
//window.setTimeout(updateHeartbeat,1500);

