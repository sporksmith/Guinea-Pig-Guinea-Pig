//heartbeat.js
var heartbeat = 1;
function updateHeartbeat(){
	heartbeat = heartbeat*-1;
	window.setTimeout(updateHeartbeat,1500);
}
window.setTimeout(updateHeartbeat,1500);

