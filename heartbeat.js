//heartbeat.js
var heartbeat_a = 1; // current accel to apply

// our base model
var heartbeat_seq = [
	{ 'a': -.1, 't': 1 }, // 'ba-'
	{ 'a': .15, 't': 1.5 }, // '-bump!'
	{ 'a': 0, 't': 3}, // '---'
	]
var heartbeat_idx=0;
var heartbeat_rate=300;
function updateHeartbeat(){
	heartbeat = heartbeat_seq[ heartbeat_idx ];
	heartbeat_a = heartbeat['a'];
	timeout = heartbeat['t'] * heartbeat_rate;
	heartbeat_idx = (heartbeat_idx + 1) % heartbeat_seq.length;
	//console.log( heartbeat_idx, heartbeat_a, timeout );

	window.setTimeout(updateHeartbeat, timeout);
}
updateHeartbeat();
//window.setTimeout(updateHeartbeat,1500);

