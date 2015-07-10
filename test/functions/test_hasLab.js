function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "results": [
        {
          "_id": {
            "$oid": "551cce86c58406644d0000df"
          },
          "codes": {
            "LOINC": [
              "14771-0"
            ]
          },
          "_type": "LabResult",
          "interpretation": {
            "code": "N",
            "codeSystem": "ObservationInterpretation"
          },
          "start_time": 1369995612,
          "description": "WBC",
          "status_code": {
            "value": "complete"
          },
          "referenceRange": "Normal Reference range is greater than 4.0",
          "values": [
            {
              "_id": {
                "$oid": "551cce86c58406644d0000e0"
              },
              "scalar": "8.0",
              "units": "giga/L",
              "_type": "PhysicalQuantityResultValue"
            }
          ]
        }
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){


        try{


        var result = hasLab(null);

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a null patient"};
        }


        }
        catch(e)
        {
          console.log('error:' );
          console.log(e);
        }

    },

    testUndefinedPatient : function(){

        var result = hasLab();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    },

    testRegularPatientWithoutLab : function () {

        var p = setUp();

        p.results[0].codes['LOINC'][0] = "22222-2";

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if( result === false) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected false for patient without Lab"};

        }
    },

    testMultipleCodesFirst : function () {

        var p = setUp();

        p.results[0].codes['LOINC'][0] = "14771-0";
        p.results[0].codes['LOINC'][1] = "39156-0";
        p.results[0].codes['LOINC'][2] = "39156-9";

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Lab"};

        }
    },
    testMultipleCodesLast : function () {

        var p = setUp();

        p.results[0].codes['LOINC'][2] = "39156-5";
        p.results[0].codes['LOINC'][1] = "39156-0";
        p.results[0].codes['LOINC'][0] = "14771-0";

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Lab"};

        }
    },
    testMultipleCodesNotFirstOrLast : function () {

        var p = setUp();

        p.results[0].codes['LOINC'][1] = "39156-5";
        p.results[0].codes['LOINC'][0] = "14771-0";
        p.results[0].codes['LOINC'][2] = "39156-9";

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if( result === true) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true for patient with Lab"};

        }
    },

    testPatientWithUndefinedLabs : function() {

        var p = setUp();

        delete p.results;

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with undefined labs"};

        }

    },

    testPatientWithNullLabs : function() {

        var p = setUp();

        p.results = null;

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^39156-5$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for patient with null labs"};

        }

    },


    testPatientWithCombinedCodeSystems : function (){

        var p = setUp();

        p.results = [];
        p.results[0] = { "codes": { "LOINC": ["14771-0"], "SNOMEDCT": ['60621009']}, "start_time": 1263167138, "description": "lab"};

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if ( result === true ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected true given code"};

        }

    },

    testPatientWithUndefinedCodes : function (){

        var p = setUp();

        delete p.results[0].codes;

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false given a patient with labs but no codes"};

        }

    },

    testPatientEmptyCodes : function (){

        var p = setUp();

        p.results = [];
        p.results[0] = { "codes": {}, "time": 1263167138, "description": "Garbage"};

        p = new hQuery.Patient(p);

        var result = hasLab(p, "LOINC", "^14771-0$");

        if ( result === false ) {

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false since no codes were given "};

        }

    },
};
