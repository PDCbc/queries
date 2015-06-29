/**
 * A verifier function for the query: PDC-955_CHF
 *
 * @author: Simon Diemert
 * @date: 2015-05-07
 */

/*
 * @param results - the results from running map reduce.
 *
 * @return an object, {result : boolean, message: String}
 *   the result field is true if the results are as expected, false otherwise.
 *   the message field contains a message which is displayed if the test fails
 */
function verify(results) {

    if (!results || results.length !== 4) {

        return {result: false, message: "Number of results was not 4 as expected, was: " + results.length};

    }

    if (

        results[0]._id !== "male_70-79_PROVIDER1" ||
        results[1]._id !== "undifferentiated_30-39_PROVIDER1" ||
        results[2]._id !== "female_20-29_PROVIDER1" ||
        results[3]._id !== "undefined_20-29_PROVIDER1"

    ) {

        return {result: false, message: "Invalid or no _id field in the result."};

    }

    if (

        results[0].value !== 1 ||
        results[1].value !== 1 ||
        results[2].value !== 1 ||
        results[3].value !== 1


    ) {

        return {result: false, message: "Unexpected value in results."};

    }

    return {result: true};
}

module.exports = {
    verify: verify
}