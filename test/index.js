/**
* Testing tool for Query development 
*
* @author: Simon Diemert
* @date: 2015-04-15
*
* This tool is used to run tests for the queries that are meant to run 
* on the PDC's network. It takes as input: 
* 	- A query map function (and any helper functions).
*	- A json file of the patients (conformant to patient api) to run the query on
*	- A file containing a single function that should be run to check the results. 
*		- This function should be called verify(results) and take a single parameter
*			which is the array of results from the map/reduce on the patient data. 
*/


//node_modules required for the test framework. 
//the are found in the test/node_modules dir. 

var fs = require('fs'); 
var exceptions = require("./exception.js"); 
var parseArgs = require('minimist'); 

//these will throw an error on start up...something due to BSON
// the error is not a big problem, it just runs JS rather than C++ binaries
// for the BSON. This just results in a performance hit...not a big deal for testing....
var mockReduce = require('mock-reduce'); 
var mongoose = require('mongoose'); 


//some paths relative to the project root: 
var TEST_DIR = "test/"; 
var VERIFY_DIR = TEST_DIR+"verify/"; 
var DATA_DIR = TEST_DIR+"data/"; 
var QUERY_DIR = "queries/"
var FUNCTION_DIR = "functions/"
var TMP_DIR = TEST_DIR+"tmp/"


