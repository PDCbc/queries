/**
 * Query Title: PDC-954
 * Query Type:  Ratio
 * Description: Number of patients with reported chronic kidney disease / total number of patients. 
 *                (population is 20 - 120 years of age)
 */
function map( patient ){

  var denominator = isAge( patient, 20, 120 ); 

  var numerator   = isAge( patient, 20, 120 )  &&  hasCKD(patient); 

  emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}