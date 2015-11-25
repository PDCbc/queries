/**
 * Tests for hasOpioid
 */

function setUp() {


    //do some setup here, usually create a patient
    //object and return it.

    var obj = {
        "_id"                         : "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id"    : "cpsid",
        "birthdate"                   : 0,
        "medications"                 : [{
            "_id"               : {"$oid": "551cce86c58406644d0000c4"},
            "_type"             : "Medication",
            "time"              : -1,
            "start_time"        : new Date(), "end_time": new Date(),
            "statusOfMedication": {"value": "active"},
            "codes"             : {"whoATC": ["N02A"]},
            "freeTextSig"       : "",
            "values"            : [
                {
                    "_id"   : {"$oid": "551cce86c58406644d0000c5"},
                    "scalar": "125.0",
                    "units" : "MCG",
                    "_type" : "PhysicalQuantityResultValue"
                }
            ]
        }]
    }

    return new hQuery.Patient(obj);

}

module.exports = {

    testInvalidPatient: function () {

        var r = hasOpioid(null);

        if (r === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected false to be returned for null pt argument."};
        }

    },

    testPatientWithOpioid : function(){

        var pt = setUp();

        var r = hasOpioid(pt);

        if (r === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected true for patient with opioid medication (ATC: N02A)."};
        }

    },

    testPatientWithNoOpioid : function(){

        var pt = setUp();

        pt.json.medications[0].codes.whoATC = ["NOT_OPIOID"];


        var r = hasOpioid(pt);

        if (r === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected false for patient without opioid medication"};
        }

    }
};

