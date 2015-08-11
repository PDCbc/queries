/**
* Tests for getGender
*/

function setUp (){


    //do some setup here, usually create a patient
    //object and return it.

    var obj =  {
        gender : 'F'
    };

    return new hQuery.Patient(obj);

}

module.exports = {

    testNullPatient : function(){

        var r = getGender(null);

        if ( r === null ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected null for null input, was: "+ r};

        }

    },

    testNoJsonObject : function(){

        var pt = setUp();

        delete pt.json;

        var r = getGender(pt);

        if ( r === null ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected null for undefined pt.json"};
        }

    },

    testNoGender : function(){

        var pt = setUp();

        delete pt.json.gender;

        var r = getGender(pt);

        if ( r === 'undefined' ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected 'undefined' for undefined pt.json.gendedr"};
        }

    },


    testFemalePatient : function(){

        var pt = setUp();

        var r = getGender(pt);

        if ( r === 'female' ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected 'female' for input with gender = 'F'"};
        }

    },

    testMalePatient : function(){

        var pt = setUp();

        pt.json.gender = 'M';

        var r = getGender(pt);

        if ( r === 'male' ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected 'male' for input with gender = 'M'"};
        }

    },

    testUndiffPatient : function(){

        var pt = setUp();

        pt.json.gender = 'UN';

        var r = getGender(pt);

        if ( r === 'undifferentiated' ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected 'undifferentiated' for input with gender = 'UN'"};
        }

    },

    testUnknownGenderCode : function(){

        var pt = setUp();

        pt.json.gender = 'NOT A GENDER CODE';

        var r = getGender(pt);

        if ( r === 'undefined' ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Expected 'undefined' for input with gender = 'NOT A GENDER CODE'"};
        }

    },
};

