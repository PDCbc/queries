/**
* Test the hasDiabetes function.
*
* The definition of Diabetes is as per the data dictionary on polarian.
*  - has ICD9 250.*
*
*/


function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "conditions" : [
            { "codes": { "ICD9": ["250.0"]}, "time": 1263167138, "description": "Diabetes"}
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){

      var result = hasDiabetes(null);

   		if ( result === false){

        		return {result : true, message : "test passed"};

    	}else{

        		return {result : false, message : "expected false for a null patient"};
    	}
	     return {result : false, message : "expected false for a null patient"};
    },

    testUndefinedPatient : function(){

        var result = hasDiabetes();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularWithoutDiabetesPatient : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient without Diabetes"};

        }
    },

    testMultipleCodes : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";
        p.conditions[0].codes['ICD9'][1] = "250.0";
        p.conditions[0].codes['ICD9'][2] = "428.42";

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Diabetes"};

        }
    },

    testFirstOfManyCodes : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "250.0";
        p.conditions[0].codes['ICD9'][1] = "500.0";
        p.conditions[0].codes['ICD9'][2] = "428.42";

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Diabetes"};

        }
    },

    testLastOfManyCodes : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";
        p.conditions[0].codes['ICD9'][1] = "428.42";
        p.conditions[0].codes['ICD9'][2] = "250.0";

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Diabetes"};

        }
    },

    testPatientWithUndefinedConditions : function() {

        var p = setUp();

        delete p.conditions;

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

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

        var result = hasDiabetes(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }

    },

    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123456"], "ICD9" : ["250.0"]}, "time": 1263167138, "description": "DiabestesICD9"};

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true given ICD9 code 250.0"};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.conditions[0].codes

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false given a patient with conditions but no codes"};

        }

    },

    testPatientEmptyCodes : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": {}, "time": 1263167138, "description": "Diabetes"};

        p = new hQuery.Patient(p);

        var result = hasDiabetes(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },
}
