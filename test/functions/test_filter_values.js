module.exports = {
	testUndefinedInputs : function(){

		var result = filter_values(); 

		if(result === undefined || result === null){
			return {result : false, message : "Result was undefined, not [] as expected."}; 
		}

		if(result.length === undefined || result.length === null){
			return {result : false, message : "Returned result does not have a length attribute"}; 
		}

		if(result.length === 0){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "Result was of length: "+result.length+" not 0 as expected."}; 
		}
	},

	testEmptyInputList : function(){

		var result = filter_values([], Number.MIN_VALUE, Number.MAX_VALUE); 

		if(result === undefined || result === null){
			return {result : false, message : "Result was undefined, not [] as expected."}; 
		}

		if(result.length === undefined || result.length === null){
			return {result : false, message : "Returned result does not have a length attribute"}; 
		}

		if(result.length === 0){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "Result was of length: "+result.length+" not 0 as expected."}; 
		}
	}
}