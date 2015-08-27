/**
 * title : PDC-733
 * description : Patients with documented chronic pain that have an active opioid medication.
 */

function map(patient) {


    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")) {
        return;
    }

    var hc = hasChronicPain( patient ) && hasOpioid( patient );
    var ap = activePatient( patient );

    var denominator = ap;

    var numerator   =  ap && hc;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );

}