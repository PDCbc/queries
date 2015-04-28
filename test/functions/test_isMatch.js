module.exports = {

	testUndefinedList : function(){
		if(!isMatch()){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned false for a list that is not defined."}; 
		}
	}, 

	testEmptyList : function(){
		l = []; 		

		if(!isMatch(l)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "expected list of length 0 to return false."}; 
		}
	}, 


	testFullList : function(){
		l = [1,2,3]; 		

		if(isMatch(l)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "expected list of length 3 to return true."}; 
		}
	},

	testMinimalList : function(){
		l = [1]; 		

		if(isMatch(l)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "expected list of length 1 to return true."}; 
		}
	}
}