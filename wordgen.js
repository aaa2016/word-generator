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
	// Parse to arrays
	var arrC = inC.split(",");
	var arrV = inV.split(",");
	// Other settings
	var wordsToGen = document.forms["mainForm"].wordsNum.value; // Number of words
	var minSyl = 1; // TODO: document.forms["mainForm"].minSyl.value; // Min syllable count
	var maxSyl = document.forms["mainForm"].maxSyl.value; // Max syllable count
	
	// Check inputs are not blank
	if (arrC == "" || arrV == "") {
	
		document.getElementById("messageField").innerHTML = 
			"No letters provided";
	
	// Check numerical settings are numbers and not blank		
	} else if (isNaN(wordsToGen) || wordsToGen == "" || minSyl == "" || isNaN(minSyl)
		|| maxSyl == "" || isNaN(maxSyl)) {
	
		document.getElementById("messageField").innerHTML = 
			"Number of words or syllables to generate not specified";
				
	} else {
		
		// Generate list
		var wordList = genWords(wordsToGen,minSyl,maxSyl,arrC,arrV);
		
		// Output generated list
		document.forms["mainForm"].outWords.value = wordList;
		document.getElementById("messageField").innerHTML = 
			"Output provided "+wordsToGen+" words";
	
	}
}

/////////////////////////////////

/*
*	Generation algorithm
*/
function genWords(quant,minsyl,maxsyl,c,v) {

	var output = "";
	
	// Sample arrays, if needed
	//var c = ["p","t","k","b","d","g","f","s","h","v","z","m","n","r","l"];
	//var v = ["a","i","u","o","e","aa","ii","uu","oo","ee"];
	
	// TODO: add custom syllable structure selection
	
	// Loop for number of words required
	for (i=0;i<quant;i++){

		var newWord = "";
		//console.log("quant no: "+i);
		
		// Pick random number of syllables to generate, up to the specified max
		sylToMake = Math.floor(Math.random() * maxsyl)+1;
		//console.log("sylToMake: "+sylToMake);
		
		//Loop for syllables for a given word
		for (j=0;j<sylToMake;j++) {
			// Pick random C and random V from array
			var randC = c[Math.floor(Math.random() * c.length)];
			var randV = v[Math.floor(Math.random() * v.length)];
			newWord += randC+randV; // Appen to word
			
			// Hyphenate between syllables if user selects and not after last syllable
			if (j != sylToMake-1 && document.getElementById("hyphenate").checked) {
				newWord += "-";
			}
		}
		
		// TODO: optionally check for word uniqueness
		
		output += newWord+"\n"; // Add to output with line breaks after each word
	}
	
	return output;
	
}

/////////////////////////////////

/*
*	Provides example inputs
*/
function example() {
	document.forms["mainForm"].inC.value = 
		'p,t,k,b,d,g,f,s,h,v,z,q,m,n,r,l,ng,c,x,j,w';
	document.forms["mainForm"].inV.value = 
		'a,i,u,o,e,y,aa,ii,uu,oo,ee,yy,ai,au,oi,ou,ei,eu,ui,iu';
	document.forms["mainForm"].wordsNum.value = "20";
	document.forms["mainForm"].maxSyl.value = "4"; 
}

/////////////////////////////////

/*
*	Resets messages and text areas
*/
function reset() {

	document.forms["mainForm"].inC.value = "";
	document.forms["mainForm"].inV.value = "";
	document.forms["mainForm"].outWords.value = "";
	document.getElementById("messageField").innerHTML = "";	// TODO: doesn't work

}