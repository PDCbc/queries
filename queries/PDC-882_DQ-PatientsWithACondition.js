//
// PDC-882_DQ-PatientsWithACondition
//

function map( patient ){

  var obj = patient.json;

  var ia = activePatient(patient);
  var denominator = ia ? countCodedConditions( patient ) : 0;
  var numerator = ia ? countCodedConditions( patient ) > 0 : 0;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
