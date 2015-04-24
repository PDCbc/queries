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

	try{
		if(results.length != 0){
			return {result : false, message: "result was not an empty array"}; 
		}
	}catch(e){
		return {result : false, message: "result was not an array"}; 
	}
	
	return {result:true, message : "test passed"};
}

module.exports = {
	verify: verify
}