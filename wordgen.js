/*
*	Main function to generate words
*/
function generate() {
		
	// Clear messages and output
	document.getElementById("messageField").innerHTML = "";	
	document.forms["mainForm"].outWords.value = "";
	
	// Gather inputs (should be comma-separated)
	var inC = document.forms["mainForm"].inC.value;
	var inV = document.forms["mainForm"].inV.value;
	var inI = document.forms["mainForm"].inI.value;
	var inM = document.forms["mainForm"].inM.value;
	var inF = document.forms["mainForm"].inF.value;
	var structure = document.forms["mainForm"].struct.value;
	
	// TODO: trim whitespace in inputs
	
	// Parse to arrays
	var arrC = inC.split(",");
	var arrV = inV.split(",");
	var arrI = inI.split(",");
	var arrM = inM.split(",");
	var arrF = inF.split(",");
	// Other settings:
	// Number of words
		var wordsToGen = parseInt(document.forms["mainForm"].wordsNum.value);
	var minSyl = document.forms["mainForm"].minSyl.value; // Min syllable count
	var maxSyl = document.forms["mainForm"].maxSyl.value; // Max syllable count
	
	// Check inputs are not blank
	// TODO: check for empty letters if used in structure
	if (structure == "") {
	
		document.getElementById("messageField").innerHTML = 
			"No syllable structure provided";
	
	// Check numerical settings are numbers and not blank		
	} else if (isNaN(wordsToGen) || wordsToGen == "" || minSyl == "" || isNaN(minSyl)
		|| maxSyl == "" || isNaN(maxSyl)) {
	
		document.getElementById("messageField").innerHTML = 
			"Number of words or syllables to generate not specified";
				
	} else {
		
		// Generate list by calling algorithm function
		var wordList = 
			genWords(structure,wordsToGen,minSyl,maxSyl,arrC,arrV,arrI,arrM,arrF);
		
		// Output generated list
		if (wordList != "") {
			document.forms["mainForm"].outWords.value = wordList;
			//console.log("wordsToGen: "+wordsToGen);
			
			// Adjust size of output text area
			if (wordsToGen>4 && wordsToGen<20) {
				document.getElementById("outWords").rows = (wordsToGen+1);
			} else if (wordsToGen>=20) {
				document.getElementById("outWords").rows = 21;
			}
			// Show success message
			document.getElementById("messageField").innerHTML = 
				"Output provided "+wordsToGen+" words";
		} else {
			// If function does not output, show error
			document.getElementById("messageField").innerHTML = 
				"Error occurred - could not generate output";
		}
	
	}
}

/////////////////////////////////

/*
*	Generation algorithm
*/
function genWords(struct,quant,minsyl,maxsyl,c,v,i,m,f) {

	var output = "";
	
	//console.log("Structure: "+struct);
	
	// Sample arrays, if needed
	//var c = ["p","t","k","b","d","g","f","s","h","v","z","m","n","r","l"];
	//var v = ["a","i","u","o","e","aa","ii","uu","oo","ee"];
	
	// TODO: add custom syllable structure selection using letters provided by the user
	//			rather than just the C, V, I, M, F
	// TODO: optional letters (using bracket notation?)
	
	// Gather list of forbidden clusters
	var disallowCombs = document.forms["mainForm"].restrictedLetters.value;
	var arrDisallow = [];
	if (disallowCombs != "") {
		arrDisallow = disallowCombs.split(",");
	}
	
	// Initiate counter for infinite loop protection during duplicate checking
	var infLoopCounter = 0;
	
	// Loop for number of words required
	for (x=0;x<quant;x++){

		var newWord = "";
		//console.log("quant no: "+i);
	
		// Flag for words containing forbidden clusters
		var doNotAdd = false;
		
		// Choose number of syllables to create
		var sylToMake = 0;
		while (sylToMake<minsyl) {
			// Pick random number of syllables to generate, up to the specified max
			// If lower than minimum, generate again (while)
			sylToMake = Math.floor(Math.random() * maxsyl)+1;
			//console.log("sylToMake: "+sylToMake);
		}
		
		// Loop for syllables for a given word
		for (j=0;j<sylToMake;j++) {
			
			var newSyl = "";
			var rand = "";
			
			// Loop for structure
			for (k=0;k<struct.length;k++) {
				switch (struct[k]) {
					case "C": // Pick random C from array
						rand = c[Math.floor(Math.random() * c.length)];
						break;
					case "V": // Pick random V from array
						rand = v[Math.floor(Math.random() * v.length)];
						break;
					case "I": // Pick random V from array
						rand = i[Math.floor(Math.random() * i.length)];
						break;
					case "M": // Pick random V from array
						rand = m[Math.floor(Math.random() * m.length)];
						break;
					case "F": // Pick random V from array
						rand = f[Math.floor(Math.random() * f.length)];
						break;
					default: // Otherwise use whatever letter the user provides
						rand = struct[k];
						break;
				}
				newWord += rand; // Append new letter to syllable
			} // k loop
			
			newWord += newSyl; // Append new syllable to word
			
			// Hyphenate between syllables if user selects and not after last syllable
			// Choose between hyphen or custom delimiter
			if (j != sylToMake-1 && document.getElementById("hyphenate").checked) {
				if (document.forms["mainForm"].sylDelimiter.value == "hyphen") {
					newWord += "-";
				} else if (document.forms["mainForm"].sylDelimiter.value == "custom") {
					var customSylDelim = 
						document.forms["mainForm"].customSylDelimiter.value;
					newWord += customSylDelim;
				}	
			}
		} // j loop
		
		// Check against list of forbidden clusters		
		for (m=0;m<arrDisallow.length;m++) {
			if (newWord.includes(arrDisallow[m])) {
				//console.log("Disallowed combination found: "+arrDisallow[m]+
				//	" in word: "+newWord);
				doNotAdd = true;
			}	
		} // m loop
		
		// Check for word uniqueness, if user opts in
		// Check if generated word is already in output
		// TODO: improve word boundary detection (currently not foolproof)
		if ( ( document.getElementById("noduplicates").checked && 
			( output.includes("\n"+newWord) || output.includes("\n"+newWord) ||
			output.includes("\t"+newWord) ) ) || doNotAdd) { 
			
			//console.log("Duplicate word found: "+newWord+" in : \n"+output);
			
			// If duplicate found, do not add to output and run loop again
			// With small letter lists and many words to generate, this could
			//		lead to an infinite loop - increment counter to track this
			infLoopCounter++;
			// Check if high number of duplicates found
			if (infLoopCounter<1000) {
				x--;
			} else {
				// Return no output (will lead to error message)
				return "###";
			}
			
		} else {
			
			// Add to output with delimiter after each word, not after last word
			output += addDelimiter(x,quant,newWord);
		}
	
	} // x loop (used to be i loop until 'i' was used for the category 'I')
	
	return output;
	
}

