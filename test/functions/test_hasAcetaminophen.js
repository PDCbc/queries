/**
* Tests for hasAcetaminophen
*/

function setUp (){


    //do some setup here, usually create a patient
    //object and return it.

    var obj =  {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "medications" : [{
            "_id" : { "$oid" : "551cce86c58406644d0000c4" },
            "_type" : "Medication",
            "time" : -1,
            "start_time" : new Date(), "end_time" : new Date(),
            "statusOfMedication" : { "value" : "active" },
            "codes" : {"whoATC":["N02BE01"]},
            "freeTextSig" : ""
        }]
    };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNullPatient : function(){

        var pt = null;

        if ( hasAcetaminophen(pt) === false ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false for null patient"};
        }

    },

    testPatientNoMeds : function(){

        var pt = setUp();

        delete pt.json.medications;

        if ( hasAcetaminophen(pt) === false ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false for patient without meds"};
        }

    },

    testPatientWithAcet : function(){

        var pt = setUp();

        if ( hasAcetaminophen(pt) === true ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected true for patient with active acetaminophen"};
        }

    }

};

