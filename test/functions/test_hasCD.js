function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -25,
        "conditions" : [
            { "codes": { "ICD9": ["430"]}, "time": 1263167138, "description": "Condition"}
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){

        var result = hasCD(null);

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    },

    testUndefinedPatient : function(){

        var result = hasCD();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasCD(p);

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

        var result = hasCD(p);

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient without condition"};

        }
    },

    testPatientWithUndefinedConditions : function() {

        var p = setUp();

        delete p.conditions;

        p = new hQuery.Patient(p);

        var result = hasCD(p);

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

        var result = hasCD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }

    },

    testPatientMultipleConditions : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "ICD9": ["600"]}, "time": 1263167138, "description": "not condition"};
        p.conditions[1] = { "codes": { "ICD9": ["601"]}, "time": 1263167138, "description": "not condition"};
        p.conditions[2] = { "codes": { "ICD9": ["430"]}, "time": 1263167138, "description": "condition"};

        p = new hQuery.Patient(p);

        var result = hasCD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with the condition in the condition list."};

        }

    },

    testPatientNonICD9Code : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"]}, "time": 1263167138, "description": "not condition"};

        p = new hQuery.Patient(p);

        var result = hasCD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false if given a SNOMED-CT code"};

        }

    },

    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"], "ICD9" : ["430"]}, "time": 1263167138, "description": "condition"};

        p = new hQuery.Patient(p);

        var result = hasCD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true given ICD9 code present"};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.conditions[0].codes

        p = new hQuery.Patient(p);

        var result = hasCD(p);

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

        var result = hasCD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },

    testAllConditionCodes : function(){

        var codes = ["430","431","432","433","434","436","437","438"]; //correct codes with random sub-codes.

        var p = null;
        var result = true;

        for( var c = 0; c < codes.length; c++ ) {

            p = setUp();
            p.conditions[0] = { "codes": {"ICD9" : [codes[c]]}, "time": 1263167138, "description": "CKD"};
            p = new hQuery.Patient(p);
            result = result && hasCD(p);

        }

        if(result === true ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true, patient has condition's ICD9 code"};

        }

    }
};
