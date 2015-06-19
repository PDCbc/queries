function setUpTest(){
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": -923616000,
        "encounters": [
            {
                "_id": {"$oid": "551cce86c58406644d0000b5"},
                "codes": {"code": ["REASON"],"codeSystem": ["ObservationType-CA-Pending"]},
                "mood_code": "EVN",
                "_type": "Encounter",
                "start_time": null,
                "description": "SOME DESCRIPTION WE DONT CARE ABOUT FOR THESE TESTS",
                "reason": {"_id": {"$oid": "551cce86c58406644d0000b6"},"codes": {"ObservationType-CA-Pending": ["REASON"], "Unknown": ["NI"]},"mood_code": "EVN","description": "", "start_time": 1380124200},
                "performer": {"_id": {"$oid": "551cce86c58406644d00008a"},"title": "","given_name": "","family_name": "qbGJGxVjhsCx/JR42Bd7tX4nbBYNgR/TehN7gQ==","specialty": "","npi": "","start": 1380124200,"end": null,"organization": {"_id": {"$oid": "551cce86c58406644d00008b"}}}
            }
        ],
    }; 

    return new hQuery.Patient(obj);  
}

module.exports = {

    /*
    * Test a single encounter that should be picked up as valid
    *
    * Expected: activePatient returns true. 
    */
	testSingleEncounter : function(){

        var p = setUpTest(); 


        try{

            var r = testEncounterTimes(p); 

        }catch(e){

            console.log(e);

        }


        return { result : r, message : ""} ;

	}

}
