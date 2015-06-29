/**
 * Query Title:EOL-001
 * Query Type:  Count
 * Description: Number of patients per provider who are end of life
 */
function map( patient ){

  emit( patient.json.primary_care_provider_id, +isEol() );

}