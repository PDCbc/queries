var fs 			= require("fs"); 
var expections 	= require("./exception.js")
var globals		= require("./globals.js")

module.exports = {

	/*
	* Gets supporting functions from the functions/ directory.
	* 
	* See: https://nodejs.org/api/fs.html for file system commands 
	*
	* Also writes the resulting string to a file in test/tmp/functions.js
	*
	* @return a string that is all of functions combined. 
	*/
	getSupportFunctions : function (){

		//check that the functions/ directory exists
		if(!fs.existsSync(globals.FUNCTION_DIR)){
			//error here. 	
			throw new exceptions.FileNotFoundException("functions/ directory not found."); 
		}

		//If we get here we know that the functions/ directory exists. 
		//Now we need to load: 
		// 1. Get the paths to all functions in functions/
		// 2. Get the strings from the files 
		// 3. Combine all of the strings. 
		// 4. Write to a file in test/tmp/

		//1. Read the functions/ dir
		var names = fs.readdirSync(globals.FUNCTION_DIR); 

		//2. and 3. together. 
		var new_string = ""; 
		var i = 0; 
		for(i=0; i < names.length; i++){
			new_string += "\n"; 
			new_string += "// -------------------------------\n" ; 
			new_string += "//  BEGIN "+globals.FUNCTION_DIR+names[i]+"\n"; 
			new_string += "// -------------------------------\n\n" ; 
			new_string += fs.readFileSync(globals.FUNCTION_DIR+names[i], "utf8"); 
			new_string += "\n"; 
			new_string += "// -------------------------------\n"; 
			new_string += "//  END "+globals.FUNCTION_DIR+names[i]+"\n"; 
			new_string += "// -------------------------------\n"; 
			new_string += "\n"; 
		}

		// 4. Write to new_string to a file so that we can use it many times. 
		fs.writeFileSync(globals.TMP_DIR+"functions.js", new_string); 

		return new_string; 
	}, 

	/*
	* This is a stupid fix for executing queries.....ugh
	* We need to combine the patient.js and map.js files together
	* as they have dependencies. 
	* This problem is due to poor architecture on the endpoint and hub
	* and is required to test the queries correctly. 
	* 
	* @param {string} map_path - the path the query map function to use
	* @param {string} api_path - the path to the patient api
	* @param {string} functions_path - path to the functions that the query depends on.
	*
	* @returns {string} the file path to the new test
	*
	* Steps: 
	*	1. create a new file in the test directory
	*	2. copy over the patientapi
	*	3. copy over the map function
	*	4. required module exports so that we can load it. 
	*	5. return the path to the new js file that can be used be
	*	 	by the map reduce. 
	*/
	createMapFunction : function (map_path, api_path, functions_path){

		//make a new directory to work in. 
		if (!fs.existsSync(globals.TEST_DIR+"tmp")){
			fs.mkdirSync(globals.TEST_DIR+"tmp"); 
		}

		//get the text in the map_path file. 
		var map = fs.readFileSync(map_path);
		
		//get the text in the api_path file.
		var api = fs.readFileSync(api_path);

		var functions = fs.readFileSync(functions_path); 

		var new_string = "";


		//need this for making the hQuery api visible globally. 
		new_string += "this.hQuery || (this.hQuery = {});\n"
		new_string += "var hQuery = this.hQuery\n"

		//now add the code the patient api. 
		new_string += api; 
		new_string += "//===============END OF PATIENT API \n\n\n"; 

		//now add the code for the helper functions 
		new_string += functions; 
		new_string += "//===============END OF FUNCTIONS \n\n\n"; 

		//now add the code for the query map function
		new_string += map; 
		new_string += "//===============END OF QUERY \n\n\n"; 

		//now make a new patient that is globally accessible so that
		//query has access. 
		//new_string += "var patient = new hQuery.Patient(this);\n"; 
		new_string += "var patient = null;\n"; 

		new_string += "function initMod(val){\n"
		new_string += "		patient = new hQuery.Patient(val.json);\n"
		new_string += "};\n"

		//add module exports 
		new_string += "module.exports = { initMod : initMod, map : map, hQuery : hQuery};\n";

		//remove the output file if it exists. 
		if(fs.existsSync(globals.TEST_DIR+"tmp/megafile.js")){
			fs.unlinkSync(globals.TEST_DIR+"tmp/megafile.js"); 
		}
		fs.writeFileSync(globals.TEST_DIR+"tmp/megafile.js", new_string); 

		return globals.TEST_DIR+"tmp/megafile.js"; 
	},

	/*
	* Shows the help message in resources/help_message.txt
	* then terminates the process. 
	*/
	showHelpMessage : function(){
		//print the help log. 
		try{
			console.log(fs.readFileSync(globals.TEST_DIR+'resources/help_message.txt', 'utf8'));
		}catch(e){
			try{
				console.log(fs.readFileSync(globals.TEST_DIR+'resources/help_message.txt', 'utf8'));
			}catch(e){
				console.log("Failed, please ensure all dependencies are in place."); 
			}
		}finally{
			process.exit(); 
		}
	}, 


	/*
	* Validate the the folder structure is correct
	* for running tests. Relative to the project root.
	*
	* Returns false if the folder structure is not correct, 
	* true otherwise. 
	*/
	checkFolderStructure : function(){
		if(!fs.existsSync(globals.QUERY_DIR)){
			console.log("No queries/ directory was found!");
			return false; 
		}
		if(!fs.existsSync(globals.TEST_DIR)){
			console.log("No test/ directory was found!");
			return false; 
		}
		if(!fs.existsSync(globals.FUNCTION_DIR)){
			console.log("No functions/ directory was found!");
			return false; 
		}
		if(!fs.existsSync(globals.DIRECTIVE_DIR)){
			console.log("No directives/ directory was found!"); 
			return false; 
		}
		if(!fs.existsSync(globals.TEST_DIR+"resources/")){
			console.log("No test/resources/ directory was found!");
			return false; 
		}
		if(!fs.existsSync(globals.DATA_DIR)){
			console.log("No test/data/ directory was found!");
			return false; 
		}
		if(!fs.existsSync(globals.VERIFY_DIR)){
			console.log("No test/verify/ directory was found!");
			return false; 
		}
		return true;
	}
}