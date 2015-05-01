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
	* Test the case where the start is in the past and the stop date also in the past.  
	* This is case must also be clearly outside the 120% time window.
	* 
	*  (start << current && stop < current) -> inactive med.
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStartLessThanCurrentAndStopLessThanCurrent : function(){


		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear(start.getFullYear() - 2); 
		stop.setFullYear(stop.getFullYear() - 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if(result.length == 0){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was non-zero"}; 
     	}
	},

	/*
	* When the start is less than the current time
	* 	and the stop is greater than the current time. 
	* 
	*  	(start < current) && (stop > current) -> active med
	* 
	* Expected: the medication will be in the results.
	*/
	testStartLessThanCurrentAndStopAfterThanCurrent : function(){


		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear(start.getFullYear() - 2); 
		stop.setFullYear(stop.getFullYear() + 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	},

	/*
	* When the start is less than the current time
	* 	and the stop is much later than the current time. 
	* 
	*  	 (start < current) && (stop << current) -> inactive
	* 
	* Expected: the medication will not be in the results.
	*/
	testStartLessThanCurrentAndStopMuchLessThanCurrent : function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() - 2 ); 
		stop.setFullYear( stop.getFullYear() - 3 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	},


	/*
	* Test the case where start is after the current time and the stop 
	* time of the medication is even further in the future. 
	* 
	* (start > current) && (stop >> current) -> inactive
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStartAfterCurrentAndStopAfterCurrent : function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() + 2 ); 
		stop.setFullYear( stop.getFullYear() + 3 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";


     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	}, 

	/*
	* Test the case where  stop is after current 
	* and the start is after the stop. (this would be an invalid time window.) 
	* 
	* (start >> current) && (stop > current) -> inactive
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStopAfterCurrendAndStartAfterCurrent : function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() + 3 ); 
		stop.setFullYear( stop.getFullYear() + 2 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current but within 20% window. -> active
	* 
	*	start = current - (1 yr) - (15% of a year)
	* 	stop  = current - (15% of a year) 
	*
	* 	(15% of a year) = 365*0.15 = 54.75 ~= 55 days. 
	* 
	* Expected: the medication will be in the results. 
	*/
	testWithin20PercentWindow: function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 55 ); //add in the extra 55 days

		stop.setDate( stop.getDate() - 55 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 
        
        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";
     	
        try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current  but right on the 20% boundary -> active
	* 
	*	start = current - (1 yr) - (20% of a year)
	* 	stop  = current - (20% of a year) 
	*
	* 	(20% of a year) = 365*0.20 = 73 days.  //we will make this 72 to deal with calendar (closer to 19.xx%)
	* 
	* Expected: the medication will be in the results. 
	*/
	testOn20PercentWindow : function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 72 ); //add in the extra 55 days
		stop.setDate( stop.getDate() - 72 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current but slightly over the 20% boundary -> inactive
	* 
	*	start = current - (1 yr) - (25% of a year)
	* 	stop  = current - (25% of a year) 
	*
	* 	(25% of a year) = 365*0.25 = 91 days.  
	* 
	* Expected: the medication will be in the results. 
	*/
	testOn20PercentWindow : function(){

		var start     = new Date(); 
		var stop      = new Date(); 
        var obj       = setUp(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 91 ); //add in the extra 55 days

		stop.setDate( stop.getDate() - 91 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	},

    /*
    * Test case where medication is flagged_as_active, long_term_flag, and in_time_fram
    *
    * Expected: Medication is in results.
    */
    testActiveFlagAndLongTermFlagAndInTimeFrame : function(){

        //set up dates.
        var start     = new Date(); 
        var stop      = new Date(); 
        var obj       = setUp(); 

        start.setFullYear( start.getFullYear() - 1 ); 
        stop.setFullYear( stop.getFullYear() + 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig += "E2E_LONG_TERM_FLAG";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length == 1 ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
        }
    },


    /*
    * Test case where medication is flagged_as_active, long_term_flag, and NOT in time_frame
    *
    * stop < current AND start << current
    *
    * Expected: Medication is in results.
    */
    testActiveFlagAndLongTermFlagAndNotInTimeFrame : function(){

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() - 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig += "E2E_LONG_TERM_FLAG";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length == 1 ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
        }
    },

    /*
    * Test case where medication is flagged_as_active, NOT long_term_flag, and in time_frame
    *
    * stop > current AND start << current
    *
    * Expected: Medication is in results.
    */
    testActiveFlagAndNoTLongTermFlagAndInTimeFrame : function(){

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() + 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length == 1 ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
        }
    },

    /*
    * Test case where medication is flagged_as_active, NOT long_term_flag, and NOT in time_frame
    *
    * stop < current AND start << current
    *
    * Expected: Medication is not in results.
    */
    testActiveFlagAndNoTLongTermFlagAndNotTimeFrame : function(){

        var expected = 0; 

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() - 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "active";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where medication is NOT flagged_as_active, long_term_flag, and in time_frame
    *
    * stop > current AND start << current
    *
    * Expected: Medication is not in results.
    */
    testNotActiveFlagAndNotLongTermFlagAndTimeFrame : function(){

        var expected = 0; 

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() - 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "completed";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },


    /*
    * Test case where medication is NOT flagged_as_active, NOT long_term_flag, and in time_frame
    *
    * stop > current AND start << current
    *
    * Expected: Medication is not in results.
    */
    testNotActiveFlagAndNotLongTermFlagAndTimeFrame : function(){

        var expected = 0; 

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() + 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "completed";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
        }
    },

    /*
    * Test case where medication is NOT flagged_as_active, long_term_flag, and NOT in time_frame
    *
    * stop > current AND start << current
    *
    * Expected: Medication is not in results.
    */
    testNotActiveFlagAndLongTermFlagAndTimeFrame : function(){

        var expected = 0; 

        //set up dates.
        var start   = new Date(); 
        var stop    = new Date(); 
        var obj     = setUp(); 

        start.setFullYear( start.getFullYear() - 2 ); 
        stop.setFullYear( stop.getFullYear() - 1 ); 

        obj.medications[0].start_time = Math.floor(start.getTime()/1000); 
        obj.medications[0].end_time = Math.floor(stop.getTime()/1000); 

        //set up long term flag: 
        obj.medications[0].freeTextSig = "E2E_LONG_TERM_FLAG";

        //set up the active flag: 
        obj.medications[0].statusOfMedication.value = "completed";

        try{
            var p  = new hQuery.Patient(obj); 
            var result = filter_activeMeds(p.medications()); 
        }catch(e){

        }

        if( result.length === expected ){
            return {result : true, message : "test passed"}; 
        }else{
            return {result : false, message : "number of active meds was "+result.length+" not "+expected+" as expected."}; 
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
    },


    /*
    * Test case where the medication list contains a medication with a status flag that is completed, not active.
    *
    * Expected: Result has length 0.  
    */  
    testMedicationWithCompletedStatus : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications[0].statusOfMedication.value = "completed"; 

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
    },

    /*
    * Test case where the medication list contains a medication with a status flag that is completed, not active.
    *
    * Expected: Result has length 0.  
    */  
    testMedicationWithCompletedStatusField : function(){

        var expected = 0; 

        var obj = setUp(); 

        obj.medications[0].statusOfMedication.value = "completed"; 

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
    },
}   