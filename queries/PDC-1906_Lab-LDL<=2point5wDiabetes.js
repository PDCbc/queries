/**
 * Query Title: PDC-1906_Lab-LDL<=2point5wDiabetes
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

    minDate.setFullYear(minDate.getFullYear() - 1);

    var maxDate;//undefined

    var hl = hasInRangeLab(patient, 'LOINC', '39469-2', false, Number.NEGATIVE_INFINITY, 2.5, 'mmol/L', minDate, maxDate, false);

    var denominator = ap && hc;

    var numerator = ap && hc && hl;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
