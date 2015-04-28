module.exports = {

	testReturnValue : function(){

		var result = testFunction(); 

		return {result : result, message : "test passed"}; 	
	},

	testReturnFalse : function(){
		return {result : false, message : "I failed!"}; 
	}

}

