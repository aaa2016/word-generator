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
		
	// Clear messages and output
	document.getElementById("messageField").innerHTML = "";	
	document.forms["mainForm"].outWords.value = "";
	
	// Gather inputs (should be comma-separated)
	var inC = document.forms["mainForm"].inC.value;
	var inV = document.forms["mainForm"].inV.value;
	var structure = document.forms["mainForm"].struct.value;
	
	// TODO: trim whitespace
	
	// Parse to arrays
	var arrC = inC.split(",");
	var arrV = inV.split(",");
	// Other settings
	// Number of words
	var wordsToGen = parseInt(document.forms["mainForm"].wordsNum.value);
	var minSyl = document.forms["mainForm"].minSyl.value; // Min syllable count
	var maxSyl = document.forms["mainForm"].maxSyl.value; // Max syllable count
	
	// Check inputs are not blank
	if (arrC == "" || arrV == "" || structure == "") {
	
		document.getElementById("messageField").innerHTML = 
			"No letters and/or syllable structure provided";
	
	// Check numerical settings are numbers and not blank		
	} else if (isNaN(wordsToGen) || wordsToGen == "" || minSyl == "" || isNaN(minSyl)
		|| maxSyl == "" || isNaN(maxSyl)) {
	
		document.getElementById("messageField").innerHTML = 
			"Number of words or syllables to generate not specified";
				
	} else {
		
		// Generate list
		var wordList = genWords(structure,wordsToGen,minSyl,maxSyl,arrC,arrV);
		
		// Output generated list
		if (wordList != "") {
			document.forms["mainForm"].outWords.value = wordList;
			console.log("wordsToGen: "+wordsToGen);
			
			// Adjust size of output text area
			if (wordsToGen>4 && wordsToGen<20) {
				document.getElementById("outWords").rows = (wordsToGen+1);
			} else if (wordsToGen>=20) {
				document.getElementById("outWords").rows = 21;
			}
			document.getElementById("messageField").innerHTML = 
				"Output provided "+wordsToGen+" words";
		} else {
			document.getElementById("messageField").innerHTML = 
				"Error occurred - could not generate output";
		}
	
	}
}

/////////////////////////////////

/*
*	Generation algorithm
*/
function genWords(struct,quant,minsyl,maxsyl,c,v) {

	var output = "";
	
	//console.log("Structure: "+struct);
	
	// Sample arrays, if needed
	//var c = ["p","t","k","b","d","g","f","s","h","v","z","m","n","r","l"];
	//var v = ["a","i","u","o","e","aa","ii","uu","oo","ee"];
	
	// TODO: add custom syllable structure selection beyond C and V
	
	// Loop for number of words required
	for (i=0;i<quant;i++){

		var newWord = "";
		//console.log("quant no: "+i);
		
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
			
			// Loop for structure
			for (k=0;k<struct.length;k++) {
				switch (struct[k]) {
					case "C": // Pick random C from array
						var rand = c[Math.floor(Math.random() * c.length)];
						break;
					case "V": // Pick random V from array
						var rand = v[Math.floor(Math.random() * v.length)];
						break;
					default:
						// If anything other than C/V exit whole function (empty return)
						document.getElementById("messageField").innerHTML = 
							"Structure contains values other than C or V";
								// TODO: message doesn't work
						console.log("Structure contains values other than C or V");
						return "";
				}
				newWord += rand; // Append new letter to syllable
			}
			
			newWord += newSyl; // Append new syllable to word
			
			// Hyphenate between syllables if user selects and not after last syllable
			if (j != sylToMake-1 && document.getElementById("hyphenate").checked) {
				newWord += "-";
			}
		}
		
		// TODO: optionally check for word uniqueness
		
		// TODO: give user option to select different output delimiters
		
		output += newWord+"\n"; // Add to output with delimiter after each word
	}
	
	return output;
	
}

/////////////////////////////////

/*
*	Provides example inputs
*/
function example() {
	reset();
	document.forms["mainForm"].inC.value = 
		'p,t,k,b,d,g,f,s,h,v,z,q,m,n,r,l,ng,c,x,j,w';
	document.forms["mainForm"].inV.value = 
		'a,i,u,o,e,y,aa,ii,uu,oo,ee,yy,ai,au,oi,ou,ei,eu,ui,iu';
	document.forms["mainForm"].wordsNum.value = "20";
	document.forms["mainForm"].minSyl.value = "1"; 
	document.forms["mainForm"].maxSyl.value = "3"; 
	document.forms["mainForm"].struct.value = "CV"; 
}

/////////////////////////////////

/*
*	Resets messages and text areas
*/
function reset() {

	document.forms["mainForm"].inC.value = "";
	document.forms["mainForm"].inV.value = "";
	document.forms["mainForm"].outWords.value = "";
	document.getElementById("outWords").rows = 5; // TODO: doesn't work
	document.getElementById("messageField").innerHTML = "";	// TODO: doesn't work

}