/**
 * title : PDC-995
 * description : The percentage of females aged 50 to 70 years old who had a mammogram in the last 2 years.
 *
 * @param patient {Patient} - hquery patient api object.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection|Polypharmacy|PopulationHealth|DataQuality|...")) {
        return;
    }

    var ap = activePatient(patient);

    var ia = isAge(patient, 50, 70);

    var hc = hasRecentMammogram(patient);

    var numerator = ap && ia && hc;

    var denominator = ap && ia;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);


}