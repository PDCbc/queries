//
// PDC-837_DQ-PrescriptionFrequency
//

function map( patient ){

  if( !filterProviders(patient.json.primary_care_provider_id, "PracticeReflection"))return;
  
  var obj = patient.json;

  var denominator = countEncounters( patient, 2400 );
    //inifinity breks things but this should be large enough that this won't
    //be a problem in the lifetime of the sotware

  var numerator = countMedications( patient );

  emit( "denominator_" + patient.json.primary_care_provider_id, denominator );

  emit( "numerator_" + patient.json.primary_care_provider_id, numerator );
}
