//
// PDC-840_DQ-CodedConditions
//

function map( patient ){

  var obj = patient.json;

  var ia = activePatient(patient);
  var denominator = ia ? countConditions( patient ) : 0;
  var numerator = ia ? countCodedConditions( patient ) : 0;

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