/////////////////////////////////

/*
*	Adds word delimiter to generated word
*		'in' is the word to be 
*		'q' is the number of words to generate - delimiter isn't added after the last word
*		'curr' is the number of the current word being generated
*/
function addDelimiter(curr,q,inWord) {

	//console.log("addDelimiter running on: "+inWord);
	var out = "";
	
	if (curr<(q-1)) {
		switch (document.forms["mainForm"].delimiter.value) {
			case "newLine":
				out = inWord+"\n";
				break;
			case "comma":
				out = inWord+",";
				break;
			case "tab":
				out = inWord+"\t";
				break;
			case "custom":
				var customDelim = document.forms["mainForm"].customDelimiter.value;
				out = inWord+customDelim;
				break;
			default:
				out = inWord+"\n";
				break;
		}
	} else {
		out = inWord;
	}
	
	return out;
}

/////////////////////////////////

/*
*	
*/

function checkForMatches (toCheck,toCheckFor) {

	var out = "";
	
	return out;

}

/////////////////////////////////

/*
*	Provides example inputs
*/
function example(lang) {
	reset();
	document.forms["mainForm"].wordsNum.value = "15";
	document.forms["mainForm"].minSyl.value = "1"; 
	document.forms["mainForm"].maxSyl.value = "3"; 
	//console.log("Example lang chosen: "+lang);
	switch (lang) {
		case "jp":
			document.forms["mainForm"].inC.value = 'k,s,t,n,h,w,r,y,';
			document.forms["mainForm"].inV.value = 'a,i,u,o,e';
			document.forms["mainForm"].inI.value = '';
			document.forms["mainForm"].inM.value = '';
			document.forms["mainForm"].inF.value = 'n,';
			document.forms["mainForm"].struct.value = "CVF"; 
			document.forms["mainForm"].restrictedLetters.value = "wi,we,wu,yi,ye"; 
			break;
		case "tokipona":
			document.forms["mainForm"].inC.value = 'p,t,k,s,m,n,l,j,w,';
			document.forms["mainForm"].inV.value = 'a,i,u,o,e';
			document.forms["mainForm"].inI.value = '';
			document.forms["mainForm"].inM.value = '';
			document.forms["mainForm"].inF.value = 'n,m,';
			document.forms["mainForm"].struct.value = "CVF";
			document.forms["mainForm"].restrictedLetters.value = "mm,nn,mn,nm,ji,wu,wo,ti"; 
			break;
		default:
			break;
	}
	generate();
}

/////////////////////////////////

/*
*	Resets messages and text areas
*/
function reset() {

	document.forms["mainForm"].inC.value = "";
	document.forms["mainForm"].inV.value = "";
	document.forms["mainForm"].inI.value = "";
	document.forms["mainForm"].inM.value = "";
	document.forms["mainForm"].inF.value = "";
	document.forms["mainForm"].outWords.value = "";
	document.getElementById("outWords").rows = 5; // TODO: doesn't work
	document.getElementById("messageField").innerHTML = "";	// TODO: doesn't work

}

/////////////////////////////////