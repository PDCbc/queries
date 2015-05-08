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
            { "codes": { "ICD9": ["428.0"]}, "time": 1263167138, "description": "Congestive Heart Failure"} 
        ]
    }; 
    return obj; 
}

module.exports = {

    testNullPatient : function(){


        var result = hasCHF(null); 

        if ( result === false){

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    }, 

    testUndefinedPatient : function(){

        var result = hasCHF(); 

        if ( result === false){

            return {result : true, message : "test passed"};  

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       } 

    }, 

    testRegularPatient : function () {

        var p = setUp(); 

        p = new hQuery.Patient(p); 

        var result = hasCHF(p); 

        if( result === true) {

            return {result : true, message : "test passed"};  

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularWithoutCHFPatient : function () {

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

    testMultipleCodes : function () {

        var p = setUp(); 

        p.conditions[0].codes['ICD9'][0] = "500.0"; 
        p.conditions[0].codes['ICD9'][1] = "400.0"; 
        p.conditions[0].codes['ICD9'][2] = "428.42"; 

        p = new hQuery.Patient(p); 

        var result = hasCHF(p); 

        if( result === true) {

            return {result : true, message : "test passed"};  

        }else {

            return {result : false, message : "expected true for patient with CHF"};

        }
    }

}

