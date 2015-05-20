/*
*  Unit tests for the filter_activeMed function. 
* 
*  These tests leverage the definition provided in the data dictionary on polarian
* 
*  The testing matrix for cases is: 
*
*    flagged_as_active | long_term| time_frame | RESULT
*    ---------------------------------------------------
*    1                   1           1           1
*    1                   1           0           1
*    1                   0           1           1
*    1                   0           0           0
*    0                   1           1           0
*    0                   1           0           0
*    0                   0           1           0
*    0                   0           0           0
*
*  The above matrix defines several of our tests, others are used to test
*   time frames.
*/

function setUp() {
    var obj = {
        "primary_care_provider_id" : "PROVIDER1", 
        "birthdate": -70, 
        "medications" : [
            { 
                "_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
                "start_time" : new Date(), "end_time" : new Date, 
                "statusOfMedication" : { "value" : "active" },
                "codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
                "freeTextSig" : ""
            } 
        ]
    };   

    return obj; 
}

module.exports = {
	
	testUndefinedParam : function(){

		try{
			var result = filter_activeMeds(); 
		}catch(e){
			return null; 
		}

		if(result === undefined){
			return {result:false, message : "undefined list should result in empty list response"}; 
		}else if(result.length === undefined){
			return {result:false, message : "undefined list should result in empty list response"}; 
		}else if(result.length === 0){
			return {result:true, message : "test passed"}; 
		}
	},

    /*
    * Test case where the medication list is undefined
    *
    * Expected: Result has length 0.  
    */  

    testUndefinedMedicationList : function(){

        var expected = 0; 

        var obj = setUp(); 

        delete obj.medications; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "Undefined medication list caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where the medication list is null
    *
    * Expected: Result has length 0.  
    */  
    testNullMedicationList : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications = null; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "NULL medication list caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where the medication list is a string
    *
    * Expected: Result has length 0.  
    */  
    testStringMedicationList : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications = "SOME STRING THAT IS NOT A LIST"; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "String medication list caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where the medication list empty 
    *
    * Expected: Result has length 0.  
    */  
    testEmptyMedicationList : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications = []; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "Empty medication list caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where the medication list contains an invalid object.
    *
    * Expected: Result has length 0.  
    */  
    testInvalidMedicationFormat : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications = [{"some_property" : "some_value_that_is_invalid"}]; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "Invalid medication list caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where the medication list contains a medication without statusOfMedication defined. 
    *
    * Expected: Result has length 0.  
    */  
    testMedicationWithoutStatusField : function(){

        var expected = 0; 

        var obj = setUp(); 

        delete obj.medications[0].statusOfMedication; 

        try{
            var p = new hQuery.Patient(obj);
            var result = filter_activeMeds(p.medications());
        }catch(e){
            return {result : false, message : "Medication without statusOfMedication caused an error: "+e}; 
        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    }

}   