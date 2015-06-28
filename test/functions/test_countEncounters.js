/**
 * Tests for countEncounters
 */

function setUp() {

    var now = Math.floor((new Date()).getTime()/1000);

    var obj = {
        "_id"                         : "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id"    : "cpsid",
        "birthdate"                   : -923616000,
        "encounters"                  : [
            {"start_time": now , "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS"},
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

        pt.json.encounters[0].start_time -=  86400;
        pt.json.encounters[1].start_time -=  2*86400;
        pt.json.encounters[2].start_time -=  3*86400;
        pt.json.encounters[3].start_time -=  40*86400; //this should not be counted.

        var r = countEncounters(pt, 1);

        if( r === 3){

            return {result: true, message: "Test Passed!"};

        }else{

            return {result: false, message: "Expected 3, actual : "+r};

        }


    }

};

