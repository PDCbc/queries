//
// PDC-845_DQ-LevothyroxineAndHypothyroidism
//

function map( patient ){

  var obj = patient.json;

  var ap = activePatient(patient);
  var hc = hasHypothyroidism(patient);
  var hm = hasActiveLevothyroxine(patient);

  var denominator = ap && hm;
  var numerator = ap && hm && hc;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
