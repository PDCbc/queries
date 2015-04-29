
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

        var result = activePatient(testpt)

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

        var result = activePatient(testpt)

        if(result === expected){
            return {result : true, message : "test passed!"}; 
        }else{
            return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "}; 
        }
    }, 

}