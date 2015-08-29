/**
 * title : $$TITLE$$
 * description : $$DESCRIPTION$$
 *
 * @param patient {Patient} - hquery patient api object.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection|Polypharmacy|PopulationHealth|DataQuality|...")) {
        return;
    }

    //YOUR QUERY LOGIC HERE
    //SUGGEST TO OFFLOAD THIS TO FUNCTIONS.

    emit("SOME KEY", 1);

}