// Reference Number: PDC-001
// Query Title: Population profile by age and gender

function map( patient ){
  // Store physicial ID, use a JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  //Store age and gender, use patient Object functions
  var age = patient.age();
  var gdr = patient.gender();
  
  // Convert gdr to an expected value
  if( gdr === null || gdr === undefined ){
    gdr = "undifferentiated_";
  }
  else {
    gdr = gdr.toString().toUpperCase();
    if( gdr === "F" )
      gdr = "female_";
    else if( gdr === "M" )
      gdr = "male_";
    else
      gdr = "undifferentiated_";
  }
  
  // Identify range and emit accordingly
  // Note: all ranges are emitted, including 0s
  if( typeof age === 'undefined' || typeof age === 'null' ){
    // Special case for undefined/null
    emit("age_unspecified" + pid, 1);
  }
  else { 
    // Special case for 90+
    if( age >= 90 )
      emit( gdr + "_90+" + pid, 1 );
    else
      emit( gdr + "_90+" + pid, 0 );
    
    // Iterate through remaining ranges (of 10 yrs)
    var i = 80;
    for( ; i >= 0; i-=10 ){
      var range = i + "-" +( i + 9 );
      if( age >= i && age <( i + 10 ))
        emit( gdr + range + pid, 1 );
      else
        emit( gdr + range + pid, 0 );
    }
  }

  // Denominator is counted every time
  emit( "denominator", 1 );
}
