//
// PDC-842_DQ-Diabetes12+
//

function map( patient ){

  if( !filterProviders(patient.json.primary_care_provider_id, "PracticeReflection"))return;
  
  var obj = patient.json;

  var ap = activePatient(patient);
  var ia = isAge(patient, 12);
  var hc = hasDiabetes(patient);

  var denominator = ap && ia;
  var numerator = ap && ia && hc;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
