/**
* Testing tool for Query development 
*
* @author: Simon Diemert
* @date: 2015-04-24
*
* This tool is used to run tests for the queries that are meant to run 
* on the PDC's network. 
*/


//node_modules required for the test framework. 
//the are found in the test/node_modules dir. 

var exceptions 		= require("./exception.js"); 
var util 			= require("./util.js"); 
var globals			= require("./globals.js")

var parseArgs 		= require('minimist'); 
var fs 				= require('fs'); 

//these will throw an error on start up...something due to BSON
// the error is not a big problem, it just runs JS rather than C++ binaries
// for the BSON. This just results in a performance hit...not a big deal for testing....
var mockReduce 		= require('mock-reduce'); 
var mongoose 		= require('mongoose'); 

/**
* Runs the query with test data and verifier specified by 
* the parameters. 
*
* @param queryMapPath - the path to the file that contains the map function. 
* @param queryReducePath - the path to the file that contains the reduce function
* @param dataPath - the path to the data file for the query.
* @param verifierpath - path to the verifier function for the query. (must be relative to test/ directory)
* @param processorPath - path to the data pre-processor file for this data set (must be relative to test/ directory) 
*/
function runQueryTest(queryMapPath, queryReducePath, dataPath, verifierPath, processorPath){
	
	//combine the patient api and query in a single file. 
	var megaModulePath = util.createMapFunction(queryMapPath, globals.TEST_DIR+"resources/patient.js", globals.TMP_DIR+'functions.js'); 
	
	try{
		//need to delete the megafile.js from the cache as require() caches it. 
		delete require.cache[require.resolve("./tmp/megafile.js")]; 
		//open the single file with all of code for the query. 
		var megaModule = require("./tmp/megafile.js");  //needs to be WRT the test/ directory....this is a hack.
	}catch(e){
		return null; 
	}
	

	//load the specified test data. 
	try{
		var testData = JSON.parse(fs.readFileSync(dataPath, "utf8")); 
	}catch(e){
		return null; 
	}

	//load the data pre-processor and execute the pre-processor
	try{
		if(processorPath != null && processorPath != undefined){
			//this will massage the data in place. 
			testData = require(processorPath).preProcess(testData); 
		}
		 
	}catch(e){
		return null; 	
	}

	//get the verifier module. 
	//require(...) is relative to the location of the script, not where you run from...
	try{
		var verifier = require(verifierPath); 
	}catch(e){
		return null; 
	}

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

	//uninstall and delete records related to this test. 
	mockReduce.uninstall(); 
	delete mongoose.connection.models['model']; 
	return accepted;  
}

/*
* Setup the test environment. 
*/
function setUpMockReduce(){
	mockReduce.install(mongoose);
}

/*
* Test environment cleanup. 
*/ 
function cleanup(){

	//any cleanup for the test environment can go here....
}

/*
* Read in command line args and determine how to proceed. 
* Store any relevant information in an object that is passed to into the function.
*
* This function can be extended to support more behaviours based on commandline args. 
*
* @return an the action to take (batch or null) based on the args. 
*/
function processArguments(actions){
	
	var tmp_actions = {}; 
	var return_action = null; 

	var argv = parseArgs(process.argv); 

	if(argv.help != null || argv.h != null){
		util.showHelpMessage(); 	
	}

	//check if they input a pattern for the queries.
	if(argv._.length >= 3){

		if(argv._[2] === "queries"){
			if(argv._.length >= 4 ){
				tmp_actions.pattern = argv._[3]; 
			}else{
				tmp_actions.pattern = null; 
			}
			return_action = "queries"; 
		}else if(argv._[2] === "functions"){
			if(argv._.length >= 4 ){
				tmp_actions.pattern = argv._[3]; 
			}else{
				tmp_actions.pattern = null; 
			}	
			return_action = "functions"; 
		}else{
			return_action = "batch"; 
			tmp_actions.pattern = argv._[2]; 
		}
	}else{
		//they did not give a pattern, so we look for other options.	
		return_action = null; 
	}

	if(argv.q != null && argv.q != undefined){
		globals.quiet = true; 
	}else{
		globals.quiet - false; 
	}

	actions.pattern = tmp_actions.pattern; 

	return return_action; 
}

