/**
 * A verifier function for the query: PDC-1918_CHF
 *
 * @author: Simon Diemert
 * @date: 2015-07-07
 */

/*
 * @param results - the results from running map reduce.
 *
 * @return an object, {result : boolean, message: String}
 *   the result field is true if the results are as expected, false otherwise.
 *   the message field contains a message which is displayed if the test fails
 */
function verify(results) {

    if (results.length !== 2) {

        return {result: false, message: "Length of result was :" + results.length + ": not 2 as expected."};
    }

    if (results[0]._id !== 'J07AL02_whoATC_PROVIDER1' || results[1]._id !== '12345_HC-DIN_PROVIDER1') {

        return {result: false, message: "keys did not match expected results"};

    }

    return {result: true};
}

module.exports = {
    verify: verify
};