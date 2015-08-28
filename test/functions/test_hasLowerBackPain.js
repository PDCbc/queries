/**
* Tests for hasLowerBackPain
*/

function setUp (){


    //do some setup here, usually create a patient
    //object and return it.

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -25,
        "conditions" : [
            { "codes": { "ICD9": ["724.3"]}, "time": 1263167138, "description": "Condition"}
        ]
    };
    return new hQuery.Patient(obj);

}

module.exports = {

    testNullPatient : function(){

        var r = hasLowerBackPain(null);

        if ( r === false ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false for null patient."};
        }

    },

    testLBPCode : function(){

        var pt = setUp();

        var r = hasLowerBackPain(pt);

        if ( r === true ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected true for patient that has ICD9 code 724.3 (LBP)"};
        }

    }
};

