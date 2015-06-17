/**
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
	
	if( 
		results[0]._id === "00559407_HC-DIN_PROVIDER1" && 
		results[0].value === 5  && 
		results[1]._id === "N02_whoATC_PROVIDER1" && 
		results[1].value === 5 
	){

		return {result : true, message : "test passed"}; 

	}

	return {result : false, message : "intended to fail"}; 

}

module.exports = {
	verify: verify
}