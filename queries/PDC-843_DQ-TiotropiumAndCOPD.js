//
// PDC-843_DQ-TiotropiumAndCOPD
//

function map( patient ){

  if( !filterProviders(patient.json.primary_care_provider_id, "PracticeReflection"))return;
  
  var obj = patient.json;

  var ap = activePatient(patient);
  var hc = hasCOPD(patient);
  var hm = hasActiveTiotropium(patient);

  var denominator = ap && hm;
  var numerator = ap && hm && hc;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
