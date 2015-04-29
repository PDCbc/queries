
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
	testSingleEncounter : function(){

        var testpt = setUpTest(); 

        testpt.json.encounters[0].start_time = Math.floor((new Date()).getTime()/1000 - 2592000); 

        testpt.json.medications = []; 

        var result = activePatient(testpt); 

        if(result){
            return {result : true, message : "intended to pass"}; 
        }else{
            return {result : false, message : "failed"}; 
        }
	},

    testSingleMedication : function(){

        var testpt = setUpTest(); 

        testpt.json.encounters = []; 

        testpt.json.medications[0].start_time   = Math.floor((new Date()).getTime()/1000 - 2592000);  //offset by 1 month from current
        testpt.json.medications[0].end_time     = Math.floor((new Date()).getTime()/1000); 

        var result = activePatient(testpt); 

        if(result){
            return {result : true, message : "intended to pass"}; 
        }else{
            return {result : false, message : "failed"}; 
        }

    }	
}