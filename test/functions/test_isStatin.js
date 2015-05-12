function setUp(){
    var obj = {
        "json" :{
            "codes" : { "whoATC" : [ "C10AA", "C10BX" ] }
        }
    }; 
    return obj; 
}

module.exports = {

    /*
    * Test behavior when no medication is provided, i.e. undefined medication.
    * 
    * Expected: false.
    */
    testUndefinedMed : function(){

        var result = isStatin(); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input undefined"}

        }
    },

    /*
    * Test behavior when null medication is provided.
    * 
    * Expected: false.
    */
    testNullMed : function(){

        var result = isStatin(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input null"}

        }

    }, 

    /*
    * Test behavior with undefined json field within the medication.
    * 
    * Expected: false.
    */
    testMedWithUndefinedJson : function(){

        var m = setUp(); 

        delete m.json; 

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with undefined json field"}

        }
    },

    /*
    * Test behavior with null json field within the medication.
    * 
    * Expected: false.
    */
    testMedWithJson : function(){

        var m = setUp(); 

        m.json = null; 

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with null json field"}

        }
    },

    /*
    * Test behavior with undefined codes field within the medication.
    * 
    * Expected: false.
    */
    testMedUndefinedCodes : function(){

        var m = setUp(); 

        delete m.json.codes;

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with undefined json.codes field"}

        }
    },

    /*
    * Test behavior with null codes field within the medication.
    * 
    * Expected: false.
    */
    testMedNullCodes : function(){

        var m = setUp(); 

        m.json.codes = null;

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with null json.codes field"}

        }
    },

    /*
    * Test behavior with empty codes field within the medication.
    * 
    * Expected: false.
    */
    testMedEmptyCodes : function(){

        var m = setUp(); 

        m.json.codes = {};

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with empty json.codes field"}

        }
    },

    /*
    * Test behavior with codes that are not whoATC. 
    * 
    * Expected: false.
    */
    testMedNonWhoATCCodes : function(){

        var m = setUp(); 

        m.json.codes = {"NOT_WHO_ATC":["1234","54678"] };

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with non-whoATC codes field"}

        }
    },

    /*
    * Test behavior with whoATC code that does not match statin
    * 
    * Expected: false.
    */
    testMedNotStatinWhoATCCode : function(){

        var m = setUp(); 

        m.json.codes =  {"whoATC":["123456"] };

        var result = isStatin(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for medication with that is not a statin"}

        }
    },

    /*
    * Test behavior with statin whoATC 
    * 
    * Expected: true.
    */
    testMedStatinWhoATCCode1 : function(){

        var m = setUp(); 

        m.json.codes = {"whoATC":["C10AA"] };

        var result = isStatin(m); 

        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for a medication with whoATC: C10AA"}

        }
    },

    /*
    * Test behavior with statin whoATC 
    * 
    * Expected: true.
    */
    testMedStatinWhoATCCode2 : function(){

        var m = setUp(); 

        m.json.codes = {"whoATC":["C10BX"] };

        var result = isStatin(m); 

        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for a medication with whoATC: C10BX"}

        }
    },

    /*
    * Test behavior with 2 statin whoATC codes
    * 
    * Expected: true.
    */
    testMedStatinWhoATCCode2 : function(){

        var m = setUp(); 

        m.json.codes = {"whoATC":["C10BX", "C10AA"] };

        var result = isStatin(m); 

        if (result === true ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected true for a medication with whoATC: C10AA and C10BX"}

        }
    },

    /*
    * Test behavior with whoATC codes that are not strings.
    * 
    * Expected: false.
    */
    testMedStatinWhoATCAsNoString : function(){

        var m = setUp(); 

        m.json.codes = {"whoATC":[1234, 4567] };

        try{
            var result = isStatin(m); 
        }catch(e){

            console.log(e);
            return null;

        }

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for a medication with whoATC that is non-string "}

        }
    },
}