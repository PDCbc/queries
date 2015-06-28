/*
* tests the filterProviders function.
*/

function setUp() {
    var obj = {
        "primary_care_provider_id" : "PROVIDER1", 
    };   

    return obj; 
}

module.exports = {
	
    /*
    * Test the case where no providerId or initiative is given. 
    * 
    * Expected: false.
    */
	testUndefinedParams : function(){

        var r = filterProviders(); 

        if ( r === false ) {

            return {result : true, message: 'test passed!'}; 

        }else{

            return {result : false, message: "expected false if no providerId and initiative are defined."}

        }

    }, 

    /*
    * Test case where providerId is given, but no initiative.
    * 
    * expected: false.
    */
    testUndefinedInitiative : function(){

        var r = filterProviders("cpsid"); 

        if ( r === false ) {

            return {result : true, message: 'test passed!'}; 

        }else{

            return {result : false, message: "expected false if no initiative are defined."}

        }

    },

    /*
    * Test case where initiative is given, but providerId is null
    * 
    * expected: false.
    */
    testUndefinedInitiative : function(){

        var r = filterProviders(null, "PPh");

        if ( r === false ) {

            return {result : true, message: 'test passed!'}; 

        }else{

            return {result : false, message: "expected false if providerId is null"}

        }

    }, 

    /* 
    * Test case normal case
    *
    * expected: false. 
    */

    testNormal : function(){

        var r = filterProviders("cpsid", "PPh"); 

        if ( r === true ){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "expected true for a normal provider input."}
        }

    }, 

    /* 
    * Test case normal case
    *
    * expected: false. 
    */

    testRejectProvider : function(){

        var r = filterProviders("NOT A CPSID", "PPh"); 

        if ( r === false ){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "expected false for a normal provider not in the initiative."}
        }

    }

}