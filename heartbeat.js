//heartbeat.js
var heartbeat = 1;
function updateHeartbeat(){
	if ( heartbeat < 0 ) {
		heartbeat = 1;
		timeout = 1500;
	} else {
		heartbeat = -1;
		timeout = 500;
	}

	window.setTimeout(updateHeartbeat, timeout);
}
window.setTimeout(updateHeartbeat,1500);

