/**
* @author: Simon Diemert
* @date: 2015-04-27
*/

/*
* @param results - the results from running map reduce. 
* 
* @return an object, {result : boolean, message: String}  
*	the result field is true if the results are as expected, false otherwise.
*	the message field contains a message which is displayed if the test fails
*/
function verify(results){
	
	if(results.length != 2){
		return {result: false, message: "result did not have size 2."}
	}

	var valid_num = 0; 
	var valid_den = 0; 

	for(i in results){
		if(results[i]._id == "denominator_PROVIDER1"){
			if(results[i].value == 5){
				valid_den += 1; 
			}else{
				return {result : false, message : "denominator was "+results[i].value+", expected 5."}; 
			}
		}else if(results[i]._id == "numerator_PROVIDER1"){
			if(results[i].value == 0){
				valid_num += 1; 
			}else{
				return {result : false, message : "numerator was "+results[i].value+", not 0 as expected."}; 
			}
		}else{
			return {result: false, message : "unexpected tuple in results : "+results[i]._id}; 
		}
	}

	if(valid_num == 1 && valid_den == 1){
		return {result : true, message : "test passed"}; 
	}else{
		return {result:false, message:"in valid count of numerators and denominators"}; 
	}

}

module.exports = {
	verify: verify
}