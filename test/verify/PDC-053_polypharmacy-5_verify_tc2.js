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
	
	console.log(results);

	if(results.length != 2){
		return {result: false, message : "size of result array is not 2."}; 
	}

	var valid_denom = false; 
	var valid_num 	= true; 

	for(i in results){
		if(results[i]._id == "denominator_PROVIDER1"){
			if(results[i].value != 3){
				return {result: false, message : "denominator was not 3 as expected for this input, NOTE: if the current date is 2016-xx-xx this may fail, consider fixing test data."};  
			}else{
				valid_denom = true; 
			}
		}
		if(results[i]._id == "numerator_PROVIDER1"){
			if(results[i].value != 0){
				return {result: false, message : "numerator was non zero, NOTE: if the current date is 2016-xx-xx this may fail, consider fixing test data."};  
			}else{
				valid_num = true; 
			}
		}
	}

	if(!(valid_denom && valid_num)){
		return {result:false, message:"invalid numerator or denominator"}; 
	}else{
		return {result:true, message : "test passed"};
	}
}

module.exports = {
	verify: verify
}