//
// PDC-889_DQ-BMI
//

function map( patient ){

  if( !filterProviders(patient.json.primary_care_provider_id, "PracticeReflection"))return;
  
  var obj = patient.json;

  var ap = activePatient(patient);
  var ia = isAge(patient, 21);
  var ho = hasBMI(patient);

  var denominator = ap && ia;
  var numerator = ap && ia && ho;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
