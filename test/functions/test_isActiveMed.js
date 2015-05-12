function setUp() {
    var obj = {
        "json" : {
            "_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication", "time" : -1,
            "start_time" : new Date(), "end_time" : new Date(), 
            "statusOfMedication" : { "value" : "active" },
            "codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
            "freeTextSig" : ""
        }
    };   

    return obj; 
}

module.exports = {

    /*
    * Test the case where the medication is undefined.
    *   
    * Expected: false.
    */
    testUndefinedMediation : function(){

        try{
            var result = isActiveMed(); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false for undefined medication object"}

        }
    }, 

    /*
    * Test the case where the medication is null.
    *   
    * Expected: false.
    */
    testNullMedication : function(){

        try{
            var result = isActiveMed(null); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false for null medication object"}

        }
    },

    /*
    * Test the case where the medication is flagged as active
    *   
    * Expected: true.
    */
    testMedicationFlaggedAsActive : function(){

       try{
            var result = isActiveMed(setUp()); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true for a medication marked as active"}

        } 

    },

    /*
    * Test case where medication has an undefined status field.
    *
    * Expected: false.
    */
    testMedWithUndefinedStatus : function(){

        var m = setUp(); 

        delete m.json.statusOfMedication; 

        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication has undefined statusOfMedication field"}

        } 

    }, 

    /*
    * Test case where medication has a null status field.
    *
    * Expected: false.
    */
    testMedWithNullStatus : function(){

        var m = setUp(); 

        m.json.statusOfMedication = null; 

        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication has null statusOfMedication field"}

        } 

    }, 

    /*
    * Test case where medication has a undefined statusOfMedication.value field.
    *
    * Expected: false.
    */
    testMedWithUndefinedStatusValue : function(){

        var m = setUp(); 

        delete m.json.statusOfMedication.value;

        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication has undefined statusOfMedication.value field"}

        } 

    }, 

    /*
    * Test case where medication has a null statusOfMedication.value field.
    *
    * Expected: false.
    */
    testMedWithNullStatusValue : function(){

        var m = setUp(); 

        m.json.statusOfMedication.value = null;

        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication has null statusOfMedication.value field"}

        } 

    }, 

    /*
    * Test case where medication is marked as completed and 
    *    both the start and stop of the medication are undefined.
    * 
    * Expected: false. 
    */
    testMedCompleteAndUndefinedStartStop : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        delete m.json.start_time;  
        delete m.json.end_time; 


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication is completed and has undefined start_time and end_tim"}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *    both the start and stop of the medication are undefined.
    * 
    * Expected: false. 
    */
    testMedCompleteAndUndefinedStartStop : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        delete m.json.start_time;  
        delete m.json.end_time; 


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication is completed and has undefined start_time and end_tim"}

        } 

    },

}