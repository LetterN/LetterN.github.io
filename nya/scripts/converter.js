var list_of_nyaas = ["ka", "ki", "ku", "ke", "ko","ga", "gi", "gu", "ge", "go","sa", "su", "se", "so","za", "zu", "ze", "zo", "zi","ta", "tsu", "te", "to","da", "du", "de", "do","na", "ni", "nu", "ne", "no", "n","ha", "hi", "hu", "he", "ho","ba", "bi", "bu", "be", "bo","pa", "pi", "pu", "pe", "po","ma", "mi", "mu", "me", "mo","ya", "yu", "yo","ra", "ri", "ru", "re", "ree", "ro","wa", "i", "e", "wo","vu","fa", "fi", "fu", "fe", "fo","cha", "chi", "chu", "che", "cho","ja", "ji", "ju", "je", "jo","sha", "shi", "shu", "she", "sho","kya", "gya", "nya", "hya", "bya", "pya", "mya", "rya","kyu", "gyu", "nyu", "hyu", "byu", "pyu", "myu", "ryu","kyo", "gyo", "nyo", "hyo", "byo", "pyo", "myo", "ryo"];
var nya2letter = {};
var nyadefinition = {};

/**
 * Gets the keys on how2decrpyt this
 * @param {Array} shift 
 */
function getKey(shift){
	const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var lengthbus = letters.length * 2;

	let nyas_per_letter = Math.round(list_of_nyaas.length/lengthbus);
	let nyas_letter = 0; //what letter are we at?
	let dumbiter = 0; //loop that uses the NPL
	console.log("NPL:",nyas_per_letter)
	for(var i in list_of_nyaas){
		if(dumbiter >= nyas_per_letter){
			dumbiter = 0
			nyas_letter++
		}
		if(letters[Math.round(Math.max(nyas_letter/2,0))] == undefined){
			console.log("Done!")
			return
		}
		let nyaas = list_of_nyaas[i];
		if(nyas_letter % 2){ //divby2? (capital)
			if(dumbiter >= 1){
				nya2letter[letters[Math.round(Math.max(nyas_letter/2,0))].toUpperCase()].push(nyaas);
			}else{
				nya2letter[letters[Math.round(Math.max(nyas_letter/2,0))].toUpperCase()] = [nyaas];
			}
		}else{
			if(dumbiter >= 1){
				nya2letter[letters[Math.round(Math.max(nyas_letter/2,0))]].push(nyaas);
			}else{
				nya2letter[letters[Math.round(Math.max(nyas_letter/2,0))]] = [nyaas];
			}
		}
		dumbiter++;
	}
}
/**
 * This handles the decoding keys
 * @param {Array} shift 
 */
function getDefinitions(shift){
	var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	for(var i in letters){
		let str = letters[i];
		if(shift){
			//inset forloop h
		}
		for(var i in nya2letter[str]){
			let int = nya2letter[str][i];
			nyadefinition[int] = str; //"kyu":"a"
		}
		for(var i in nya2letter[str.toUpperCase()]){
			let int = nya2letter[str.toUpperCase()][i];
			nyadefinition[int] = str.toUpperCase(); //"kya":"A"
		}
	}
}

function string2nya(string){
	let stringy = string.split("");
	let out_dat = [];
	console.log(stringy)
	for(var i in stringy){
		let str = stringy[i];
		let outpush = "";
		console.log(str)
		try{
			outpush = nya2letter[str][Math.floor(Math.random()*nya2letter[str].length)];
		}catch(e){
			outpush = str; //things like ? or . or !
		}
		if(str == ","){
			outpush = "&comma;";
		}
		out_dat.push(outpush);
	}
	console.log(out_dat, "p2:",out_dat.toString().replace(/\,/g,"&nbsp;"));
	return out_dat.toString().replace(/\,/g,"&nbsp;");
}

function nya2string(nya, dedupe=true){
	let nyan = nya.split(" ");
	let out_dat = [];
	let better_out = "";
	for(var i in nyan){
		let str = nyan[i];
		let outpush = str;
		if(nyadefinition[str] != undefined){
			outpush = nyadefinition[str];
		}
		out_dat.push(outpush);
	}

	let spaces_last = false;
	for(var i in out_dat){
		let str = out_dat[i];
		if((str == undefined || !str) && dedupe && !spaces_last){
			better_out += "&nbsp;";
			spaces_last = true;
		}else{
			better_out += str;
			spaces_last = false;
		}
	}
	//console.log(better_out);
	return better_out;
}