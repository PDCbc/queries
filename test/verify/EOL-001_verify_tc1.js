/**
* A verifier function for the query: EOL-001
*
*/

/*
* @param results - the results from running map reduce. 
* 
* @return an object, {result : boolean, message: String}  
*   the result field is true if the results are as expected, false otherwise.
*   the message field contains a message which is displayed if the test fails
*/
function verify(results){
    //test for undefined providers:
    for(i in results){
        if(results[i]._id.match(".*_[0-9]*-[0-9]*_undefined")){
            return {result: false, message: "undefined provider"};
        }
    }

    //test for the right number of emits.
    if(results[1].value!= 2){
        return {result: false, message: "number of patients emitted was not correct"};
    }

    return {result: true, message: "test passed!"};
}

module.exports = {
    verify: verify
}