/**
 * Tests for totalOpioids
 */

function setUp() {


    //do some setup here, usually create a patient
    //object and return it.

    var start = new Date();
    var stop = new Date();

    start.setMonth((start.getMonth() + 1) % 12);
    stop.setMonth((stop.getMonth() - 1) % 12);

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "medications": [
            {
                "codes"               : {
                    "whoATC": [
                        "N02BE01"
                    ]
                },
                "administrationTiming": {
                    "frequency": {
                        "numerator"  : {
                            "unit" : null,
                            "value": 4
                        },
                        "denominator": {
                            "unit" : "d",
                            "value": 1
                        }
                    },
                    "text"     : "25 D"
                },
                "freeTextSig"         : " E2E_PRN_FLAG E2E_LONG_TERM_FLAG",
                "dose"                : {
                    "low" : "1.0",
                    "high": "2.0"
                },
                "statusOfMedication"  : {
                    "value": "active"
                },
                "productForm"         : {
                    "code"       : "TAB",
                    "codeSystem" : "2.16.840.1.113883.1.11.14570",
                    "displayName": "TABLET"
                },
                "description"         : "OPIOID",
                "start_time"          : Math.floor(start.getTime()/1000),
                "end_time"            : Math.floor(stop.getTime()/1000),
                "values"              : [
                    {
                        "_id"   : {
                            "$oid": "551cce86c58406644d0000c5"
                        },
                        "scalar": "500.0",
                        "units" : "MG",
                        "_type" : "PhysicalQuantityResultValue"
                    }
                ]

            }
        ]
    };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNullPatient: function () {

        if (totalOpioids(null) === 0) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected 0 for null patient"};
        }

    },

    testPatientWithNoMeds: function () {

        var pt = setUp();

        delete pt.json.medications;

        if (totalOpioids(null) === 0) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected 0 for patient without any meds"};
        }

    },

    testPatientWithNoOpioids: function () {

        var pt = setUp();

        if (totalOpioids(pt) === 0) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected 0 for patient without any opioids"};
        }

    },

    testPatientWithOpioids: function () {


        var tmp_date = new Date();

        tmp_date.setFullYear(tmp_date.getFullYear() - 1);

        var pt = setUp();

        pt.json.medications[0].codes['whoATC'] = ["N02A00"];
        pt.json.medications[0].start_time = Math.floor(tmp_date.getTime()/1000);
        pt.json.medications[0].end_time = Math.floor(tmp_date.getTime()/1000);

        if (totalOpioids(pt) === 2000) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected 2000 for patient with opioid 500 mg x 4 per day."};
        }

    }
};

