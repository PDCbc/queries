/**
 * Query Title: PDC-1738
 * Query Type:  Ratio
 * Description: The ratio of active to inactive patients.
 */
function map(patient) {

    if (filterProviders(patient.json.primary_care_provider_id, "ALL")) {

        var denominator = true;

        var numerator = denominator && activePatient(patient);

        emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

        emit("numerator_" + patient.json.primary_care_provider_id, +numerator);

    }

}