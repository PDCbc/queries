/**
 * Tests for codedMedications
 */

function setUp() {

    var now = Math.floor((new Date()).getTime() / 1000);

    var obj =   {
        "primary_care_provider_id": "PROVIDER1",
        "conditions" : [
            { "codes": { "ICD9": ["496"]}, "time": 1263167138, "description": "COPD"}
        ]
      };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNormalCase: function () {

        var pt = setUp();

        var cm = countConditions(pt);

        if ( cm === 1) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 1, actual : " + cm};

        }

    },

    testNullPatient: function () {

        var r = countConditions(null);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for null patient, got: " + r};
        }

    },

    testPatientWithoutJson: function () {

        var pt = setUp();

        delete pt.json;

        var r = countConditions(pt);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without a json field" + r};
        }

    },

    testPatientWithoutConditions: function () {

        var pt = setUp();

        delete pt.json.conditions;

        var r = countConditions(pt);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without conditions field" + r};
        }
    },

    testPatientWithEmptyConditions: function () {

        var pt = setUp();

        pt.json.conditions = [];

        var r = countConditions(pt);

        if (r === 0) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 0 for patient with empty conditions field" + r};
        }
    }
};
