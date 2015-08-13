/**
 * Query Title: PDC-1785_Obesity-Adult
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ap = activePatient(patient);

    var hm = hasOutOfRangeWC(patient, true) || hasOutOfRangeBMI(patient, true);

    var denominator = ap;

    var numerator = ap && hm;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
