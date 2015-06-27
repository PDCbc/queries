/**
 * Query Title: PDC-954_DP-CKD
 * Query Type:  Ratio
 */
function map( patient ){

  var ap = activePatient( patient );

  var ia = isAge(  patient, 20, 120  );

  var hc = hasCKD(patient);

  var numerator = ap && ia && hc;

  var denominator = ap && ia;

  emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
