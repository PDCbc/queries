/**
 * Query Title: PDC-1178
 * Query Type:  Ratio
 * Description: Number of active patients who are 65 or older.
 */
function map( patient ){

  var denominator = activePatient( patient ); 

  var numerator   = denominator && isAge( patient, 65 );   

  emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
  
}