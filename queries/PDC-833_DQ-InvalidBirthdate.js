// Count active patients with an invalid date of birth,
// excluding anyone over 120 years old
//
// PDC-833_DQ-InvalidBirthdate
//

function map( patient ){
  // Patient is hQuery's definition of a person.  Use its JSON object.
  var obj = patient.json;

  // Birthdate is a key in patient.json.  Select it.
  // Note: Formatted in milliseconds, so multiply by 1000.
  var bdNumber = obj.birthdate*1000;

  // This is a date, so format it as one.  (we know this by context)
  var bd = new Date( bdNumber );

  // Today's date.
  var now = new Date();

  // Calculate age using hQuery.Patient's age method.
  var age = patient.age(now);

  // JavaScript standard, says a malformed Date object's getTime method
  // will return NaN (not a number).
  function invalidDateFinder( d ){
    // Grab just the time;
    var time = d.getTime();

    // Use the Number object's isNaN funtion.
    return Number.isNaN( time );
  }

  // Everyone is counted towards the denominator.
  emit( "denominator_" + patient.json.primary_care_provider_id, 1 );

  console.log('age: ' + age);

  // Numerator = 1 for fail, 0 for pass, since we're counting fails.
  if( invalidDateFinder( bd ) || age > 120 ){
    emit( "numerator_" + patient.json.primary_care_provider_id, 1 );
  }
  else  {
    emit( "numerator_" + patient.json.primary_care_provider_id, 0 );
  }
}
