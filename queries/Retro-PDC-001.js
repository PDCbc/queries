/**
 * Query Title: Retro-PDC-001
 * Query Type:  Pyramid
 * Description: Population Pyramid
 */
function map(patient) {

    if(!filterProviders(patient.json.primary_care_provider_id, "ANY")){
        return;
    }

    var pdcEpoch = new Date(2010, 0, 24);//jan 1st 2010 adjust for execution date

    //constants
    var gdrs = ["female", "male", "undifferentiated", "undefined"];
    var ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

    // Store physician ID, via JSON key
    var pid = patient.json.primary_care_provider_id;

    //no functionality to capture change in gender over time
    var gdr = getGender(patient);

    //monthly results
    for( var referenceDate = new Date(pdcEpoch.getTime()); referenceDate.getTime() < new Date().getTime(); referenceDate.setMonth(referenceDate.getMonth()+1))
    {

      if(!activePatient(patient, referenceDate))
      {
        //exclude patients that are not calculated active
        //but emit zeros so that there are results for the whole time range

        for(var m=0; m<ageRanges.length; m++)
        {
          var ari = ageRanges[m];

          for (var n=0; n<gdrs.length; n++)
          {
            emit('{' +
                  '"gender"' + ':' + '"' + gdrs[n] + '"' + ',' +
                  '"ageRange"' + ":" + '"'+ ari + '"' + ',' +
                  '"pid"' + ":" + '"' + pid + '"' + ',' +
                  '"date"' + ':' + '"' + referenceDate.getTime() +
                  '"}', 0);
          }
        }

        continue;
      }

      //Store age and gender, via patient Object functions
      var ageRange = getAgeRangeReference(patient, undefined, referenceDate);

      if(ageRange === null)
      {
        //ignore out of range values
        continue;
      }


      for(var i=0; i<ageRanges.length; i++)
      {
        var ageRangeIter = ageRanges[i];

        if(ageRange === ageRangeIter)
        {
          emit('{' +
                '"gender"' + ':' + '"' + gdr + '"' + ',' +
                '"ageRange"' + ":" + '"' + ageRangeIter + '"' + ',' +
                '"pid"' + ":" + '"' + pid + '"' + ',' +
                '"date"' + ':' + '"' + referenceDate.getTime() +
                '"}', 1);
        }

        for (var j=0; j<gdrs.length; j++)
        {
          emit('{' +
                '"gender"' + ':' + '"' + gdrs[j] + '"' + ',' +
                '"ageRange"' + ":" + '"'+ ageRangeIter + '"' + ',' +
                '"pid"' + ":" + '"' + pid + '"' + ',' +
                '"date"' + ':' + '"' + referenceDate.getTime() +
                '"}', 0);
        }
      }
    }
}
