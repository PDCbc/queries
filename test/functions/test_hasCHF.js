function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "conditions" : [
            { "codes": { "ICD9": ["428.0"]}, "time": 1263167138, "description": "Condition"}
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

    testRegularWithoutConditionPatient : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient without condition"};

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

        }else{

            return {result : false, message : "expected true for patient with condition"};

        }
    },

    testPatientWithUndefinedConditions : function() {

        var p = setUp();

        delete p.conditions;

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

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

        var result = hasCHF(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }

    },

    testPatientMultipleConditions : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "ICD9": ["429.0"]}, "time": 1263167138, "description": "not Condition"};
        p.conditions[1] = { "codes": { "ICD9": ["430.0"]}, "time": 1263167138, "description": "not Condition"};
        p.conditions[2] = { "codes": { "ICD9": ["428.0"]}, "time": 1263167138, "description": "CHF"};

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with the condition in condition list."};

        }

    },

    testPatientNonICD9Code : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"]}, "time": 1263167138, "description": "not condition"};

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected SNOMED-CT"};

        }

    },

    testPatientNonICD9Code : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"]}, "time": 1263167138, "description": "not condition"};

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false if given a SNOMED-CT code"};

        }

    },

    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"], "ICD9" : ["428.9"]}, "time": 1263167138, "description": "not condition"};

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true given condition code was present"};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.conditions[0].codes

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false given a patient with conditions but no codes"};

        }

    },

    testPatientEmptyCodes : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": {}, "time": 1263167138, "description": "not condition"};

        p = new hQuery.Patient(p);

        var result = hasCHF(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },
};