/*
* Execute all queries as per directives in the directives/ dir. 
* 
* @param pattern (string) - a string to match on file names of the directives.
* 							defaults to all directives if null or undefined. 
*
* @return (object) - contains the following fields: 
* 		+ result (boolean), true if all tests passed, false otherwise. 
*		+ test_count (integer), number of tests that were run. 
* 		+ passed (integer), of those tests run, this number passed.
* 		+ error_count (integer), number of tests that did not complete due to error.
*/
function executeBatch(pattern){

	if(pattern == null || pattern == undefined){
		pattern = ".*"; 
	}

	//1. Get files in directive/ directory that match the pattern
	//2. Open files and check execute the tests according to the file. 

	var files 		= fs.readdirSync(globals.DIRECTIVE_DIR); 
	var test_count 	= 0;
	var directive 	= null; 
	var fail_count 	= 0; 
	var error_count = 0; 
	var pass_count 	= 0; 
	var result 		= null; 

	for(i in files){
		//only look at json files.
		if(!files[i].match(".*.json")){
			continue; 	
		}
		if(!files[i].match(pattern)){
			//this file doesn't match the pattern, ignore it. 
			continue; 
		}	

		//if we get to here we know we have a directive file we want to try 
		// to execute. 

		try{
			directive = JSON.parse(fs.readFileSync(globals.DIRECTIVE_DIR+files[i], "utf8"));
		}catch(e){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" contains invalid json, ignoring this directive.");
			continue; 
		}

		//Check to find directives that only apply to queries. 
		if(directive.type !== undefined && directive.type != "QUERY"){
			continue; 
		}

		//check that fields in the directive are defined: 
		if( directive.type === undefined ||
			directive.name === undefined || 
			directive.map === undefined || 
			directive.reduce === undefined || 
			directive.functions === undefined ||
			directive.qualified_by === undefined ||
			directive.tests === undefined 
		){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" does not all of the fields required for a complete directive, ignoring this directive."); 
			continue; 
		}



		//if we get here we know that the directive is well formed
		// now we can go and execute each test. 

		//check that the query file exists: 
		if(!fs.existsSync(directive.map)){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" indicates that a map function is at: "+directive.map+" but none was found, ignoring this directive.")
			continue; 
		}

		if(!fs.existsSync(directive.reduce)){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" indicates that a reduce function is at: "+directive.reduce+" but none was found, ignoring this directive.")
			continue; 
		}

		testLoop : for(t in directive.tests){

			//check that each file required for the test exists: 
			if(!fs.existsSync(directive.tests[t].data)){
				if(!globals.quiet) console.log("WARNING:\ttest '"+directive.tests[t].name+"' for '"+directive.name+"' indicates that test data is in '"+directive.tests[t].data+"' but this file was not found. Ignoring this test."); 
				continue testLoop; 
			}

			if(!fs.existsSync(globals.TEST_DIR+directive.tests[t].verifier)){
				if(!globals.quiet) console.log("WARNING:\ttest '"+directive.tests[t].name+"' for '"+directive.name+"' indicates that verifier is in '"+directive.tests[t].verifier+"' but this file was not found. Ignoring this test."); 
				continue testLoop; 
			}

			if(directive.tests[t].data_processor != undefined && directive.tests[t].data_processor != null ){
				if(!fs.existsSync("test/"+directive.tests[t].data_processor)){
					if(!globals.quiet) console.log("WARNING:\ttest '"+directive.tests[t].name+"' for '"+directive.name+"' indicates that data_processor is in '"+globals.TEST_DIR+directive.tests[t].data_processor+"' but this file was not found. Ignoring this test."); 
					continue testLoop; 
				}
			}

			//if we get to here, we know that all files exist.
			result = runQueryTest(directive.map, directive.reduce, directive.tests[t].data, directive.tests[t].verifier, directive.tests[t].data_processor); 

			if(result == null){
				if(!globals.quiet) console.log("ERROR:\t test '"+directive.tests[t].name+"' for '"+directive.name+"' failed to complete.");
				error_count += 1; 
			}else{
				if(result.result == true){
					if(!globals.quiet) console.log(directive.name.substring(0,23)+"\t"+directive.tests[t].name.substring(0, 25)+"\tPASSED");
					pass_count += 1; 
				}else{
					if(!globals.quiet) console.log(directive.name.substring(0,23)+"\t"+directive.tests[t].name.substring(0, 25)+"\tFAILED\t message: "+result.message);
					fail_count += 1; 
				}
			}
			test_count += 1; 
		}
	}
	 
	if(test_count == pass_count){
		return {result :true, total : test_count, passed : pass_count, error_count : error_count}; 
	}else{
		return {result :false, total : test_count, passed : pass_count, error_count : error_count}; 
	}
}


