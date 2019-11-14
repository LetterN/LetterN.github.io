var catbuf;
var ctx = new AudioContext();
var req2 = new XMLHttpRequest();

req2.responseType = "arraybuffer";

var tostop = new Set();

var isrecording = false;
var recordtime = 0;
		//ngeurl
function play(thingtoplay = null, timeat = 0) {
	req2.open("GET", thingtoplay, true);
	req2.onload = () => {
		ctx.decodeAudioData(req2.response, (buf) => {catbuf = buf;} );
	};
	req2.send();
		
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
