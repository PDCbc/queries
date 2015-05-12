function setUp(){
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "conditions" : [ 
            { 
                "_id": { "$oid": "551cce86c58406644d0000b1"},
                "codes": { "ICD9": ["410"]}, 
                "mood_code": "EVN",
                "time": 1263167138, 
                "description": "SOME CARDIAC EVENT LIKE A STROKE OR MI"
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

        var result = hasCardiacEvent(); 

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

        var result = hasCardiacEvent(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input null"}

        }

    },

    /*
    * Test normal behavior with ICD9: 410
    * 
    * Expected: true.
    */
    testNormal : function(){

        var c = setUp(); 

        c = new hQuery.Patient(c);

        var result = hasCardiacEvent(c); 


        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for patient with ICD9: 410"}

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

        c = new hQuery.Patient(c);

        var result = hasCardiacEvent(c); 


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

        c = new hQuery.Patient(c);

        var result = hasCardiacEvent(c); 


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
    testEmptyConditionList : function(){

        var c = setUp(); 

        c.conditions = null; 

        c = new hQuery.Patient(c);

        var result = hasCardiacEvent(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with null conditions list"}

        }

    } 

}