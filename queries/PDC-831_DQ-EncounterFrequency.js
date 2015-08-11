//PDC-831_EncounterFrquency
//% of patients with an encounter in the last 36 months

function map( patient ){

  // Everyone is counted towards the denominator.
  emit( "denominator_" + patient.json.primary_care_provider_id, 1 );

  // Has patient had an encounter in the last 36 months?
  emit("numerator_" + patient.json.primary_care_provider_id, (countEncounters(patient, 36) > 0 ) ? 1 : 0 );
}
