/*
 * Filters out providers based on id's and the initiative they are in.
 *
 * @param providerId {string} - the provider identifier to filter against.
 * @param initiative {string} - the initiative identifier. One of:
 *        - "PPhRR" : polypharmacy
 *       - "PracticeReflection" : Practice Reflection
 *       - "PopulationHealth" : PopulationHealth
 *       - "Attachment" : Attachment Initiative
 *       - 'ALL' : all initiatives allow these queries.
 *
 * @returns - true if the provider is part of the specified initiative
 *               false otherwise.
 */
function filterProviders(providerId, initiative) {

    //check that we have valid inputs
    if (!providerId || !initiative) {

        return false;

    }

    var inits = {

        "PPhRR"             : [
            "cpsid",  //currently contains some test values.
            "PROVIDER1",
            "PROVIDER2"
        ],
        "PracticeReflection": [
            "cpsid",  //currently contains some test values.
            "PROVIDER1",
            "PROVIDER2"
        ],
        "PopulationHealth"  : [
            "cpsid",  //currently contains some test values.
            "PROVIDER1",
            "PROVIDER2"
        ],
        "Attachment" : [
            "cpsid",  //currently contains some test values.
            "PROVIDER1",
            "PROVIDER2"
        ]
    };


    if (initiative === "ALL") {

        //if we are checking for all, just check that they are in
        // on of the initiatives.

        for (var k in inits) {

            if (inits[k].indexOf(providerId) > -1) {

                return true;

            }

        }

        //if we get to here, we have not found them in an initiative,
        // we return false.
        return false;

    } else {

        //check that the initiative is valid.
        if (inits[initiative] === undefined) {

            return false;

        }

        if (inits[initiative].indexOf(providerId) > -1) {

            return true;

        } else {

            return false;

        }

    }

}
