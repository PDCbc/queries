/**
 * Query Title: PDC-602_DQ-Obesity-Adult
 * Query Type:  Ratio
 */
function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {
        return;
    }

    var ia = isAge(patient, 20);

    var ap = activePatient(patient);

    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 2);

    var wc = hasWC(patient, minDate);

    var bmi = hasBMI(patient, minDate);

    var hm = wc || bmi;

    var denominator = ia && ap;

    var numerator = ia && ap && hm;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
