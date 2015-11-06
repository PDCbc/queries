/**
 * title : PDC-1740
 * description : Counts the number of encounters within a given time period
 */

function map(patient) {

    try {


    if (filterProviders(patient.json.primary_care_provider_id, "Attachment"))
    {

        //get the number of encounters in the last month.
        var encounters = countEncounters(patient, 1);
        
        var genders = ['female', 'male', 'undefined', 'undifferentiated'];
        var ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

        var ageRange = getAgeRange(patient);

        var gender = getGender(patient);

        genders.forEach(
          function(g)
          {
            if(encounters!==null && ageRange !== null && gender !== null)
            {
              if(gender === g)
              {
                emit( g + "_" + ageRange + "_" + patient.json.primary_care_provider_id, encounters);

              }
              
              //simple but inefficient -- could emit all other cases rather than always emitting zero
              ageRanges.forEach(
                function(ar)
                {
                  emit( g + "_" + ar + "_" + patient.json.primary_care_provider_id, 0);
                }
              );
            }
          }
        );
    }

    } catch (e) {

        emit("FAILURE_" + e, -1);

    }
}

