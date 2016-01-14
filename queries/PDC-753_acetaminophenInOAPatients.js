/**
 * title : PDC-753
 * description : The percentage of active, osteoarthritis patients who have been prescribed acetaminophen as a first line of non-narcotic therapy.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var active = activePatient(patient);
    var oa = hasOA(patient);
    var acet = hasAcetaminophen(patient);

    var den = active && oa;

    var num = den && acet;

    emit("denominator_" + patient.json.primary_care_provider_id, +den);
    emit("numerator_" + patient.json.primary_care_provider_id, +num);

}
