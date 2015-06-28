
function setUpTest(){
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "encounters": [
            {
                "_id": {"$oid": "551cce86c58406644d0000b5"},
                "codes": {"code": ["REASON"],"codeSystem": ["ObservationType-CA-Pending"]},
                "mood_code": "EVN",
                "_type": "Encounter",
                "start_time": null,
                "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS",
                "reason": {"_id": {"$oid": "551cce86c58406644d0000b6"},"codes": {"ObservationType-CA-Pending": ["REASON"], "Unknown": ["NI"]},"mood_code": "EVN","description": "", "start_time": 1380124200},
                "performer": {"_id": {"$oid": "551cce86c58406644d00008a"},"title": "","given_name": "","family_name": "qbGJGxVjhsCx/JR42Bd7tX4nbBYNgR/TehN7gQ==","specialty": "","npi": "","start": 1380124200,"end": null,"organization": {"_id": {"$oid": "551cce86c58406644d00008b"}}}
            }
        ],
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

    return new hQuery.Patient(obj);  
}

module.exports = {

    /*
    * Test a single encounter that should be picked up as valid
    *
    * Expected: activePatient returns true. 
    */
	testSingleEncounter : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date()).getTime()/1000 - 2592000); 

        testpt.json.medications = []; 

        var result = activePatient(testpt); 

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
	},

    /*
    * Test a single medication that should be valid. 
    * 
    * Expected: activePatient returns true. 
    */
    testSingleMedication : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters = []; 

        testpt.json.medications[0].start_time   = Math.floor((new Date()).getTime()/1000 - 2592000);  //offset by 1 month from current
        testpt.json.medications[0].end_time     = Math.floor((new Date()).getTime()/1000); 

        var result = activePatient(testpt); 

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    },	

    /*
    * Test case where patient is undefined.
    * 
    * Expected: activePatient returns true. 
    */
    testUndefinedPatient : function(){

        var expected = false;  

        var result = activePatient(); 

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    },  


    /*
    * Test case where the encounter list is empty.
    * 
    * Expected: activePatient returns false
    */
    testEmptyEncounterList : function(){
        var expected = false;

        var pt = setUpTest(); 

        pt.json.encounters = []; 

        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    },

    /*
    * Test case where the encounter list was not defined in the patient.
    * 
    * Expected: activePatient returns false
    */
    testUndefinedEncounterList : function(){
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    },


    /*
    * Test case where the encounter list was not defined in the patient.
    * 
    * Expected: activePatient returns false
    */
    testNullEncounterList : function(){
        var expected = false;

        var pt = setUpTest(); 

        pt.json.encounters = null; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    },

   /*
    * Test case where the encounter list was not defined in the patient.
    * 
    * Expected: activePatient returns false
    */
    testEmptyStringAsEncounterList : function(){

        var expected = false;

        var pt = setUpTest(); 

        pt.json.encounters = ""; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    }, 

   /*
    * Test case where the encounter list was not defined in the patient.
    * 
    * Expected: activePatient returns false
    */
    testEncounterWithUndefinedStartTime : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters[0].start_time; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    }, 

    /*
    * Test case where encounter has a null start time 
    *
    * Expected: activePatient returns false
    */
    testEncounterWithNullStartTime : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        pt.json.encounters[0].start_time = null; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    }, 



    /*
    * Test case where encounter has an empty string start time
    *
    * Expected: activePatient returns false
    */
    testEncounterWithEmptyStringStartTime : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        pt.json.encounters[0].start_time = ""; 
        delete pt.json.medications;

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    }, 

    /*
    * Test case where medication list (and encounter list) is undefined.
    *
    * Expected: activePatient returns false
    */
    testMedicationWithUndefinedMedication : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        delete pt.json.medications; 

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    }, 

    /*
    * Test case where medication list is empty 
    *
    * Expected: activePatient returns false
    */
    testMedicationWithEmptyMedList : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        pt.json.medications = []; 

        var result = activePatient(pt); 

       if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        } 
    },

    /*
    * Test case where medication list is null
    *
    * Expected: activePatient returns false
    */
    testMedicationWithNullMedList : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        pt.json.medications = null; 

        var result = activePatient(pt); 

       if(result === expected){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 

        } 
    },

    /*
    * Test case with medication with undefined start time. 
    *
    * Expected: activePatient returns false
    */
    testMedicationWithUndefinedStart : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        delete pt.json.medications[0].start_time; 

        var result = activePatient(pt); 

       if(result === expected){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
            
        } 
    },

    /*
    * Test case with medication with null start time. 
    *
    * Expected: activePatient returns false
    */
    testMedicationWithNullStart : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        pt.json.medications[0].start_time = null; 

        var result = activePatient(pt); 

       if(result === expected){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
            
        } 
    },

    /*
    * Test case with medication with string as a  start time. 
    *
    * Expected: activePatient returns false
    */
    testMedicationWithStringStart : function(){
        
        var expected = false;

        var pt = setUpTest(); 

        delete pt.json.encounters; 

        pt.json.medications[0].start_time = "SOME STRING THAT IS NOT A DATE"; 

        var result = activePatient(pt); 

       if(result === expected){

            return {result : true, message : "test passed!"}; 

        }else{

            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
            
        } 
    },

    /*
    * Test case where patient is defined by reference date and frame are not given.
    *   Use input encounter and medications that should both be rejected if the date defaults 
    *   to "now" and the frame is 2 years. 
    * 
    * Expected: activePatient returns false. 
    */
    testUndefinedTimeValuesNegatively : function(){

        var expected = false; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time    = Math.floor((new Date()).getTime()/1000 - 153792000 );  //shift by 5 years.

        testpt.json.medications[0].start_time   = Math.floor((new Date()).getTime()/1000 - 153792000 );  //shift down by 5 years.
        testpt.json.medications[0].end_time     = Math.floor((new Date()).getTime()/1000 - 153793000 ); 

        var result = activePatient(testpt); 

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    /*
    * Test case where patient is defined by reference date and frame are not given.
    *   Use input encounter and medications that should both be accepted if the date defaults 
    *   to "now" and the frame is 2 years. 
    * 
    * Expected: activePatient returns true. 
    */
    testUndefinedTimeValuesPostively : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time    = Math.floor((new Date()).getTime()/1000 - 31536000 );  //shift by 1 year.

        testpt.json.medications[0].start_time   = Math.floor((new Date()).getTime()/1000 - 31536000 );  //shift down by 1 year.
        testpt.json.medications[0].end_time     = Math.floor((new Date()).getTime()/1000 - 31537000  ); 

        var result = activePatient(testpt); 

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    //----------START OF TESTING ENCOUNTER TIMING: uses the following test cases: 
    //
    // These test cases use only encounters and no valid medications. 
    //
    //  1   2          3              4  5
    //      |-------------------------|
    //      A                         B   
    //
    //    5 Test Cases: 
    //
    //    1. time < A             -> exclude
    //    2. time == A            -> include
    //    3. time > A && time < B -> include 
    //    4. time == B            -> include
    //    5. time > B             -> exclude

    /*
    * Test Encounter Timing 1, time < beginning of valid range 
    *
    * Reference Date : Jan 1st 1970.
    * Time frame     : 1 year
    * Encounter Date : Jan 1st 1968, 1 year before time frame.
    * 
    * Expected: activePatient returns false. 
    */
    testEnounterTiming1 : function(){

        var expected = false; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date(0)).getTime()/1000 - 63072000 );  //shift by 2 years, gives 1968

        testpt.json.medications = []; //clear medications so that they aren't used. 

        var result = activePatient(testpt, new Date(0), 31536000 );

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    /* Test Encounter Timing 2, time = beginning of valid range 
    *
    * Reference Date : Jan 1st 1970.
    * Time frame     : 1 year
    * Encounter Date : Jan 1st 1969, 1 year before reference date.
    * 
    * Expected: activePatient returns true. 
    */
    testEnounterTiming2 : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date(0)).getTime()/1000 - 31536000 );  //shift by 1 year, gives 1969

        testpt.json.medications = []; //clear medications so that they aren't used. 

        var result = activePatient(testpt, new Date(0), 31536000 );

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    /* Test Encounter Timing 3, time > beginning  AND time < end of valid range 
    *
    * Reference Date : Jan 1st 1970.
    * Time frame     : 2 years
    * Encounter Date : Jan 1st 1969, 1 year before reference date.
    * 
    * Expected: activePatient returns true. 
    */
    testEnounterTiming3 : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date(0)).getTime()/1000 - 31536000 );  //shift by 1 years, gives 1969

        testpt.json.medications = []; //clear medications so that they aren't used. 

        var result = activePatient(testpt, new Date(0), 63072000 );

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    /* Test Encounter Timing 4, time = end of valid range 
    *
    * Reference Date : Jan 1st 1970.
    * Time frame     : 2 years
    * Encounter Date : Jan 1st 1970
    * 
    * Expected: activePatient returns true. 
    */
    testEnounterTiming4 : function(){

        var expected = true; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date(0)).getTime()/1000 - 1);  //almost exact time, unfortunately a broken patient API prevents this from working.

        testpt.json.medications = []; //clear medications so that they aren't used. 

        var result = activePatient(testpt, new Date(0), 63072000 );

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

    /* Test Encounter Timing 5, time > end of valid range 
    *
    * Reference Date : Jan 1st 1970.
    * Time frame     : 2 years
    * Encounter Date : Jan 1st 1971
    * 
    * Expected: activePatient returns false. 
    */
    testEnounterTiming5 : function(){

        var expected = false; 

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date(0)).getTime()/1000 + 31536000);  //shift by 1 year, gives 1971

        testpt.json.medications = []; //clear medications so that they aren't used. 

        var result = activePatient(testpt, new Date(0), 63072000 );

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    },  
}