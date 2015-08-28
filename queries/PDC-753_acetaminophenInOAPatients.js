/**
 * title : PDC-753
 * description : The percentage of patients who have been prescribed acetaminophen as a first line of non-narcotic therapy.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection|Polypharmacy|PopulationHealth|DataQuality|...")) {
        return;
    }

    //YOUR QUERY LOGIC HERE
    //SUGGEST TO OFFLOAD THIS TO FUNCTIONS.

    emit("SOME KEY", 1);

}