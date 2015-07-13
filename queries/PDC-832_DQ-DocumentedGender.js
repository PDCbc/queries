//PDC-832_DQ-DocumentedGender
//% of patients with a documented gender

function map( patient ){

  var gender = patient.gender();

  var genders = ['F','M','UN'];

  // Everyone is counted towards the denominator.
  emit( "denominator_" + patient.json.primary_care_provider_id, 1 );

  // Does the patient have a documented gender?
  emit("numerator_" + patient.json.primary_care_provider_id, ( genders.indexOf(gender) === -1 ) ? 1 : 0 );
}
