//
// PDC-846_DQ-AntiGoutWithGout
//

function map( patient ){

  var obj = patient.json;

  var ap = activePatient(patient);

  console.log("ap: " + ap);

  var hc = hasGout(patient);

  console.log("hc: " + hc);

  var hm = hasActiveAntiGout(patient);

  console.log("hm: " + hm);

  var denominator = ap && hm;
  var numerator = ap && hm && hc;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
