/**
 * Query Title: PDC-1135E_LastLab-A1C>9point0wDiabetes
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ap = activePatient(patient);

    var hc = hasDiabetes(patient);

    var minDate = new Date();

    minDate.setMonth(minDate.getMonth() - 6);

    var maxDate;//undefined

    var hl = hasInRangeLab(patient, 'LOINC', '4548-4', false, 9.0, Number.POSITIVE_INFINITY, '%', minDate, maxDate, false);

    var denominator = ap && hc;

    var numerator = ap && hc && hl;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
