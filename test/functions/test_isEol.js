/*
* Unit tests for the isEol function
*/

function setUp() {
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "medications" : [{
            "_id" : { "$oid" : "551cce86c58406644d0000c4" },
            "_type" : "Medication",
            "time" : -1,
            "start_time" : new Date(), "end_time" : new Date(),
            "statusOfMedication" : { "value" : "active" },
            "codes" : {},
            "freeTextSig" : ""
        }]
    };

    return new hQuery.Patient(obj);
}

module.exports = {

	/*
	* Test case where a patient is undefined.
	*/
	testUndefinedPatient : function(){

		if(!isAge()){
			return {result : true, message: "test passed!"}	
		}else{
			return {result : false, message : "passing undefined patient to isAge() should yield false."}; 	
		}

	},

	/* test function for isEoL*/
	testEolPatient: function(){

        try {
            if (isEol(setUp())) {
                return {result: true, message: "test passed!"}
            } else {
                return {result: false, message: "passing undefined patient to isEol() should yield false."};
            }
        }catch(e){

                console.log(e);

        }
    }
}


