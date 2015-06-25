function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "vital_signs" : [
            { "codes": { "LOINC": ["39156-5"]}, "start_time": 1263167138, "description": "BMI"}
        ]
    };
    return obj;
}

module.exports = {

    testNullPatient : function(){


        var result = hasBMI(null);

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a null patient"};
        }

    },

    testUndefinedPatient : function(){

        var result = hasBMI();

        if ( result === false){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "expected false for a undefined patient"};
       }

    },

    testRegularPatient : function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasBMI(p);

        if( result === true) {

            return {result : true, message : "test passed"};

        }else {

            return {result : false, message : "expected true for patient"};

        }

    }
  };
