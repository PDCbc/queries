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
        "vital_signs" : [
            { "codes": { "LOINC": ["39156-5"]}, "start_time": 1263167138, "description": "BMI"}
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){


        var result = hasCMO(null);

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    },

    testUndefinedPatient : function(){

        var result = hasCMO();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithoutCMO : function () {

        var p = setUp();

        p.vital_signs[0].codes['LOINC'][0] = "22222-2";

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient without CMO"};

        }
    },

    testMultipleCodesFirst : function () {

        var p = setUp();

        p.vital_signs[0].codes['LOINC'][0] = "39156-5";
        p.vital_signs[0].codes['LOINC'][1] = "39156-0";
        p.vital_signs[0].codes['LOINC'][2] = "39156-9";

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with CMO"};

        }
    },
    testMultipleCodesLast : function () {

        var p = setUp();

        p.vital_signs[0].codes['LOINC'][2] = "39156-5";
        p.vital_signs[0].codes['LOINC'][1] = "39156-0";
        p.vital_signs[0].codes['LOINC'][0] = "39156-9";

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with CMO"};

        }
    },
    testMultipleCodesNotFirstOrLast : function () {

        var p = setUp();

        p.vital_signs[0].codes['LOINC'][1] = "39156-5";
        p.vital_signs[0].codes['LOINC'][0] = "39156-0";
        p.vital_signs[0].codes['LOINC'][2] = "39156-9";

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with CMO"};

        }
    },

    testPatientWithUndefinedVitalSigns : function() {

        var p = setUp();

        delete p.vital_signs;

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with undefined conditions"};

        }

    },

    testPatientWithNullVitalSigns : function() {

        var p = setUp();

        p.vital_signs = null;

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null conditions"};

        }

    },


    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.vital_signs = [];
        p.vital_signs[0] = { "codes": { "LOINC": ["39156-5"], "SNOMEDCT": ['60621009']}, "start_time": 1263167138, "description": "BMI"};

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true given ICD9 code 428.9 "};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.vital_signs[0].codes;

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false given a patient with conditions but no codes"};

        }

    },

    testPatientEmptyCodes : function (){

        var p = setUp();

        p.vital_signs = [];
        p.vital_signs[0] = { "codes": {}, "time": 1263167138, "description": "Garbage"};

        p = new hQuery.Patient(p);

        var result = hasCMO(p, "LOINC", "^39156-5$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },
};
