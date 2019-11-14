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
	if(inputID.includes("T2C")){
		//console.log(input[0].value)
		returnDat = string2nya(input[0].value)
	}else if(inputID.includes("C2T")){
		returnDat = nya2string(input[0].value)
	}
	output.html(returnDat)
}