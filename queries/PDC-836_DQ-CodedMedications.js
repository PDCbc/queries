//
// PDC-836_DQ-CodedMedications
//

function map( patient ){

  var obj = patient.json;

  var denominator = obj.medications.length;

  var numerator = codedMedications( patient );

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
