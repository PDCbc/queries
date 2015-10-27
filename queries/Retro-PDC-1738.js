/**
 * Query Title: Retro-PDC-1738
 * Query Type:  Ratio
 * Description: The ratio of active to inactive patients.
 */
function map(patient) {

    if (filterProviders(patient.json.primary_care_provider_id, "ANY")) {

        
        var pdcEpoch = new Date(2010, 0, 1);//first of january 2010

        for(var referenceDate = new Date(pdcEpoch.getTime()); referenceDate.getTime()<Date.now(); referenceDate.setMonth(referenceDate.getMonth()+1))
        {
          var denominator = true;
          var numerator = denominator && activePatient(patient, referenceDate);
          emit('{"denominator":"' + +denominator + '", ' + 
                '"numerator":"' + +numerator + '", ' +
                 '"pid":"' + patient.json.primary_care_provider_id + '", ' + 
                 '"date":"' + referenceDate + '"}', 1);
        }
    }

}
