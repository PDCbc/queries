/**
 * Query Title: PDC-058
 * Query Type:  Ratio
 * Desctiption: Statin: Secondary prev
 */
function map( patient ){

  var denominator = activePatient( patient ) && hasActiveStatin( patient ); 

  var numerator   = denominator && hasCardiacEvent( patient ); 

  emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
  emit( "numerator_"+patient.json.primary_care_provider_id, +numerator );
  
}
