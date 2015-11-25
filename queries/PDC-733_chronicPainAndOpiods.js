/**
 * title : PDC-733
 * description : Patients with documented chronic pain that have an active opioid medication.
 */

function map(patient) {


    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var hc  = hasChronicPain(patient);
    var op  = hasOpioid(patient);
    var ap  = activePatient(patient);
    var age = isAge(patient, 21);

    var denominator = age && ap;

    var numerator = age && ap && hc && op;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);

}