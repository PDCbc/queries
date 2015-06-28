/**
 * Tests for countEncounters
 */

function setUp() {

    var now = Math.floor((new Date()).getTime() / 1000);

    var obj = {
        "_id"                         : "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id"    : "cpsid",
        "birthdate"                   : -923616000,
        "encounters"                  : [
            {"start_time": now, "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS"},
            {"start_time": now, "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS"},
            {"start_time": now, "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS"},
            {"start_time": now, "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS"},
        ]

    };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNormalCase: function () {

        var pt = setUp();

        pt.json.encounters[0].start_time -= 86400;
        pt.json.encounters[1].start_time -= 2 * 86400;
        pt.json.encounters[2].start_time -= 3 * 86400;
        pt.json.encounters[3].start_time -= 40 * 86400; //this should not be counted.

        var r = countEncounters(pt, 1);

        if (r === 3) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 3, actual : " + r};

        }

    },

    testNullPatient: function () {

        var r = countEncounters(null, 1);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for null patient, got: " + r};
        }

    },

    testNullMonths: function () {

        var r = countEncounters(setUp(), null);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for null months, got: " + r};
        }

    },

    testNonNumberMonths: function () {

        var r = countEncounters(setUp(), "NOT A NUMBER");

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected return value of null for not a number month, got: " + r};
        }

    },

    testPatientWithoutJson: function () {

        var pt = setUp();

        delete pt.json;

        var r = countEncounters(pt, 1);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without a json field" + r};
        }

    },

    testPatientWithoutEncounters: function () {

        var pt = setUp();

        delete pt.json.encounters;

        var r = countEncounters(pt, 1);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient without encounters field" + r};
        }
    },

    testPatientWithEmptyEncounters: function () {

        var pt = setUp();

        pt.json.encounters = [];

        var r = countEncounters(pt, 1);

        if (r === null) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected null for patient with empty encounters field" + r};
        }
    },

    testPatientWithEncounterNoStartTime: function () {

        var pt = setUp();

        delete pt.json.encounters[0].start_time;
        delete pt.json.encounters[1].start_time;
        delete pt.json.encounters[2].start_time;
        delete pt.json.encounters[3].start_time;

        var r = countEncounters(pt, 1);

        if (r === 0) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 0 for patient without start time in encounters " + r};
        }

    },

    testNoEncountersInTimeFrame: function () {

        var pt = setUp();

        //set the time stamps all to zero, definitely more than 1 month ago.
        pt.json.encounters[0].start_time = 0;
        pt.json.encounters[1].start_time = 0;
        pt.json.encounters[2].start_time = 0;
        pt.json.encounters[3].start_time = 0;

        var r = countEncounters(pt, 1);

        if (r === 0) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 0 for patients with no encounters in time frame " + r};
        }

    },

    testAllEncountersInRange: function () {

        var pt = setUp();

        //make last encounter a valid one.
        pt.json.encounters[3] = pt.json.encounters[0];

        var r = countEncounters(pt, 1);

        if (r === 4) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 4 encounters for patients 4 in range encounters" + r};
        }

    },


    testEncounterWithFutureTime: function () {

        var pt = setUp();

        var now = Math.floor((new Date()).getTime() / 1000);

        //put last encounter into future.
        pt.json.encounters[3].start_time = now + 10000000;

        var r = countEncounters(pt, 1);

        if (r === 3) {

            return {result: true, message: "Test Passed!"};

        } else {

            return {result: false, message: "Expected 3 encounters for patients 3 in range encounters" + r};
        }
    }

};

