/**
* Tests for hasRecentMammogram
*/

function setUp (){


    //do some setup here, usually create a patient
    //object and return it.

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "results": [
            {
                "_id": {
                    "$oid": "551cce86c58406644d0000df"
                },
                "codes": {
                    "LOINC": [
                        "14771-0"
                    ]
                },
                "_type": "LabResult",
                "interpretation": {
                    "code": "N",
                    "codeSystem": "ObservationInterpretation"
                },
                "start_time": 1369995612,
                "description": "WBC",
                "status_code": {
                    "value": "complete"
                },
                "referenceRange": "Normal Reference range is greater than 4.0",
                "values": [
                    {
                        "_id": {
                            "$oid": "551cce86c58406644d0000e0"
                        },
                        "scalar": "8.0",
                        "units": "giga/L",
                        "_type": "PhysicalQuantityResultValue"
                    }
                ]
            }
        ]
    };

    return obj;

    return new hQuery.Patient(obj);

}

module.exports = {

    testNullPatient : function(){

        var r = hasRecentMammogram(null);

        if ( r === false ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected false for null patient"};
        }

    },

    testValidMammogram : function(){

        var p = new hQuery.Patient(setUp());

        var now = new Date();

        now.setFullYear(now.getFullYear() - 1);

        p.json.results[0].start_time = Math.floor(now.getTime()/1000);
        p.json.results[0].codes["LOINC"] = ["24606-6"];

        var r = hasRecentMammogram(p);

        if ( r === true ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected true for patient who has mammogram."};
        }

    },
};

