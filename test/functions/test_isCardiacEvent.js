function setUp(){
    var obj = {
        "json" :{
            "codes" : { "ICD9" : [] }
        }
    }; 
    return obj; 
}

module.exports = {

    /*
    * Test behavior when no condition is provided, i.e. undefined condition.
    * 
    * Expected: false.
    */
    testUndefinedCondition : function(){

        var result = isCardiacEvent(); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input undefined"}

        }
    },

    /*
    * Test behavior when null condition is provided.
    * 
    * Expected: false.
    */
    testNullCondition : function(){

        var result = isCardiacEvent(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input null"}

        }

    }, 

    /*
    * Test behavior with undefined json field within the condition.
    * 
    * Expected: false.
    */
    testConditionWithUndefinedJson : function(){

        var m = setUp(); 

        delete m.json; 

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with undefined json field"}

        }
    },

    /*
    * Test behavior with null json field within the condition.
    * 
    * Expected: false.
    */
    testConditionWithJson : function(){

        var m = setUp(); 

        m.json = null; 

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with null json field"}

        }
    },

    /*
    * Test behavior with undefined codes field within the condition.
    * 
    * Expected: false.
    */
    testConditionUndefinedCodes : function(){

        var m = setUp(); 

        delete m.json.codes;

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with undefined json.codes field"}

        }
    },

    /*
    * Test behavior with null codes field within the condition.
    * 
    * Expected: false.
    */
    testConditionNullCodes : function(){

        var m = setUp(); 

        m.json.codes = null;

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with null json.codes field"}

        }
    },

    /*
    * Test behavior with empty codes field within the condition.
    * 
    * Expected: false.
    */
    testConditionEmptyCodes : function(){

        var m = setUp(); 

        m.json.codes = {};

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with empty json.codes field"}

        }
    },

    /*
    * Test behavior with codes that are not ICD9. 
    * 
    * Expected: false.
    */
    testConditionNonICD9Codes : function(){

        var m = setUp(); 

        m.json.codes = {"NOT_ICD9":["1234","54678"] };

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with cardiac codes field"}

        }
    },

    /*
    * Test behavior with ICD9 code that does not match cardio events
    * 
    * Expected: false.
    */
    testConditionNotICD9CardiacCode : function(){

        var m = setUp(); 

        m.json.codes =  {"ICD9":["123456"] };

        var result = isCardiacEvent(m); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for condition with that is not a cardiac"}

        }
    },

    /*
    * Test behavior with cardiac ICD9 code 
    * 
    * Expected: true.
    */
    testConditionCardioICD9Code1 : function(){

        var m = setUp(); 

        var test_codes = ["410.5", "411.2", "412.0", "429.7", "410", "411", "412", "V17.1", "438", "433.1", "434.1", "438.9"]; 


        for ( var i = 0; i < test_codes.length; i++ ){

            m.json.codes = {"ICD9":[test_codes[i]]};

            var result = isCardiacEvent(m); 

            if (result !== true ){

                return {result:false, message:"expected true for a condition with ICD9: "+test_codes[i]}

            }

        }

        return {result:true, message:"test passed!"}; 

    },


    /*
    * Test behavior with whoATC codes that are not strings.
    * 
    * Expected: false.
    */
    testConditionCardioICD9AsNonString : function(){

        var m = setUp(); 

        m.json.codes = {"ICD9":[1234, 4567] };

        try{
            var result = isCardiacEvent(m); 
        }catch(e){

            console.log(e);
            return null;

        }

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for a condition with ICD9 codes that are non-string "}

        }
    },
}