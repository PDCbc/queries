/**
 * title : PDC-743
 * description : The percentage of patients with a diagnosis of Rheumatoid Arthritis (RA), Osteoarthritis (OA), or Lower Back Pain (LBP).
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var hc = hasChronicPain(patient);
    var oa = hasOA(patient);
    var lbp = hasLowerBackPain(patient);

    var denominator = true;

    var numerator = hc || oa || lbp;

    emit("denominator_" + patient.json.primary_care_provider_id, +denominator);

    emit("numerator_" + patient.json.primary_care_provider_id, +numerator);

}