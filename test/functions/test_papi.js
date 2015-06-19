/*
* Testing of how the patient API performs on various null flavours.
*/

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

    return obj;  
}

module.exports = {

    testUndefinedMedications : function(){
        var pt = setUpTest(); 
       
        delete pt.medications;  

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    },

    testUndfinedEncounters : function(){
        var pt = setUpTest(); 
       
        delete pt.encounters;  

        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationsNoItems : function(){
        var pt = setUpTest(); 
       
        pt.medications = [];  

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testEncountersNoItems : function(){
       var pt = setUpTest(); 
       
        pt.encounters = [];  

        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 

        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        } 
    }, 

    testEncountersEmptyString : function (){
       var pt = setUpTest(); 
       
        pt.encounters = "";  

        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 

        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        } 
    },   

    testEncountersNullValue : function (){
       var pt = setUpTest(); 
       
        pt.encounters = null;  

        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 

        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        } 
    },

    testMedicationsEmptyString : function(){
        var pt = setUpTest(); 
       
        pt.medications = "";  

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationsNullValue : function(){
        var pt = setUpTest(); 
       
        pt.medications = null;  

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationsNullString : function(){
        var pt = setUpTest(); 
       
        pt.medications = "null";  

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testEncountersNullString : function(){
        var pt = setUpTest(); 
       
        pt.encounters = "null";  

        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 


        if(m !== undefined && m !== null && m.length !== undefined  && m.length === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationUndefinedStartTime : function(){
        var pt = setUpTest(); 
       
        delete pt.medications[0].start_time; 

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStart(); 

        if(s === null || isNaN(s.getDate())){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationInvalidStartTime : function(){
        var pt = setUpTest(); 
       
        pt.medications[0].start_time = "SOME STRING";

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStart(); 

        if(s === null || isNaN(s.getDate())){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationNullStartTime : function(){
        var pt = setUpTest(); 
       
        pt.medications[0].start_time = null;

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStart(); 

        if(s === null || s.getTime() === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    }, 

    testMedicationUndefinedStopTime : function(){
        var pt = setUpTest(); 
       
        delete pt.medications[0].end_time; 

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStop(); 

        if(s === null || isNaN(s.getDate())){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    },

    testMedicationInvalidStopTime : function(){
        var pt = setUpTest(); 
       
        pt.medications[0].end_time = "SOME STRING"; 

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStop(); 

        if(s === null || isNaN(s.getDate())){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    },

    testMedicationNullStopTime : function(){
        var pt = setUpTest(); 
       
        pt.medications[0].end_time = null; 

        pt = new hQuery.Patient(pt); 

        var m = pt.medications(); 

        var s = m[0].indicateMedicationStop(); 

        if(s === null || s.getTime() === 0){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    },

    testEncounterInvalidStartTime : function(){
        var pt = setUpTest(); 
       
        pt.encounters[0].start_time = null; 


        pt = new hQuery.Patient(pt); 

        var m = pt.encounters(); 

        if( m !== undefined && m.length !==  undefined && m.length === 0 ){
            return {result : true, message : "test passed"};
        }else{
            return {result : false, message : "test failed!"};
        }
    },
}
