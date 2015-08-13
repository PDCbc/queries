/**
 * Query Title: PDC-1903_Lab-FBS46+
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ap = activePatient(patient);

    var ia = isAge(patient, 46);

    var minDate = new Date();

    minDate.setFullYear(minDate.getFullYear() - 3);

    var hl = hasFBS(patient, minDate);

    var denominator = ap && ia;

    var numerator = ap && ia && hl;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
