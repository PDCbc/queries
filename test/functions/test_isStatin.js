function setUp(){
    var obj = {
        "json" :{
            "codes" : { "whoATC" : [ "C10AA", "C10BX" ] }
        }
    }; 
    return obj; 
}

module.exports = {

    testUndefinedMed : function(){

        var result = isStatin(); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input undefined"}

        }
    },

    testNullMed : function(){

        var result = isStatin(null); 

        if (result === false ){

            return {result : true, message:"test passed!"}

        }else{

            return {result:false, message:"expected false for input undefined"}

        }

    }
}