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
            "codes" : {"whoATC":["C01AA"]}, 
            "freeTextSig" : "",
            "values" :[
                {
                  "_id": {"$oid": "551cce86c58406644d0000c5"},
                  "scalar": "125.0",
                  "units": "MCG",
                  "_type": "PhysicalQuantityResultValue"
                }
            ]
        }]
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

        try{

            var result = hasActiveDigoxin(); 

        }catch(e){
            console.log(e);
        }

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

        var result = hasActiveDigoxin(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input null"}

        }

    },

    /*
    * Test normal behavior with whoATC: C10AA
    * 
    * Expected: true.
    */
    testNormal : function(){

        var c = setUp(); 

        c = new hQuery.Patient(c);

        try{
            var result = hasActiveDigoxin(c); 
        }catch(e){
            console.log(e);
        }


        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for patient with active digoxin"}

        }

    }, 

    /*
    * Test behavior with empty medications list
    *
    * Expected: false.
    */
    testEmptyMedicationList : function(){

        var c = setUp(); 

        c.medications = []; 

        c = new hQuery.Patient(c);

        var result = hasActiveDigoxin(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with empty medication list"}

        }

    }, 

    /*
    * Test behavior with undefined medication list
    *
    * Expected: false.
    */
    testUndefinedMedicationList : function(){

        var c = setUp(); 

        delete c.medications; 

        c = new hQuery.Patient(c);

        var result = hasActiveDigoxin(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with undefined medication list"}

        }

    }, 

    /*
    * Test behavior with null medication list
    *
    * Expected: false.
    */
    testNullMedicationList : function(){

        var c = setUp(); 

        c.medications = null; 

        c = new hQuery.Patient(c);

        var result = hasActiveDigoxin(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with null medication list"}

        }

    }, 

    /*
    * Test behavior with completed medication that is a digoxin
    *
    * Expected: false.
    */
    testInactiveDigoxinInList : function(){

        var c = setUp(); 

        c.medications[0].codes["whoATC"] = ["C10AA"];
        c.medications[0].statusOfMedication = "completed";
        c.medications[0].start_time = 0; //some time around Jan 1st 1970
        c.medications[0].end_time = 1000;
        c.medications[0].values = [{"scalar":"200.0"}];


        c = new hQuery.Patient(c);

        var result = hasActiveDigoxin(c); 


        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for patient with inactive digoxin"}

        }
    } 
 
}