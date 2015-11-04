/**
 * title : Retro-PDC-1740
 * description : Counts the number of encounters within a given time period
 */

function map(patient) {

    try {

      var genders = ['female', 'male', 'undefined', 'undifferentiated'];

      if (filterProviders(patient.json.primary_care_provider_id, "Attachment"))
      {
        var pdcEpoch = new Date(2010, 0, 1);//first of january 2010
        var now = new Date();
        var monthIncrement = 1;

        var gender = getGender(patient);//gender modelled as time invariant

        for( var referenceTime = new Date(pdcEpoch.getTime()); referenceTime<now; referenceTime.setMonth(referenceTime.getMonth()+monthIncrement))
        {
          //get the number of encounters in the last month.
          var encounters = countEncountersReference(patient, monthIncrement, referenceTime);
          var ageRange = getAgeRangeReference(patient, undefined, referenceTime);

          for( var i=0; i<genders.length;i++)
          {
            genderCycle(gender, genders[i], patient, referenceTime, encounters, ageRange);
          }
        }
      }
      else
      {
        throw new Error('filtered out');
      }
    } catch (e) {

        emit("FAILURE_" + e, -1);

    }
}

function genderCycle(gender, g, patient, referenceTime, encounters, ageRange)
{
  var ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

  if(gender === g)
  {
    if (encounters !== null && ageRange !== null && gender !== null)
    {
      emit('{' +
              '"gender"' + ':' + '"' + g + '",' +
              '"ageRange"' + ':' + '"' + ageRange + '",' +
              '"pid"' + ':' + '"' + patient.json.primary_care_provider_id + '",' +
              '"date"' + ':' + '"' + referenceTime.getTime() + '"' +
           '}', encounters);
    }
  }

  //simple but inefficient -- could emit all other cases rather than always emitting zero
  ageRanges.forEach(
    function(ar)
    {
      emit('{' +
              '"gender"' + ':' + '"' + g + '",' +
              '"ageRange"' + ':' + '"' + ageRange + '",' +
              '"pid"' + ':' + '"' + patient.json.primary_care_provider_id + '",' +
              '"date"' + ':' + '"' + referenceTime.getTime() + '"' +
           '}', 0);
    }
  );
}
