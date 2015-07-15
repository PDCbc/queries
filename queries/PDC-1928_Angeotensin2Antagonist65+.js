/**
 * Query Title: PDC-1928_Angeotensin2Antagonist65+
 */
function map( patient ){

  var ap = activePatient(patient);
  var ia = isAge(patient, 65);
  var hm = hasActiveAngeotensin2Antagonist(patient);

  var denominator = ap && ia;
  var numerator = ap && ia && hm;

  console.log('ap: ' + ap + ' ia: ' + ia + ' hm: ' + hm);

  emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
  emit( "numerator_"+patient.json.primary_care_provider_id, +numerator );
}
