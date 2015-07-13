//
// PDC-838_DQ-NoMeds
//

function map( patient ){

  var obj = patient.json;

  var denominator = 1;

  var numerator = countMedications( patient ) === 0;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
