// Reference Number: PDC-001
// Query Title: Population profile by age and gender

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  //Store age and gender, via patient Object functions
  var age = patient.age();
  var gdr = patient.gender();

  // Convert gdr to an expected value
  if( gdr && gdr.toString().toUpperCase() === "F" )
    gdr = "female_";
  else if( gdr && gdr.toString().toUpperCase() === "M" )
    gdr = "male_";
  else
    gdr = "undifferentiated_";

  // Edge cases assigned -1 (out of specified ranges)
  if( typeof age !== 'number' || age < 0 ){
    emit( "age_unspecified" + pid, 1 );
    age = -1;
  }

  // Emit for 90+ special case
  if( age >= 90 )
    emit( gdr + "90+" + pid, 1 );
  else
    emit( gdr + "90+" + pid, 0 );

  // Emit for remaining ranges (10 yrs, descending)
  for( var i = 80; i >= 0; i-=10 ){
    var range = i + "-" +( i + 9 );
    if( age >= i && age <( i + 10 ))
      emit( gdr + range + pid, 1 );
    else
      emit( gdr + range + pid, 0 );
  }
}
