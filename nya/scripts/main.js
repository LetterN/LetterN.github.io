getKey();
getDefinitions();

/**
 * 
 * @param {String} inputID 
 * @param {String} outputID 
 */
function convert(inputID, outputID){
	let input = $(inputID), output = $(outputID);
	let returnDat = "";
	if(!input[0].value){
		return
	}
	if(inputID.includes("T2C")){
		returnDat = string2nya(input[0].value);
	}else if(inputID.includes("C2T")){
		returnDat = nya2string(input[0].value);
	}
	output.append(returnDat+"<br>");
}
/**
 * 
 * @param {String} inputID 
 * @param {String} outputID 
 */
function getKeyDef(inputID, outputID){
	let input = $(inputID), output = $(outputID);
	let returnDat = "";
	if(inputID.includes("T2C")){
		returnDat = JSON.parse(input[0].value);
		//getKey();
	}else if(inputID.includes("C2T")){
		returnDat = JSON.parse(input[0].value);
		//getDefinitions();
	}
	output.append(returnDat+"<br>");
}	