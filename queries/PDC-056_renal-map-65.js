/**
 * Query Title: PDC-056
 * Query Type:  Ratio
 * Description: STOPP: Dig >125 65+
 */
function map( patient ){

  var denominator = isAge(patient, 65) && hasImpairedRenalFunction(patient); 

  var numerator   = denominator && hasActiveDigoxin(patient, 125);

  emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
  
  emit( "numerator_"+patient.json.primary_care_provider_id, +numerator   );

}