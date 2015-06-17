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

	if( results !== undefined && results !== null && results.length === 1 ){

        if( results[0]._id === "CODE1", results[0].value === 1 ){

            return {result : true, message : ""}

        }else{

            return {result : false, message : "Result did not have correct code or value"}; 

        }

	}else{

        return {result : false, message : "Result did not have the right number of items, length was: "+ results.length+ " not 1 as expected"}; 

    }


}

module.exports = {
	verify: verify
}