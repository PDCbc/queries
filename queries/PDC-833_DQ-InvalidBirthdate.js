// Count active patients with an invalid date of birth,
// excluding anyone over 120 years old
//
// PDC-833_DQ-InvalidBirthdate
//

function map( patient ){

  var bd = new Date( patient.json.birthdate*1000 );

  // Today's date.
  var now = new Date();

  // Calculate age using hQuery.Patient's age method.
  var age = patient.age(now);

  // Everyone is counted towards the denominator.
  emit( "denominator_" + patient.json.primary_care_provider_id, 1 );

  // Numerator = 1 for fail, 0 for pass, since we're counting fails.
  if( !validDate( bd ) || !validBirthdate( patient ) ){
    emit( "numerator_" + patient.json.primary_care_provider_id, 1 );
  }
  else  {
    emit( "numerator_" + patient.json.primary_care_provider_id, 0 );
  }
}
