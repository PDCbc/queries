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
	
	if( (results == undefined || results == null) && 
		results.length != 2
	){
		return {action : false, message : "invalid result was generated."}; 
	}

	//if we get here we know that the result has the right number of values

	var valid_d = 0; 
	var valid_n = 0; 

	for(i in results){
		if(results[i]._id == "denominator_PROVIDER1"){
			if(results[i].value != 1){
				return {result : false, message : "denominator was: "+results[i].value+" expected 1"}; 
			}else{
				valid_d += 1; 
			}
		}else if(results[i]._id == "numerator_PROVIDER1"){
			if(results[i].value != 1){
				return {result : false, message : "numerator was: "+results[i].value+" expected 1"}; 
			}else{
				valid_n += 1; 
			}
		}else{
			return {result : false, message : "invalid key into results: "+results[i]._id}; 
		}
	}

	if(valid_n == 1 && valid_d == 1){
		return {result : true, message : "test passed"}; 
	}else{
		return {result : false, message : "unexpected number of numerator or denominator values"}; 
	}
}

module.exports = {
	verify: verify
}