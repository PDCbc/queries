// Count active patients with no date of birth
//
// DQ-DEM-04
//
// Note: E2E doesn't differentiate for active status
// -- When that is added this query should be revised

function map( patient ){
  // Patient is hQuery's definition of a person.  Use its JSON object.
  var obj = patient.json;
  
  // Birthdate is a key in patient.json.  Select it.
  // Note: Formatted in milliseconds, so multiply by 1000.
  var bdNumber = obj.birthdate*1000;
  
  // This is a date, so format it as one.  (we know this by context)
  var bd = new Date( bdNumber );
      
  if( bd === null || bd === undefined ){
    // Count null or undefined (OR use == which accepts null or undefined)
    emit( "Numerator", 1 );
  }
  else {
    // If there is a birthday, then emit 0 which isn't tallied.
    emit( "Numerator", 0 );
  }
  
  // Everyone is counted towards the denominator.
  emit( "Denominator", 1 );
}
