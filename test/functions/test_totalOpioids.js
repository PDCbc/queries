/**
* Tests for totalOpioids
*/

function setUp (){


    //do some setup here, usually create a patient
    //object and return it.

    var obj =  {};

    return new hQuery.Patient(obj);

}

module.exports = {

    testFooBar : function(){

        if ( true === true ){

            return {result : true, message : "test passed"};

        }else{

            return {result : false, message : "Some meaningful failure message."};
        }

    }, 
};

