/**
 * Query Title: PDC-001
 * Query Type:  Pyramid
 * Description: Population Pyramid
 */
function map( patient )
{
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  //Store age and gender, via patient Object functions
  var age = patient.age();
  var gdr = patient.gender();

  // Proceed for active patients acceptable data
  if(
    !activePatient( patient )||
    typeof age !== 'number' ||
    age < 0 ||
    !gdr
  ){
    return;
  }

  // Convert gdr to an expected value
  if( gdr.toString().toUpperCase() === "F" )
    gdr = "female_";
  else if( gdr.toString().toUpperCase() === "M" )
    gdr = "male_";
  else if( gdr.toString().toUpperCase() === "UN" )
    gdr = "undifferentiated_";
  else
    gdr = "undefined_";

  // Constants
  var all_gdrs =[ "female_", "male_", "undifferentiated_", "undefined_" ];

  // Emit for 90+ special case
  if (age >= 90)
      emit(gdr + "90+" + pid, 1);

  // ...and 0s for all genders
  for( var k = 0; k < all_gdrs.length; k++ )
  {
      emit( all_gdrs[k] + "90+" + pid, 0 );
  }

  // Emit for remaining ranges (10 yrs, descending)
  for (var i = 80; i >= 0; i -= 10)
  {
      var range = i + "-" + ( i + 9 );
      if( age >= i && age < ( i + 10 ))
          emit(gdr + range + pid, 1);

      // ...and 0s for all genders
      for( var j = 0; j < all_gdrs.length; j++ )
      {
          emit( all_gdrs[j] + range + pid, 0 );
      }
  }
}