/*
* Runs the tests for a particular library_function. Reports the number of tests, passed tests, and errors.
* Executes only functions within the module that being with "test", for example: "testFooBar" would be executed.
* 	"fooBarTest" would not be executed.  
*
* @param testPath (string) - the path to the module that contains the series of unit tests to execute. 
* @param testName (string) - the name of the test for displaying in console output. 
*
* @return (object) - an object with the following fields: 
* 	- result (boolean) - true if all tests passed, false otherwise.
* 	- count (int) - the total number of tests executed (or attempted to execute, includes failed tests).
* 	- passed (int) - the number of tests that passed.
* 	- error (int) - the number of errors that were thrown or created during the tests (not the same as a failed test.)
*/
function runFunctionTests(testPath, testName){

	if(testPath === undefined){
		return null; 
	}

	//1. build a module that contains all library_functions, patient api and all function tests. Make the function tests publicly accessible.
	//2. require the module
	//3. loop through and execute each test. Compile results and return them. 

	var result = {result : true, count : 0, passed : 0, error: 0}
	var tmp = {}; 

	try{
		//combine the patient api and query in a single file. 
		var megaModulePath = util.createFunctionTestModule(globals.TEST_DIR+testPath, globals.TMP_DIR+'functions.js');
		//need to delete the megafile.js from the cache as require() caches it. 
		delete require.cache[require.resolve("./tmp/megafile.js")]; 
		//open the single file with all of code for the query. 
		var megaMod = require("./tmp/megafile.js");  //needs to be WRT the test/ directory....this is a hack.
	}catch(e){
		return null; 
	}

	//loop through the publicly available functions and run them, these should only 
	// be the tests unless something else has been made public. 
	for(f in megaMod){
		//check if the 
		if(!f.match("test.*")){
			continue; 
		} 
		try{
			tmp = megaMod[f](); 
			if(tmp.result){
				if(!globals.quiet) console.log(testName.substring(0,25)+" "+f.substring(0, 25)+":\t PASSED"); 
				result.passed += 1; 
			}else{
				if(!globals.quiet) console.log(testName.substring(0, 25)+" "+f.substring(0, 25)+":\t FAILED, message:"+tmp.message); 
				result.result = false; 
			} 
		}catch(e){
			if(!globals.quiet) {
				console.log(f+"from "+testPath+" caused an error! Ignoring this test result."); 
			}
			result.error+= 1; 	
			result.result = false; 
		}
		result.count += 1; 
	}

	return result; 
}

