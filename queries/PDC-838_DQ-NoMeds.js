//
// PDC-838_DQ-NoMeds
//

function map( patient ){

  var obj = patient.json;

  var nm = countMedications( patient ) === 0;
  var ia = activePatient(patient);

  var denominator = ia;
  var numerator = ia && nm;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
