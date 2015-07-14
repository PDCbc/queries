//
// PDC-865_DQ-BP21+
//

function map( patient ){

  var obj = patient.json;

  var ap = activePatient(patient);

  var ia = isAge( patient, 21 );

  var ho = hasBloodPressure( patient );

  var denominator = ap && ia;
  var numerator = ap && ia && ho;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
