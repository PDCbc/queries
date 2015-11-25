/**
 * title : PDC-1934
 * description : The percentage of calculated active patients that have a diagnosis of chronic pain and have active opioid prescriptions with a medical equivalent of 50-100 mg/day.
 *
 * @param patient {Patient} - hquery patient api object.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var op = totalOpioids(patient);
    var ap = activePatient(patient);
    var cp = hasChronicPain(patient);


    var denominator = ap & cp;
    var numerator   = denominator && (op < 100 && op >= 50);

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);
    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);

}