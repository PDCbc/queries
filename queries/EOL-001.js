/**
 * Query Title:EOL-001
 * Query Type:  Count
 * Description: Number of patients per provider who are end of life
 */
function map( patient ){

    emit("numerator_"+patient.json.primary_care_provider_id, +activePatient(patient));
    emit( "denominator_"+patient.json.primary_care_provider_id, +(activePatient(patient) && isEol(patient)) );

}
