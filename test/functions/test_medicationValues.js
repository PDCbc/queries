function setUpTest(){

    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "medications" : [
            {
                "_id" : { "$oid" : "551cce86c58406644d0000c4" }, 
                "_type" : "Medication", 
                "time" : -1,
                "start_time" : new Date(), 
                "end_time" : new Date(), 
                "statusOfMedication" : { "value" : "active" },
                "codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
                "freeTextSig" : "",
                "administrationTiming" : {
                    "frequency" : {
                        "numerator" : {
                            "unit" : null,
                            "value" : 1
                        },
                        "denominator" : {
                            "unit" : "d",
                            "value" : 1
                        }
                    },
                    "text" : "28 D"
                },
                "values" : [
                    {
                        "_id" : { "$oid" :"551cce86c58406644d0000dd"}, 
                        "scalar" : "40.0",
                        "units" : "MG",
                        "_type" : "PhysicalQuantityResultValue"
                    }
                ],
                "dose" : {
                    "low" : "1.0",
                    "high" : "1.0"
                }
            }
        ]
        
    }; 

    return new hQuery.Patient(obj);  
}

module.exports = {

    /*
    * Confirm that the patient API handles medication values
    * as expected.
    */
	testCorrectValues : function(){


        try{

            var p = setUpTest(); 
            var r = testMedicationValues(p); 

            if( r.d && r.timing && r.values ){

                return { result: true, message : ""}; 

            }else{

                return { result: false, message : "Fields were not accessible"}; 

            }

        }catch(e){
            console.log(e)
        }

        

	}

}
