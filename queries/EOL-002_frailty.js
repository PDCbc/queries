/**
 * Query Title:EOL-002_frailty
 * Query Type:  Count
 * Description: Number of patients per provider who are frail
 */
function map( patient ){

    emit("denominator_"+patient.json.primary_care_provider_id, +activePatient(patient));
    emit( "numerator_"+patient.json.primary_care_provider_id, +(activePatient(patient) && isFrail(patient)) );

}
