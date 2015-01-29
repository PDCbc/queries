// Count active patients with no documented gender
// Nulls are expected, but this also counts undefined
//
// DQ-DEM-02
//
// Note: E2E doesn't differentiate for active status
// When that is added this query should be revised

function map( patient ){
  // Patient is hQuery's definition of a person.  Use its JSON object.
  var obj = patient.json;
  
  // Gender is a key in patient.json.  Select it.
  var gndr = obj.gender;
  
  if( gndr === null || gndr === undefined ){
    // Count null or undefined (=== checks for null or undefined)
    emit( "Numerator", 1 );
  }
  else if( gndr === "M" || gndr === "F" ){
    // Count M of F, but emit 0 so it isn't tallied.
    emit( "Numerator", 0 );
  }
  else{
    // Anything here is an expected value, so flag it.
    emit ( "Warning; unexpected value!!!"+ gndr, 1 );
  }
  // Everyone is counted towards the denominator.
  emit( "Denominator", 1 );
}
