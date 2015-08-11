/**
 * Query Title: PDC-1921_HMG-CoA65+
 */
function map( patient ){

  if( !filterProviders(patient.json.primary_care_provider_id, "PracticeReflection"))return;
  
  var ap = activePatient(patient);
  var ia = isAge(patient, 65);
  var hm = hasActiveStatin(patient);

  var denominator = ap && ia;
  var numerator = ap && ia && hm;

  emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
  emit( "numerator_"+patient.json.primary_care_provider_id, +numerator );
}
