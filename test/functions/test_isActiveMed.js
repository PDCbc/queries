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

    /*
    * Test case where medication is marked as completed and 
    *    the start of the medication is before the reference,
    *    the end of the medication is undefined.
    *    Reference time frame is the current time.
    * 
    * Expected: true. 
    */
    testMedCompleteStartInPastStopUndefined : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        //set start time to be 1 day in the past
        m.json.start_time = Math.floor((new Date()).getTime()/1000)-86400;   

        //stop is set to undefined. 
        delete m.json.end_time; 


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', undefined stop, and start is in the past"}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *    the start of the medication is before the reference,
    *    the end of the medication is null.
    *    Reference time frame is the current time.
    * 
    * Expected: true. 
    */
    testMedCompleteStartInPastStopNull : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        //set start time to be 1 day in the past
        m.json.start_time = Math.floor((new Date()).getTime()/1000)-86400;   

        //stop is set to null. 
        m.json.end_time = null; 


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', stop is null, and start is in the past"}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *    the start of the medication is before the reference,
    *    the end of the medication is null.
    *    Reference time frame is the current time.
    * 
    * Expected: true. 
    */
    testMedCompleteStartUndefinedStopInFuture : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        //set start_time to undefined.  

        delete m.json.start_time;

        //set end_time to 1 day in the future
        m.json.end_time = Math.floor((new Date()).getTime()/1000)+86400;   


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', start is undefined, and stop is in future."}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *    the start of the medication is before the reference,
    *    the end of the medication is null.
    *    Reference time frame is the current time.
    * 
    * Expected: true. 
    */
    testMedCompleteStartNullStopInFuture : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        //set start_time to undefined.  

        m.json.start_time = null;

        //set end_time to 1 day in the future
        m.json.end_time = Math.floor((new Date()).getTime()/1000)+86400;   


        try{
            var result = isActiveMed(m); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', start is null, and stop is in future."}

        } 

    },


    /*
    * Test the use of the referenceTime parameter.
    *   Medication is completed with undefined stop,
    *   and start before the referenceTime
    *
    * Expected: true
    */
    testMedCompleteWithReferenceTime : function(){

        var m = setUp(); 

        var ref = 0; //reference date is Jan 1st 1970. 

        m.json.start_time = -86400; //start is 1 day before reference.

        delete m.json.end_time;  //set end_time to undefined.

        try{
            var result = isActiveMed(m, ref); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', start is null, and stop is in future."}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *   start is in past, stop is also in past, but current time
    *   is within the 20% window. 
    * 
    * Expected: true. 
    */
    testMedCompleteWith20PercentWindow : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        var ref = 0; //reference is Jan 1st 1970.  

        //set start_time to 1 month before reference. 
        m.json.start_time = -2592000; 

        //set end_time to 1 day in the past
        m.json.end_time = -86400;   

        try{
            var result = isActiveMed(m, ref); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', start is in past, stop in past, within 20% window"}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *   start is in past, stop is also in past, but current time
    *   is inside the edge the 20% window. 
    *
    * The duration is 30 days, 20% of 30 days is 6 days
    * 
    * Expected: true. 
    */
    testMedCompleteInsideEdgeOf20PercentWindow : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        var ref = 518400-1; // reference is 6 days after Jan 1st 1970

        //start is 1 month before Jan 1st 1970
        m.json.start_time = -2592000; 

        //end is Jan 1st 1970
        m.json.end_time = 0;   

        try{
            var result = isActiveMed(m, ref); 
        }catch(e){
            return null; 
        }

        if(result === true){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected true when medication is marked as 'completed', start is in past, stop in past, within 20% window"}

        } 

    },

    /*
    * Test case where medication is marked as completed and 
    *   start is in past, stop is also in past, but current time
    *   is on the outside edge the 20% window. 
    *
    * The duration is 30 days, 20% of 30 days is 6 days
    * 
    * Expected: true. 
    */
    testMedCompleteOutsideEdgeOf20PercentWindow : function(){

        var m = setUp();

        m.json.statusOfMedication.value = "completed"; 

        var ref = 518400+1; // reference is 6 days after Jan 1st 1970

        //start is 1 month before Jan 1st 1970
        m.json.start_time = -2592000; 

        //end is Jan 1st 1970
        m.json.end_time = 0;   

        try{
            var result = isActiveMed(m, ref); 
        }catch(e){
            return null; 
        }

        if(result === false){

            return {result: true, message: "test passed!"}

        }else{

            return {result: false, message: "expected false when medication is marked as 'completed', start is in past, stop in past, just outside the 20% window"}

        } 

    },
    
}
