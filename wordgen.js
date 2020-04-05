/*
*	TEMPLATE
*/
//function () {

	

//}

/////////////////////////////////

/*
*	Main function to generate words
*/
function generate() {
		
	// Clear messages
	document.getElementById("messageField").innerHTML = "";	
	
	// Gather inputs
	var letters = document.forms["mainForm"].inLetters.value;
	var struct = document.forms["mainForm"].inStructure.value;
	//window.alert("Letters:\n"+letters+"\nStructure:\n"+struct);
	var wordsToGen = document.forms["mainForm"].wordsNum.value;
	
	// Check inputs are not blank
	if (letters == "" || struct == "") {
	
		document.getElementById("messageField").innerHTML = 
			"No letters and/or structure provided";
			
	} else if (wordsToGen == NaN || wordsToGen == "") {
	
		document.getElementById("messageField").innerHTML = 
			"Number of words to generate not specified";
				
	} else {
			
		parseLetters(letters);
		parseStructure(struct);
	
		// Generate list
		var output = "";
		
		// TODO: actual generation algorithm
		// TODO: optionally check for word uniqueness
		for (i=0;i<wordsToGen;i++){
			output += Math.random()+"\n"; 
		}
		
		// Output generated list
		document.forms["mainForm"].outWords.value = output;
		document.getElementById("messageField").innerHTML = 
			"Output provided "+wordsToGen+" rows";
	
	}
}

/*
*	Parses input letter lists
*/
function parseLetters(input) {

	//window.alert("Parsing letters:\n"+input);
	
	for (i=0;i<input.length;i++) {
		//window.alert("i="+i+" is: "+input[i]);
	}
	
	//TODO: proper parsing of letter lists
	
}

/*
*	Parses input structure
*/
function parseStructure(input) {

	//window.alert("Parsing structure:\n"+input);

	for (i=0;i<input.length;i++) {
		//window.alert("i="+i+" is: "+input[i]);
	}
	
	//TODO: proper parsing of structures, including optional letters
	
}

/*
*	Provides example inputs
*/
function example() {
	document.forms["mainForm"].inLetters.value = "C:ptk,V:aiu";
	document.forms["mainForm"].inStructure.value = "CV";
}

/*
*	Resets messages and text areas
*/
function reset() {

	document.forms["mainForm"].inLetters.value = "";
	document.forms["mainForm"].inStructure.value = "";
	document.forms["mainForm"].outWords.value = "";
	document.getElementById("messageField").innerHTML = "";	

}