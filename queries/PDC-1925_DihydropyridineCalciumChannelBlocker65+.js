/**
 * Query Title: PDC-1925_DihydropyridineCalciumChannelBLocker65+
 */
function map( patient ){

  var ap = activePatient(patient);
  var ia = isAge(patient, 65);
  var hm = hasActiveDihydropyridineCalciumChannelBLocker(patient);

  var denominator = ap && ia;
  var numerator = ap && ia && hm;

  emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
  emit( "numerator_"+patient.json.primary_care_provider_id, +numerator );
}
