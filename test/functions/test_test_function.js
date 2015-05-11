/**
* Test the hasCHF function.
* 
* The definition of CHF is as per the data dictionary on polarian. 
*  - has ICD9 428.* 
*
*/

module.exports = {

	testReturnValue : function(){

		var result = testFunction(); 

		return {result : result, message : "test passed"}; 	
	},

	testReturnFalse : function(){
		return {result : false, message : "I failed!"}; 
	}

}

