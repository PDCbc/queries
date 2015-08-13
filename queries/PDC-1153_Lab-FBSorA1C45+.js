/**
 * Query Title: PDC-1153_Lab-FBSorA1C45+
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ap = activePatient(patient);

    var ia = isAge(patient, 45);

    var minDate = new Date();

    minDate.setFullYear(minDate.getFullYear() - 3);

    var fbs = hasFBS(patient, minDate);

    var a1c = hasA1C(patient, minDate);

    var hl = fbs || a1c;

    var denominator = ap && ia;

    var numerator = ap && ia && hl;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
