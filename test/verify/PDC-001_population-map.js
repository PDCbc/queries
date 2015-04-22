/**
* A verifier function for the query: PDC-001_population-map
* 
* @author: Simon Diemert
* @date: 2015-04-22 
*/

/*
* @param results - the results from running map reduce. 
* 
* @return an object, {result : boolean, message: String}  
*	the result field is true if the results are as expected, false otherwise.
*	the message field contains a message which is displayed if the test fails
*/

function verify(results){

	//

	//test for undefined providers: 
	for(i in results){
		if(results[i]._id.match(".*_[0-9]*-[0-9]*_undefined")){
			console.log("Undefined provider detected"); 
			return {result: false, message: "undefined provider"}; 
		}
	}

	//test for the right number of emits.
	var sum = 0; 
	for(i in results){
		sum += results[i].value;
	}
	if(sum != 17){
		return {result: false, message: "number of patients emitted was not correct"}; 
	}

	//loop through and check age brackets of regular inputs. 
	for(i in results){
		if(
			(results[i]._id == "female_50-59_PROVIDER2" && results[i].value != 1) ||
			(results[i]._id == "female_80-89_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "female_70-79_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "female_60-69_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "female_50-59_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "male_40-49_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "female_30-39_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "male_20-29_PROVIDER1" && results[i].value != 1) ||
			(results[i]._id == "male_0-9_PROVIDER1" && results[i].value != 1)
		){
			return {result: false, message: "unexpected age bracket distribution"}; 
		}
	}

	return {result: true, message: "test passed!"};
}

module.exports = {
	verify: verify
}