var ctx = new AudioContext();

var tostop = new Set();

var isrecording = false;
var recordtime = 0;
/**
 * 
 * @param {String} thingtoplay 
 * @param {Number} timeat 
 */
function play(thingtoplay = null, timeat = 0){
	let catbuf;
	let req = new XMLHttpRequest();
	req.responseType = "arraybuffer";
	req.open("GET", thingtoplay, true);
	req.onload = () => {
		ctx.decodeAudioData(req.response, (buf) => {catbuf = buf;} );
	};
	req.send();
		
	isrecording = true;
	recordtime = ctx.currentTime - timeat;
	var ngesrc = ctx.createBufferSource();
	ngesrc.buffer = catbuf;
	ngesrc.connect(ctx.destination);
	ngesrc.start(0, timeat);
	console.log('Playing!');
	tostop.add(ngesrc);
	ngesrc.onended = () => {tostop.delete(ngesrc); isrecording = false; console.log('Ended');};
}

function stop() {
	for(var source of tostop) {
		source.stop();
		console.log('forcefully stoped audio');
	}
	isrecording = false;
	tostop.clear();
}
