function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "conditions" : [
            { "codes": { "ICD9": ["414"]}, "time": 1263167138, "description": "Condition"}
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){


        var result = hasIHD(null);

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    },

    testUndefinedPatient : function(){

        var result = hasIHD();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithExtendedCode : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "414.1";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithCode : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "410";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithExtended410Code : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "410.1";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWith411Code : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "411";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithExtended409Code : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "409";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient"};

        }

    },

    testRegularWithoutIHDPatient : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient"};

        }
    },

    testMultipleCodes : function () {

        var p = setUp();

        p.conditions[0].codes['ICD9'][0] = "500.0";
        p.conditions[0].codes['ICD9'][1] = "400.0";
        p.conditions[0].codes['ICD9'][2] = "414.42";

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient"};

        }
    },

    testPatientWithUndefinedConditions : function() {

        var p = setUp();

        delete p.conditions;

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

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

        var result = hasIHD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }
    },

    testPatientMultipleConditions : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "ICD9": ["300.0"]}, "time": 1263167138, "description": "NOT IHD"};
        p.conditions[1] = { "codes": { "ICD9": ["301.0"]}, "time": 1263167138, "description": "NOT IHD"};
        p.conditions[2] = { "codes": { "ICD9": ["414"]}, "time": 1263167138, "description": "IHD"};

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with CHF in condition list."};

        }

    },

    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": { "SNOMED-CT": ["123455"], "ICD9" : ["414"]}, "time": 1263167138, "description": "IHD"};

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient"};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.conditions[0].codes

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false given a patient with conditions but no codes"};

        }

    },

    testPatientEmptyCodes : function (){

        var p = setUp();

        p.conditions = [];
        p.conditions[0] = { "codes": {}, "time": 1263167138, "description": "NOT IHD"};

        p = new hQuery.Patient(p);

        var result = hasIHD(p);

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },
}