/*
* Gets supporting functions from the functions/ directory.
* 
* See: https://nodejs.org/api/fs.html for file system commands 
*
* Also writes the resulting string to a file in test/tmp/functions.js
*
* @return a string that is all of functions combined. 
*/
function getSupportFunctions(){

	//check that the functions/ directory exists
	if(!fs.existsSync(FUNCTION_DIR)){
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
	var names = fs.readdirSync(FUNCTION_DIR); 

	//2. and 3. together. 
	var new_string = ""; 
	var i = 0; 
	for(i=0; i < names.length; i++){
		new_string += "\n"; 
		new_string += "// -------------------------------\n" ; 
		new_string += "//  BEGIN "+FUNCTION_DIR+names[i]+"\n"; 
		new_string += "// -------------------------------\n\n" ; 
		new_string += fs.readFileSync(FUNCTION_DIR+names[i], "utf8"); 
		new_string += "\n"; 
		new_string += "// -------------------------------\n"; 
		new_string += "//  END "+FUNCTION_DIR+names[i]+"\n"; 
		new_string += "// -------------------------------\n"; 
		new_string += "\n"; 
	}

	// 4. Write to new_string to a file so that we can use it many times. 
	fs.writeFileSync(TMP_DIR+"functions.js", new_string); 

	return new_string; 
}

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
function createMapFunction(map_path, api_path, functions_path){

	//make a new directory to work in. 
	if (!fs.existsSync(TEST_DIR+"tmp")){
		fs.mkdirSync(TEST_DIR+"tmp"); 
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
	if(fs.existsSync(TEST_DIR+"tmp/megafile.js")){
		fs.unlinkSync(TEST_DIR+"tmp/megafile.js"); 
	}
	fs.writeFileSync(TEST_DIR+"tmp/megafile.js", new_string); 

	return TEST_DIR+"tmp/megafile.js"; 
}


/**
* Runs the query with test data and verifier specified by 
* the parameters. 
*
* @param queryMapPath - the path to the query file
* @param dataPath - the path to the data file for the query.
* @param verifierpath - path to the verifier function for the query. 
*/
function runQueryTest(queryMapPath, dataPath, verifierPath){
	
	//combine the patient api and query in a single file. 
	var megaModulePath = createMapFunction(queryMapPath, TEST_DIR+"resources/patient.js", 'test/tmp/functions.js'); 
	
	//need to delete the megafile.js from the cache as require() caches it. 
	delete require.cache[require.resolve("./tmp/megafile.js")]; 
	//open the single file with all of code for the query. 
	var megaModule = require("./tmp/megafile.js");  //needs to be WRT the test/ directory....this is a hack.

	//load the specified test data. 

	var testData = JSON.parse(fs.readFileSync(dataPath, "utf8")); 
	fs.writeFileSync("./test/tmp/data.json", JSON.stringify(testData,null)); 
	var testData = JSON.parse(fs.readFileSync("./test/tmp/data.json", "utf8")); 

	//get the verifier module. 
	//require(...) is relative to the location of the script, not where you run from...
	var verifier = require(verifierPath); 

	var patients = []; 

	var patient = null; 

	//loop through patients and create a patient object from the patient API
	for(var p in testData){
		patient = new megaModule.hQuery.Patient(testData[p]); 
		patients.push(patient); 
	}

	//create a blank Mongoose Schema for the MockReduce to operate on.
	var schema = mongoose.Schema({
		id: Number,
	});


	//set the methods for the Map/Reduce
	schema.statics.callsMapReduce = function() {
		var mapReduce = {
			map: function(){
				megaModule.initMod(this); 
				megaModule.map(this); 
			}, 
			reduce: function(key, values) {
				var s = 0; 
				values.forEach(function(d){
					s += d; 
				})
				return s; 
			}
		};
		return model.mapReduce(mapReduce);
	};

	//use MockReduce to spoof mongoDB and call the map/reduce
	mockReduce.install(mongoose); 
	mockReduce.setNextTestData(patients); 
	var model = mongoose.model('model', schema); 

	//call the map reduce using mock-reduce. 
	var result = model.callsMapReduce(); 

	//verify results using the user's defined 
	//verify function. 
	var accepted =  verifier.verify(result);	

	if(accepted == true){
		console.log("Test \""+queryMapPath+"\": PASSED"); 
	}else{
		console.log("Test \""+queryMapPath+"\": FAILED"); 
	}	

	//uninstall and delete records related to this test. 
	mockReduce.uninstall(); 
	delete mongoose.connection.models['model']; 
	return accepted;  
}

function setUpMockReduce(){
	mockReduce.install(mongoose);
}

/*
* 
* Test environment cleanup. 
*
*/ 
function cleanup(){

	//any cleanup for the test environment can go here....
}

/*
* Searches in predefined locations for
* a query, data, and verifier for this query. 
*
* THIS FUNCTION ASSUMES YOU RUN FROM THE PROJECT_ROOT! 
*
* Looks in for files that match the queryName arg: 
* 	- 'PROJECT_ROOT/queries/' for a query file.  
* 	- 'PROJECT_ROOT/test/data/' for a data file.  
* 	- 'PROJECT_ROOT/test/verify/' for a verifier file.  
* 
* @param {string} queryName - the name of the query to search for (without the .js extenion). 
* 
* @return a object containing the paths to the files in question. 
*/
function lookUpFiles(queryName){

	var paths = {}; 

	//remove any trailing whitespace. 
	queryName =	queryName.trim(); 

	//check that they have not entered a path with .js at the end. 
	if(queryName.match(/(\d|[a-zA-z]).js/i) != null){
		//remove the .js and use that. 
		queryName = queryName.substring(0, queryName.length - 3); 
	}

	//check that the query exists: 
	if(fs.existsSync(QUERY_DIR+queryName+".js")){
		//relative to directory the test is executed from. (PROJECT_ROOT) dir.  
		paths.queryMap = QUERY_DIR+queryName+".js"
	}else{
		throw new exceptions.FileNotFoundException("ERROR: Could not find a query file in PROJECT_ROOT/"+QUERY_DIR+" with name: "+queryName+".js"); 
		process.exit(); 
	}

	//check that the data exists: 
	if(fs.existsSync(DATA_DIR+queryName+".json")){
		//this path needs to be specified relative to the directory the test was executed from.
		paths.data = DATA_DIR+queryName+".json"
	}else{
		throw new exceptions.FileNotFoundException("ERROR: Could not find a test data file in PROJECT_ROOT/"+DATA_DIR+" with name: "+queryName+".json"); 
		process.exit(); 
	}

	//check that the verifier exists: 
	if(fs.existsSync(VERIFY_DIR+queryName+".js")){
		//since this looks things up via require we need to specify a path relative to 
		//THIS index.js file, not the dir it is executed from...
		paths.verify = "./verify/"+queryName+".js" 
	}else{
		throw new exceptions.FileNotFoundException("ERROR: Could not find a verify function file in PROJECT_ROOT/"+VERIFY_DIR+" with name: "+queryName+".js"); 
		process.exit(); 
	}

	paths.name = queryName; 

	return paths; 
}


/*
* Reads the cmd line arguments and returns an object 
* with paths to the  query, data, and verifier for the test. 
*
* @return an object containing paths to the query, data, and verifier. 
*/
function processArguments(actions){
	
	var argv = parseArgs(process.argv); 

	if(argv.help != null || argv.h != null){
		//print the help log. 
		console.log("==========================="); 
		console.log("Help Message: "); 
		console.log("---------------------------"); 
		console.log("Correct Usage:  "); 
		console.log("	js test.js --query <path to query> --data <path to data> --verify <path to verify>\n"); 
		console.log("	OR:  "); 
		console.log("	js test.js --run <query name>\n"); 
		console.log("Arguments: "); 
		console.log("	-q (--query)	Specify the path to the query you want to execute."); 
		console.log("	-d (--data)		Specify the path to the test data"); 
		console.log("	-v (--verify)	Specify the path to the verifier function for this query. This must be relative to the test/ directory!"); 
		console.log("	-r (--run)		Specify the name of a query, will cause the test framework to look"); 
		console.log("					in PROJECT_HOME/queries for a query to run."); 
		console.log("\nNotes: "); 
		console.log("	- If you are receving error messages about JavaScript not being "); 
		console.log("		able to open files try changing paths to:  './<path>'"); 
		console.log("==========================="); 
		process.exit(); 
	}

	//this is case where they give the name of the query
	// we need to search for the queries in the respective directories. 
	if(argv.run != null){
		return lookUpFiles(argv.run); 
	}else if(argv.r != null){
		return lookUpFiles(argv.r); 
	}

	if(argv.query != null){
		actions.queryMap = argv.query; 
	}else if(argv.q != null){
		actions.queryMap = argv.q; 
	}else{
		console.log("No query was specified, use --query <path to query> or -q <path to query> "); 
		console.log("Run: 'js test.js -h' for help message."); 
	}

	if(argv.data != null){
		actions.data = argv.data; 
	}else if (argv.d != null){
		actions.data = argv.d; 
	}else{
		console.log("No input data was specified, use --data <path to data> or -q <path to data> "); 
		console.log("Run: 'js test.js -h' for help message."); 
	}

	if(argv.verify != null){
		actions.verify = argv.verify; 
	}else if (argv.d != null){
		actions.verify = argv.v; 
	}else{
		console.log("No verifier function was specified, use --verify <path to verifier> or -v <path to verifier> "); 
		console.log("Run: 'js test.js -h' for help message."); 
	}

	return actions; 
}


/*
* Executes a batch of queries and tests.
* 
* Looks in queries/ for any files that match the names that match
* 	the pattern described by the name_pattern parameter. 
*
 See 
*
* @param {string} name_pattern  the regular expression pattern for the file names. 
									not passing this parameter results in all queries being matched. 
*/
function executeBatch(name_pattern){
	
	// 1. Get names of queries in queries/ dir. 
	// 2. Filter out queries that do not match the name_pattern.
	// 3. Strip off the ".js" so we can use it more flexibly. 
	// 4. Get paths to test data and verifer for each.
	// 5. Pass objects with specification to the executeQuery function.  


	//1. Get names of functions in queries/  dir 
	var names = fs.readdirSync(QUERY_DIR); 
	var tmp_name; 
	var paths = []; 
	var i = 0; 

	//2, 3, 4. 

	// If the pattern was undefined or empty string find all. 
	if(name_pattern == null || name_pattern == "" || 
			typeof(name_pattern) == 'undefined'){
		name_pattern = ".*"; 	
	}

	for(i = 0; i < names.length; i++){
		if(names[i].match(name_pattern)){
			if(fs.lstatSync(QUERY_DIR+names[i]).isDirectory()){
				console.log("WARNING: Ignoring "+QUERY_DIR+names[i]+" since it is a directory"); 
				continue; 
			}
			//filter out files that are not .js
			if(names[i].substring(names[i].length - 3, names[i].length) == ".js"){
				//get just query name, not the extension.
				tmp_name = names[i].substring(0, names[i].length - 3); 

				//look up the file names
				try{
					paths.push(lookUpFiles(tmp_name)); 
				}catch(e){
					console.log("WARNING: Could not file verifier or data for "+QUERY_DIR+names[i]); 
					continue; 
				}
			}else{
				console.log("WARNING: Ignoring "+QUERY_DIR+names[i]+" since it is not a javascript file."); 
			}
		} 
	}

	//when we get to here the paths array contains objects that have valid paths. 

	console.log("====================================");
	console.log("Beginning Execution of Tests"); 
	console.log("====================================");
	var result = false; 
	var passed = 0; 
	//loop through and execute each query 
	for(i = 0; i < paths.length ; i++){
		result = runQueryTest(paths[i].queryMap, paths[i].data, paths[i].verify); 
		if(result){
			passed+= 1; 
		}
	}

	console.log("====================================");
	console.log("Finished Tests..."); 
	console.log(paths.length+" test were run."); 
	console.log(passed+" passed."); 
	console.log("====================================");

	process.exit(); 
}

//main function, everything starts here.
function main(){

	console.log("----------------------------"); 
	console.log("Starting....");
	console.log("----------------------------"); 

	//pull in helper functions.

	getSupportFunctions();  

	//executeBatch(); 

	var actions = processArguments(); 

	//--------IF WE GET HERE WE HAVE FINISHED PARSING CMD LINE -------

	//Run the test for the given inputs. 
	runQueryTest(actions.queryMap, actions.data, actions.verify); 

	//clean up the environment. 
	cleanup(); 

	//print finished message
	console.log("----------------------------"); 
	console.log("Finished.");
	console.log("----------------------------"); 
}

//first action in the script, call main. 
main(); 
