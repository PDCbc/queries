/**
 * title : PDC-1740
 * description : Counts the number of encounters within a given time period
 */

function map(patient) {

    try {


        if (filterProviders(patient.json.primary_care_provider_id, "PPhRR")) {

        //get the number of encounters in the last month.
        var encounters = countEncounters(patient, 1);

        var ageRange = getAgeRange(patient);

        var gender = getGender(patient);

        if (encounters !== null && ageRange !== null && gender !== null){

            emit(gender+"_"+ageRange+"_"+patient.json.primary_care_provider_id, encounters);

        }

    }

    } catch (e) {

        emit("FAILURE_" + e);

    }
}
