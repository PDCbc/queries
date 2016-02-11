/**
 * Query Title: Retro-PDC-1738
 * Query Type:  Ratio
 * Description: The ratio of active to inactive patients.
 */
function map( patient )
{
  var pdcEpoch = new Date(2010, 0, 27);//27th of january 2010 -- dependent on day of month

  for(var referenceDate = new Date(pdcEpoch.getTime()); referenceDate.getTime()<Date.now(); referenceDate.setMonth(referenceDate.getMonth()+1))
  {
    var denominator = true;
    var numerator = denominator && activePatient( patient, referenceDate );
    emit('{"value":"denominator", ' +
           '"pid":"' + patient.json.primary_care_provider_id + '", ' +
           '"date":"' + referenceDate.getTime() + '"}', +denominator);
    emit('{"value":"numerator", ' +
           '"pid":"' + patient.json.primary_care_provider_id + '", ' +
           '"date":"' + referenceDate.getTime() + '"}', +numerator);

  }
}
