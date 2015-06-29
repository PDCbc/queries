/**
 * title : PDC-1740
 * description : Counts the number of encounters within a given time period
 */

function map(patient) {

    try {
        if (filterProviders(patient.json.primary_care_provider_id, "PPh")) {

            //get the number of encounters in the last month.
            var encounters = countEncounters(patient, 1);

            var ageRange = getAgeRange(patient);

            var gender = getGender(patient);

            emit(physicianID, 1);

        }

    } catch (e) {

        emit("FAILURE_" + e);

    }
};
