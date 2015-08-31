/**
* Tests for isOpioid
*/

function setUp (){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "medications": [
            {
                "codes"               : {
                    "whoATC": [
                        "N02A00"
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

    testNormalCase : function(){

        var pt = setUp();

        var meds = pt.json.medications;

        if (isOpioid(meds[0])){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected true for a medication that has ATC: N02A00"};
        }

    },

    testNoOpioid : function(){

        var pt = setUp();

        var meds = pt.json.medications;

        meds[0].codes['whoATC'][0] = "NOT AN OPIOID";

        if (!isOpioid(meds[0])){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false for medication that is not an opioid"};
        }

    },

    testNullMed : function(){

        if (!isOpioid(null)){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false null medication"};

        }

    },

    testNoCodes : function(){

        var pt = setUp();

        var meds = pt.json.medications;

        delete meds[0].codes;

        if (!isOpioid(meds[0])){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false medication with no codes"};

        }

    },

    testNoWhoATCCodes : function(){

        var pt = setUp();

        var meds = pt.json.medications;

        meds[0].codes = {"NOT WHO ATC" : ['FOOBAR']};

        if (!isOpioid(meds[0])){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false medication with no codes"};

        }

    },

    testEmptyWhoATCCodes: function(){

        var pt = setUp();

        var meds = pt.json.medications;

        meds[0].codes = {"whoATC" : []};

        if (!isOpioid(meds[0])){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false medication with no whoATC codes"};

        }

    }
};

