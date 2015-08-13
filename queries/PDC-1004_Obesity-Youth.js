/**
 * Query Title: PDC-1004_Obesity-Youth
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ap = activePatient(patient);

    var ia = isAge(patient, 12, 19);

    var wc = hasOutOfRangeWC(patient, true);

    var bmi = hasOutOfRangeBMI(patient, true);

    var hm = wc || bmi;

    var denominator = ap & ia;

    var numerator = ap && ia & hm;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
