/**
 * Tests for codedConditions
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

        console.log('testNormalCase');

        var pt = setUp();

        var cc = countCodedConditions(pt);

        if ( cc === 1) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 1, actual : " + cc};

        }

    },

    testNullPatient: function () {

        var cc = countCodedConditions(null);

        if (cc === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for null patient, got: " + cc};
        }

    },

    testPatientWithoutJson: function () {

        var pt = setUp();

        delete pt.json;

        var cc = countCodedConditions(pt);

        if (cc === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without a json field" + cc};
        }

    },

    testPatientWithoutConditions: function () {

        var pt = setUp();

        delete pt.json.conditions;

        var cc = countCodedConditions(pt);

        if (cc === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without conditions field" + cc};
        }
    },

    testPatientWithEmptyConditions: function () {

        var pt = setUp();

        pt.json.conditions = [];

        var cc = countCodedConditions(pt);

        if (cc === 0) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 0 for patient with empty conditions field" + cc};
        }
    }
};
