function setUp(){
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "conditions" : [ 
            { 
                "_id": { "$oid": "551cce86c58406644d0000b1"},
                "codes": { "ICD9": ["586"]}, 
                "mood_code": "EVN",
                "time": 1263167138, 
                "description": "IMPAIRED RENAL FUNCTION"
            } 
        ],
        "results":[
            {
            "_id": {"$oid": "551cce86c58406644d0000df"},
              "codes": {
                "pCLOCD": ["14682-9"]
              },
              "mood_code": "EVN",
              "_type": "LabResult",
              "start_time": 1369995612,
              "description": "WBC",
              "status_code": {
                "value": "complete"
              },
              "values": [
                {
                  "_id": {"$oid": "551cce86c58406644d0000e0"},
                  "scalar": "151",
                  "units": "umol/L",
                  "_type": "PhysicalQuantityResultValue"
                }
              ]
            }
        ]

    }; 
    return obj; 
}

module.exports = {

    /*
    * Test behavior when no patient is provided, i.e. undefined condition.
    * 
    * Expected: false.
    */
    testUndefinedPatient : function(){

        var result = hasImpairedRenalFunction(); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input undefined"}

        }
    },

    /*
    * Test behavior when null patient is provided.
    * 
    * Expected: false.
    */
    testNullPatient : function(){

        var result = hasImpairedRenalFunction(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input null"}

        }

    },

    /*
    * Test normal behavior with ICD9: 586 
    * 
    * Expected: true.
    */
    testNormal : function(){

        var c = setUp(); 

        c = new hQuery.Patient(c);

        var result = hasImpairedRenalFunction(c); 


        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for patient with ICD9: 586"}

        }

    }, 

    /*
    * Test normal behavior with lab values that are in range
    * 
    * Expected: true.
    */
    testNormal2 : function(){

        var c = setUp(); 

        c.conditions = []; 

        c = new hQuery.Patient(c);

        try{

            var result = hasImpairedRenalFunction(c); 

        }catch(e){

            console.log(e);
        }



        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for patient with lab value 150 umol/L for LOINC:14682-9"}

        }

    }, 

    /*
    * Test behavior with empty conditions list
    *
    * Expected: false.
    */
    testEmptyConditionList : function(){

        var c = setUp(); 

        c.conditions = []; 
        delete c.results; 

        c = new hQuery.Patient(c);

        var result = hasImpairedRenalFunction(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with empty conditions list"}

        }

    }, 

    /*
    * Test behavior with undefined conditions list
    *
    * Expected: false.
    */
    testUndefinedConditionList : function(){

        var c = setUp(); 

        delete c.conditions; 
        c.results = []; 

        c = new hQuery.Patient(c);

        var result = hasImpairedRenalFunction(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with undefined conditions list"}

        }

    }, 

    /*
    * Test behavior with null conditions list
    *
    * Expected: false.
    */
    testNullConditionList : function(){

        var c = setUp(); 

        c.conditions = null; 
        c.results = []; 

        c = new hQuery.Patient(c);

        var result = hasImpairedRenalFunction(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with null conditions list"}

        }

    } 

}