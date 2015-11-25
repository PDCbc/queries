/**
 * title : PDC-734
 * description : Of patients who are over the age of 21, how many have an active opioid prescription but no documented diagnosis of chronic pain.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var hc  = hasChronicPain(patient);
    var op  = hasOpioid(patient);
    var ap  = activePatient(patient);
    var age = isAge(patient, 21);

    var denominator = age && ap && op;

    var numerator = age && ap && op && !hc;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);

}