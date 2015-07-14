//
// PDC-846_DQ-AntiGoutWithGout
//

function map( patient ){

  var obj = patient.json;

  var ap = activePatient(patient);

  var hc = hasGout(patient);

  var hm = hasActiveAntiGout(patient);

  var denominator = ap && hm;
  var numerator = ap && hm && hc;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
