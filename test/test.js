var mockReduce = require('mock-reduce'); 
var mongoose = require('mongoose'); 
var fs = require('fs'); 


/*
* This is a stupid fix for executing queries.....ugh
* We need to combine the patient.js and map.js files together
* as they have dependencies. 
* This problem is due to poor architecture on the endpoint and hub
* and is required to test the queries correctly. 
* 
* @param {string} map_path - the path the query map function to use
* @param {string} api_path - the path to the patient api
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
function createMapFunction(map_path, api_path){

	//make a new directory to work in. 
	if (!fs.existsSync("./tmp")){
		fs.mkdirSync("./tmp"); 
	}

	//get the text in the map_path file. 
	var map = fs.readFileSync(map_path);


	//get the text in the api_path file.
	var api = fs.readFileSync(api_path);

	var new_string = "";

	//need this for making the hQuery api visible globally. 
	new_string += "this.hQuery || (this.hQuery = {});\n"
	new_string += "var hQuery = this.hQuery\n"

	//now add the code the patient api. 
	new_string += api; 
	new_string += "//===============END OF PATIENT API \n\n\n"; 

	//now add the code for the query map function
	new_string += map; 
	new_string += "//===============END OF QUERY \n\n\n"; 

	//now make a new patient that is globally accessible so that
	//query has access. 
	new_string += "var patient = new hQuery.Patient(this);\n"; 

	//add module exports 
	new_string += " module.exports = { map : map, hQuery : this.hQuery, patient : patient};\n";

	//remove the output file if it exists. 
	if(fs.existsSync("./tmp/megafile.js")){
		fs.unlinkSync("./tmp/megafile.js"); 
	}
	fs.writeFileSync("./tmp/megafile.js", new_string); 

	return "./tmp/megafile.js"; 
}

//main function, everything starts here.
function main(){
	var actions = {
		folder 		: null,
		queryMap 	: null, 
		data 		: null
	}

	//check that we have a enough arguments
	if(process.argv.length < 4){
		//output an error message.
		console.log("Error, incorrect number of arguments.\nCorrect usage: js test.js <path to query> <path to test data>"); 
	}

	//process the arguments and determine what we need to do
	process.argv.forEach(function(val, index, array){
		if(index == 0){ //this is the js call.
			return; 
		}else if(index == 1){ //the name of the test file (test.js)
			return; 
		}else if(index == 2){
			actions.queryMap = val; 
		}else if(index == 3){
			actions.data = val; 
		}
	}); 

	//--------IF WE GET HERE WE HAVE FINISHED PARSING CMD LINE -------

	//load the query (map and reduce modules), and the test data
	console.log(actions); 

	//combine the patient api and query in a single file. 
	var megaModulePath = createMapFunction(actions.queryMap, "./resources/patient.js"); 

	//open the single file with all of code for the query. 
	var megaModule = require(megaModulePath); 

	//load the specified test data. 
	var testData = JSON.parse(fs.readFileSync(actions.data, "utf8")); 

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
		patient: String
	});


	//set the methods for the Map/Reduce
	schema.statics.callsMapReduce = function() {
		var mapReduce = {
			map: function(){
				console.log("CALLING MAP: ")
				megaModule.map(this); 
			}, 
			reduce: function(key, values) {
				console.log("REDUCE: ")
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
	var result = model.callsMapReduce(); 

	//print results
	console.log(result); 

	//validate results are as expected:
	// TODO: make me
}

//first action in the script, call main. 
main(); 