/*
* Tests all library_functions that have directives in the directives/ directory 
*	that file names that match the pattern provided as a parameter. 
* Filters out incomplete directives or those that aren't valid json. 
* 
* @param pattern (string) - a regex string to match against function names. If null or undefined defaults to all functions.
*
* @return (object) - an object contain the results of running the, fields include: 
* 	- result (boolean) - true if ALL tests passed, false otherwise
* 	- total (int) - the number of tests that were executed.
*	- passed (int) - the number of tests that passed. 
*	- error_count (int) - the number of tests the generated errors and did not complete (not the same as a failed test.)
*/
function testFunctions(pattern){

	pattern = pattern || ".*"; 

	var files 		= fs.readdirSync(globals.DIRECTIVE_DIR); 
	var directive 	= null; 
	var result 		=  {result:false, total : 0, passed : 0, error_count : 0}; 
	var functionResult = {};

	for(var i = 0; i < files.length; i++){
		//only look at json files.
		if(!files[i].match(".*.json")){
			continue; 	
		}
		if(!files[i].match(pattern)){
			//this file doesn't match the pattern, ignore it. 
			continue; 
		}	

		//if we get to here we know we have a directive file we want to try 
		// to execute. 

		try{
			directive = JSON.parse(fs.readFileSync(globals.DIRECTIVE_DIR+files[i], "utf8"));
		}catch(e){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" contains invalid json, ignoring this directive.");
			continue; 
		}

		if(directive.type !== undefined && directive.type !== "FUNCTION"){
			continue; 
		}

		if(
			directive.name === undefined || 
			directive.path === undefined ||
			directive.test === undefined 
		){
			if(!globals.quiet) console.log("WARNING:\tdirective in "+files[i]+" does not all of the fields required for a complete directive, ignoring this directive."); 
			continue; 
		}

	 	functionResult = runFunctionTests(directive.test, directive.name); 

	 	if(result === null){

	 	}else{
	 		result.total += functionResult.count; 	
	 		result.passed += functionResult.passed;
	 		result.error_count += functionResult.error; 
	 	}
	}

	if(result.total === result.passed){
		result.result = true; 	
		return result; 
	}else{
		result.result = false; 
		return result; 
	}
}


//main function, everything starts here.
function main(){

	var paths = {}; 
	var action = processArguments(paths); 

	if(!globals.quiet){
		console.log("----------------------------"); 
		console.log("Tests Starting....");
		console.log("----------------------------"); 
	}
	

	//check that the folder structure is setup. 
	if(!util.checkFolderStructure()){
		process.exit(); 
	}

	//pull in helper functions.
	util.getSupportFunctions();  

	var result = {}; 

	switch(action){
		case 'batch':
			console.log("batch testing queries and functions...")
			var r1 = executeBatch(paths.pattern); 	
			var r2 = testFunctions(); 
			result.passed = r1.passed + r2.passed; 
			result.error_count = r1.error_count + r2.error_count; 
			result.total = r1.total + r2.total; 
			result.result = r1.result && r2.result; 
			break; 
		case "queries":
			console.log("testing queries...")
			result = executeBatch(paths.pattern); 
			break; 
		case "functions":
			console.log("testing functions...")
			result = testFunctions(paths.pattern); 
			break; 
		default:
			console.log("testing queries and functions...")
			var r1 = executeBatch(paths.pattern); 	
			var r2 = testFunctions(); 
			result.passed = r1.passed + r2.passed; 
			result.error_count = r1.error_count + r2.error_count; 
			result.total = r1.total + r2.total; 
			result.result = r1.result && r2.result; 
			break; 
	}

	console.log("-------------------------"); 
	console.log("tests run:\t\t"+result.total); 
	console.log("tests passed:\t\t"+result.passed); 
	console.log("tests incomplete:\t"+result.error_count); 

	//clean up the environment. 
	cleanup(); 

	if(!globals.quiet){
		//print finished message
		console.log("----------------------------"); 
		console.log("Tests Finished.");
		console.log("----------------------------"); 

	}
	
	if(result.result){
		process.exit(0);  //the result was true, so return 0 "success" to the OS.
	}else{
		process.exit(1);  //a failure code.
	}
}

//first action in the script, call main. 
main(); 
