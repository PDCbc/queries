/**
 * Tests for codedMedications
 */

function setUp() {

    var now = Math.floor((new Date()).getTime() / 1000);

    var obj =   {
        "primary_care_provider_id": "PROVIDER1",
        "medications":
        [
          {
            "_id" : { "$oid" : "551cce86c58406644d0000c4" },
            "_type" : "Medication",
            "freeTextSig" : "77",
            "statusOfMedication" : { "value" : "active" },
            "start_time" : -1,
            "end_time" : 1,
            "time" : -1,
            "codes" : {
              "HC-DIN" : [ "00559407" ],
              "whoATC" : [ "N02BE01" ]
              }
          },

        ]
      };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNormalCase: function () {

        var pt = setUp();

        var cm = countMedications(pt);

        if ( cm === 1) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 1, actual : " + cm};

        }

    },

    testNullPatient: function () {

        var r = countMedications(null);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for null patient, got: " + r};
        }

    },

    testPatientWithoutJson: function () {

        var pt = setUp();

        delete pt.json;

        var r = countMedications(pt);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without a json field" + r};
        }

    },

    testPatientWithoutMedications: function () {

        var pt = setUp();

        delete pt.json.medications;

        var r = countMedications(pt);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without medications field" + r};
        }
    },

    testPatientWithEmptyMedications: function () {

        var pt = setUp();

        pt.json.medications = [];

        var r = countMedications(pt);

        if (r === 0) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 0 for patient with empty medications field" + r};
        }
    }
};
