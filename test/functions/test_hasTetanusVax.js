/**
 * Tests for hasTenanusVax
 */

function setUp() {


    //do some setup here, usually create a patient
    //object and return it.

    var obj = {
        "immunizations": [
            {
                "_id"        : {
                    "$oid": "551cce86c58406644d0000c1"
                },
                "codes"      : {
                    "whoATC": [
                        "J07AM00"
                    ]
                },
                "mood_code"  : "EVN",
                "_type"      : "Immunization",
                "start_time" : 1346457600,
                "description": "Td"
            }]
    };

    return new hQuery.Patient(obj);

}

module.exports = {

    testHasTetanusVax : function () {

        var pt = setUp();

        if (hasTenanusVax(pt) === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Patient did not have tetanus vaccination as expected."};
        }

    },

    testNoTetanusVax : function () {

        var pt = setUp();

        pt.json.immunizations[0].codes.whoATC[0] = "NOT TETANUS";

        if (hasTenanusVax(pt) === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Patient was indicated to have tetanus vax even though they actually do not. "};
        }

    },

    testNoWhoATC : function () {

        var pt = setUp();

        delete pt.json.immunizations[0].codes['whoATC'];
        pt.json.immunizations[0].codes['NOTWHO'] =[];
        pt.json.immunizations[0].codes['NOTWHO'].push("NOT TETANUS");


        if (hasTenanusVax(pt) === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Patient was indicated to have tetanus vax even though they actually do not. "};
        }

    }
};

