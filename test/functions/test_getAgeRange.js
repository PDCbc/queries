/**
 * Tests for getAgeRange
 */

var ranges = {
    '0-9'  : {lower: 0, upper: 9},
    '10-19': {lower: 10, upper: 19},
    '20+'  : {lower: 20, upper: null}
};


module.exports = {

    testNormalAgeRange: function () {

        var d = new Date();

        d.setFullYear(d.getFullYear() - 10); //10 years old.

        d.setDate(d.getDate() - 1);  //Offset by 1 day.

        var p = new hQuery.Patient(
            {
                birthdate: Math.floor(d.getTime() / 1000)
            }
        );

        var result = getAgeRange(p, ranges);

        if ( result === "10-19") {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected range 10-19 for patient aged 10, was: "+result};
        }

    },

    testNormalAgeRange2: function () {

        var d = new Date();

        d.setFullYear(d.getFullYear() - 5); //5 years old.

        d.setDate(d.getDate() - 1);  //Offset by 1 day.

        var p = new hQuery.Patient(
            {
                birthdate: Math.floor(d.getTime() / 1000)
            }
        );

        var result = getAgeRange(p, ranges);

        if ( result === "0-9") {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected range 0-9 for patient aged 5, was: "+result};
        }

    },

    testMaxAgeRange: function () {

        var d = new Date();

        d.setFullYear(d.getFullYear() - 20); //20 years old.

        d.setDate(d.getDate() - 1);  //Offset by 1 day.

        var p = new hQuery.Patient(
            {
                birthdate: Math.floor(d.getTime() / 1000)
            }
        );

        var result = getAgeRange(p, ranges);

        if ( result === "20+") {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected range 20+ for patient aged 20, was: "+result};
        }

    },

    testAge0: function () {

        var d = new Date();

        d.setFullYear(d.getFullYear()); //0 years old.

        d.setDate(d.getDate() - 1);  //Offset by 1 day.

        var p = new hQuery.Patient(
            {
                birthdate: Math.floor(d.getTime() / 1000)
            }
        );

        var result = getAgeRange(p, ranges);

        if ( result === "0-9") {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected range 0-9 for patient aged 0, was: "+result};
        }

    }
};

