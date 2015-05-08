/**
* Test the hasCHF function.
* 
* The definition of CHF is as per the data dictionary on polarian. 
*  - has ICD9 428.* 
*
*/


function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "conditions" : [ 
            { "codes": { "ICD9": ["585.0"]}, "time": 1263167138, "description": "Chronic Kidney Disease"} 
        ]
    }; 
    return obj; 
}

module.exports = {

    testNullPatient : function(){


        var result = hasCKD(null); 

        if ( result === false){

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    }, 

    testUndefinedPatient : function(){

        var result = hasCKD(); 

        if ( result === false){

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       } 

    }, 

    testRegularPatient : function () {

        var p = setUp(); 

        p = new hQuery.Patient(p); 

        var result = hasCKD(p); 

        if( result === true) {

            return {result : true, message : "test passed"};  

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularWithoutCKDPatient : function () {

        var p = setUp(); 

        p.conditions[0].codes['ICD9'][0] = "500.0"; 

        p = new hQuery.Patient(p); 

        var result = hasCHF(p); 

        if( result === false) {

            return {result : true, message : "test passed"};  

        }else {

            return {result : false, message : "expected false for patient without CHF"};

        }
    },

    testPatientWithUndefinedConditions : function() {

        var p = setUp(); 

        delete p.conditions; 

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for patient with undefined conditions"};

        }

    },

    testPatientWithNullConditions : function() {

        var p = setUp(); 

        p.conditions = null; 

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }

    },

    testPatientMultipleConditions : function (){

        var p = setUp(); 

        p.conditions = []; 
        p.conditions[0] = { "codes": { "ICD9": ["600"]}, "time": 1263167138, "description": "NOT CKD"};
        p.conditions[1] = { "codes": { "ICD9": ["601"]}, "time": 1263167138, "description": "NOT CKD"};
        p.conditions[2] = { "codes": { "ICD9": ["585.1"]}, "time": 1263167138, "description": "CKD"};

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected true for patient with CHF in condition list."};

        }

    },

    testPatientNonICD9Code : function (){

        var p = setUp(); 

        p.conditions = []; 
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"]}, "time": 1263167138, "description": "NOT CHF"};

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false if given a SNOMED-CT code"};

        }

    },

    testPatientWithCombinedCodeSystems : function (){

        var p = setUp(); 

        p.conditions = []; 
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"], "ICD9" : ["585.2"]}, "time": 1263167138, "description": "NOT CHF"};

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected true given ICD9 code 428.9 "};

        }

    }, 

    testPatientWithUndefinedCodes : function (){

        var p = setUp(); 

        delete p.conditions[0].codes

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false given a patient with conditions but no codes"};

        }

    }, 

    testPatientEmptyCodes : function (){

        var p = setUp(); 

        p.conditions = []; 
        p.conditions[0] = { "codes": {}, "time": 1263167138, "description": "NOT CHF"};

        p = new hQuery.Patient(p); 

        var result = hasCKD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    }, 

    testAllCKDCodes : function(){

        var codes = ["585.0","581.1","582.7","583.4","587.3","588.2"]; //correct codes with random sub-codes. 

        var p = null; 
        var result = true; 

        for( var c = 0; c < codes.length; c++ ) {

            p = setUp();
            p.conditions[0] = { "codes": {"ICD9" : [codes[c]]}, "time": 1263167138, "description": "CKD"};
            p = new hQuery.Patient(p);
            result = result && hasCKD(p); 

        }

        if(result === true ){

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected true, patient has CKD ICD9 code"};

        }

    }
}

