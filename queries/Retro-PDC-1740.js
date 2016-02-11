/**
 * title : Retro-PDC-1740
 * description : Counts the number of encounters within a given time period
 */

function map(patient) {

    var pid = patient.json.primary_care_provider_id;

    var genders   = ['female', 'male', 'undefined', 'undifferentiated'];
    var ageRanges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

    var pdcEpoch = new Date(2010, 0, 24);//first of january 2010 adjust for execution date

    var now            = new Date();
    var monthIncrement = 1;

    var gender = getGender(patient);//gender modelled as time invariant

    for (var referenceTime = new Date(pdcEpoch.getTime()); referenceTime < now; referenceTime.setMonth(referenceTime.getMonth() + monthIncrement)) {

        //get the number of encounters in the last month.
        var encounters = countEncountersReference(patient, monthIncrement, referenceTime);

        if (!activePatient(patient, referenceTime)) {
            //exclude patients that are not calculated active
            //but emit zeros so that there are results for the whole time range

            for (var m = 0; m < ageRanges.length; m++) {
                var ari = ageRanges[m];

                for (var n = 0; n < genders.length; n++) {
                    emit('{' +
                        '"gender"' + ':' + '"' + genders[n] + '"' + ',' +
                        '"ageRange"' + ":" + '"' + ari + '"' + ',' +
                        '"pid"' + ":" + '"' + pid + '"' + ',' +
                        '"date"' + ':' + '"' + referenceTime.getTime() +
                        '"}', 0);
                }
            }
            continue;
        }

        // they are an active patient....

        var ageRange = getAgeRangeReference(patient, undefined, referenceTime);

        if (ageRange === null) {
            //ignore out of range values
            continue;
        }

        for (var i = 0; i < ageRanges.length; i++) {
            var ageRangeIter = ageRanges[i];

            if (ageRange === ageRangeIter) {
                emit('{' +
                    '"gender"' + ':' + '"' + gender + '"' + ',' +
                    '"ageRange"' + ":" + '"' + ageRangeIter + '"' + ',' +
                    '"pid"' + ":" + '"' + pid + '"' + ',' +
                    '"date"' + ':' + '"' + referenceTime.getTime() +
                    '"}', encounters);
            }

            for (var j = 0; j < genders.length; j++) {
                emit('{' +
                    '"gender"' + ':' + '"' + genders[j] + '"' + ',' +
                    '"ageRange"' + ":" + '"' + ageRangeIter + '"' + ',' +
                    '"pid"' + ":" + '"' + pid + '"' + ',' +
                    '"date"' + ':' + '"' + referenceTime.getTime() +
                    '"}', 0);
            }
        }

    }
}
