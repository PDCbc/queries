/**
* This is a template verifier that should be written for ever single query. 
* 
* @author: Simon Diemert
* @date: 2015-04-15 
*
* To keep things simple, the name of the verifier should be the same as the name of the query.
* This allows us to run batch tests. 
*/

/*
* @param results - the results from running map reduce. 
* 
* @return true if the results are as expected, false otherwise. 
*/
function verify(results){
	return false; 	//change this to fail (return false)
}

module.exports = {
	verify: verify
}