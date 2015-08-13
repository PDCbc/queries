//
// PDC-934_COPDandPneumococcal
//

function map(patient) {


    if (!filterProviders(patient.json.primary_care_provider_id, "PopulationHealth")) {
        return;
    }

    var obj = patient.json;

    var hv = hasPneumococcalVax(patient);

    var hc = hasCOPD(patient);

    var ia = activePatient(patient);

    var numerator = hv && hc && ia;

    var denominator = ia;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);
}
