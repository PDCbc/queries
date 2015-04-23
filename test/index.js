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
* @param queryMapPath - the path to the query file
* @param dataPath - the path to the data file for the query.
* @param verifierpath - path to the verifier function for the query. 
*/
function runQueryTest(queryMapPath, queryReducePath, dataPath, verifierPath){
	
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
	/*
	fs.writeFileSync(globals.TMP_DIR+"data.json", JSON.stringify(testData,null)); 
	var testData = JSON.parse(fs.readFileSync(globals.TMP_DIR+"data.json", "utf8")); 
	*/

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
* Reads the cmd line arguments and returns an object 
* with paths to the  query, data, and verifier for the test. 
*
* @return an the action to take (all, run, null) based on the args. 
*		also writes paths to files from the arguments into the actions parameter that is passed in. 
*/
function processArguments(actions){
	
	var tmp_actions = {}; 
	var return_action = null; 

	var argv = parseArgs(process.argv); 

	if(argv.help != null || argv.h != null){
		util.showHelpMessage(); 	
	}

	//check if they input a pattern for the queries.
	if(argv._.length == 3){
		return_action = "batch"; 
		tmp_actions.pattern = argv._[2]; 
	}else{
		//they did not give a pattern, so we look for other options.	
		return_action = null; 
	}

	actions.pattern = tmp_actions.pattern; 

	return return_action; 
}

/*
*
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
			console.log("WARNING:\tdirective in "+files[i]+" contains invalid json, ignoring this directive.");
			continue; 
		}

		//check that fields in the directive are defined: 
		if( directive.name === undefined || 
			directive.map === undefined || 
			directive.reduce === undefined || 
			directive.functions === undefined ||
			directive.qualified_by === undefined ||
			directive.tests === undefined 
		){
			console.log("WARNING:\tdirective in "+files[i]+" does not all of the fields required for a complete directive, ignoring this directive."); 
			continue; 
		}

		//if we get here we know that the directive is well formed
		// now we can go and execute each test. 

		//check that the query file exists: 
		if(!fs.existsSync(directive.map)){
			console.log("WARNING:\tdirective in "+files[i]+" indicates that a map function is at: "+directive.map+" but none was found, ignoring this directive.")
			continue; 
		}

		if(!fs.existsSync(directive.reduce)){
			console.log("WARNING:\tdirective in "+files[i]+" indicates that a reduce function is at: "+directive.reduce+" but none was found, ignoring this directive.")
			continue; 
		}

		testLoop : for(t in directive.tests){

			//check that each file required for the test exists: 
			if(!fs.existsSync(directive.tests[t].data)){
				console.log("WARNING:\ttest '"+directive.tests[t].name+"' for '"+directive.name+"' indicates that test data is in '"+directive.tests[t].data+"' but this file was not found. Ignoring this test."); 
				continue testLoop; 
			}

			if(!fs.existsSync("test/"+directive.tests[t].verifier)){
				console.log("WARNING:\ttest '"+directive.tests[t].name+"' for '"+directive.name+"' indicates that verifier is in '"+directive.tests[t].verifier+"' but this file was not found. Ignoring this test."); 
				continue testLoop; 
			}

			//if we get to here, we know that all files exist.
			result = runQueryTest(directive.map, directive.reduce, directive.tests[t].data, directive.tests[t].verifier); 

			if(result == null){
				console.log("ERROR:\t test '"+directive.tests[t].name+"' for '"+directive.name+"' failed to complete.");
				error_count += 1; 
			}else{
				if(result.result == true){
					console.log(directive.name.substring(0,23)+"\t"+directive.tests[t].name.substring(0, 25)+"\tPASSED");
					pass_count += 1; 
				}else{
					console.log(directive.name.substring(0,23)+"\t"+directive.tests[t].name.substring(0, 25)+"\tFAILED\t message: "+result.message);
					fail_count += 1; 
				}
			}
			test_count += 1; 
		}
	}
	console.log("----------------------------"); 
	console.log(test_count+" tests were run"); 
	console.log(pass_count+" passed"); 
	console.log(error_count+" errors"); 
}


//main function, everything starts here.
function main(){

	console.log("----------------------------"); 
	console.log("Starting....");
	console.log("----------------------------"); 

	//check that the folder structure is setup. 
	if(!util.checkFolderStructure()){
		process.exit(); 
	}

	//pull in helper functions.

	util.getSupportFunctions();  

	//executeBatch(); 

	var paths = {}; 

	var action = processArguments(paths); 

	switch(action){
		case 'batch':
			executeBatch(paths.pattern)
			break; 
		case 'run':
			//Run the test for the given inputs. 
			var result = runQueryTest(paths.queryMap, null, paths.data, paths.verify); 
			break; 
		default:
			executeBatch(); 	
			break; 
	}

	//clean up the environment. 
	cleanup(); 

	//print finished message
	console.log("----------------------------"); 
	console.log("Finished.");
	console.log("----------------------------"); 
}

//first action in the script, call main. 
main(); 
