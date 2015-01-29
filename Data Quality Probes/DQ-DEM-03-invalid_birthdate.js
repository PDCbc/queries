// Count active patients with an invalid date of birth
//
// DQ-DEM-03
//
// Note: E2E doesn't differentiate for active status
// -- When that is added this query should be revised

function map( patient ){
  // Patient is hQuery's definition of a person.  Use its JSON object.
  var obj = patient.json;
  
  // Birthdate is a key in patient.json.  Select it.
  var bdNumber = obj.birthdate;
  
  // This is a date, so format it as one.  (we know this by context)
  var bd = new Date( bdNumber );
  
  // EMCA-262 (standard) says invalid dates have time = NaN.
  function invalidDateFinder( d ){
    // Grab just the time;
    var time = d.getTime();
    
    // Use the Number object's isNaN funtion.
    return Number.isNaN( time );
  }
  
  // Numerator = 1 for fail, 0 for pass, since we're counting fails.
  if( invalidDateFinder( bd )){
    emit( "Numerator", 1 );
  }
  else  {
    emit( "Numerator", 0 );
  }
  
  // Everyone is counted towards the denominator.
  emit( "Denominator", 1 );
}
