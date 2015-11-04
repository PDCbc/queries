/**
 * Query Title: Retro-PDC-001
 * Query Type:  Pyramid
 * Description: Population Pyramid
 */
function map(patient) {

    if(!filterProviders(patient.json.primary_care_provider_id, "ANY")){
        return;
    }


    var pdcEpoch = new Date(2010, 0, 24);//jan 1st 2010
    //constants
    var gdrs = ["female", "male", "undifferentiated", "undefined"];

    // Store physician ID, via JSON key
    var pid = patient.json.primary_care_provider_id;

    //no functionality to capture change in gender over time
    var gdr = patient.gender();

    //quareterly results
    for( var referenceDate = new Date(pdcEpoch.getTime()); referenceDate < Date.now(); referenceDate.setMonth(referenceDate.getMonth()+1))
    {
      if(!activePatient(patient, referenceDate))
      {
        continue;
      }

      //Store age and gender, via patient Object functions
      var age = patient.age(referenceDate);

      // Convert gdr to an expected value
      if (gdr && gdr.toString().toUpperCase() === "F")
          gdr = "female";
      else if (gdr && gdr.toString().toUpperCase() === "M")
          gdr = "male";
      else if (gdr && gdr.toString().toUpperCase() === "UN")
          gdr = "undifferentiated";
      else
          gdr = "undefined";

      // Edge cases assigned -1 (out of specified ranges)
      if (typeof age !== 'number' || age < 0) {
          return;
      }

      // Emit for 90+ special case
      if (age >= 90)
          emit('{' +
                '"gender"' + ':' + '"' + gdr + '"' + ',' +
                '"age"' + ":" + '"90+"' + ',' +
                '"pid"' + ":" + '"' + pid + '"' + ',' +
                '"date"' + ':' + '"' + referenceDate.getTime() +
                '"}', 1);

      for(var g=0; g<gdrs.length; g++)
      {
        emit('{' +
              '"gender"' + ':' + '"' + gdrs[g] + '"' + ',' +
              '"age"' + ":" + '"90+"' + ',' +
              '"pid"' + ":" + '"' + pid + '"' + ',' +
              '"date"' + ':' + '"' + referenceDate.getTime() +
              '"}', 0);
      }

      // Emit for remaining ranges (10 yrs, descending)
      for (var i = 80; i >= 0; i -= 10) {
          var range = i + "-" + ( i + 9 );
          if (age >= i && age < ( i + 10 ))
              emit('{' +
                  '"gender"' + ':' + '"' + gdr + '"' + ',' +
                  '"age"' + ":" + '"' + range + '"' + ',' +
                  '"pid"' + ':' + '"' + pid + '"' + ',' +
                  '"date"' + ':' + '"' + referenceDate.getTime() +
                  '"}', 1);
          for (var j = 0; j < gdrs.length; j++) {
              emit('{' +
                  '"gender"' + ':' + '"' + gdrs[j] + '"' + ',' +
                  '"age"' + ":" + '"' + range + '"' + ',' +
                  '"pid"' + ':' + '"' + pid + '"' + ',' +
                  '"date"' + ':' + '"' + referenceDate.getTime() + '"}', 0);
          }
      }
    }
}
