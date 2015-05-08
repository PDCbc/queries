/**
 * Query Title: PDC-955
 * Query Type:  Ratio
 * Description: Number of patients with reported congestive heart failure / total number of patients. 
 *                (population is 20 - 120 years of age)
 */
function map( patient ){

  var denominator = isAge( patient, 20, 120 ); 

  var numerator   =  denominator &&  hasCHF(patient); 

  emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}