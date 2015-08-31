/**
 * Tests for totalOpioids
 */

function setUp() {


    //do some setup here, usually create a patient
    //object and return it.

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
                "start_time"          : 1380240000,
                "end_time"            : 1384560000,
                "time"                : 1380240000,
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

    testFooBar: function () {

        if (true === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Some meaningful failure message."};
        }

    },
};

