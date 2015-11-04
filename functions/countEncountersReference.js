/**
 * countReferenceEncounters()
 *
 * Counts the number of encounters that have occured in the last time period.
 *
 * @param pt {Object} - The hQuery patient object to assess the number of encounters for.
 *
 * @param months {Object} - How far to look back in time to count encounters, expressed in number of months.
 *      Defaults to all encounters if nothing is passed.
 *
 * @param referenceTime --- date to consider as basis for currency
 * 
 * @return {Number} - The number of encounters that fall within the specified time frame.
 *      Must be a positive integer. Returns null if there was an error.
 */
function countEncountersReference(pt, months, referenceTime) {

    if (!pt || isNaN(months) || months === null || months === undefined) {

        return null;

    }

    referenceTime = (referenceTime === undefined)? new Date() : referenceTime;

    if (!pt.json || !pt.json.encounters || !pt.json.encounters.length) {

        return null;

    }

    //if we get here we know we have a valid encounters array to work with.

    var encounters = pt.json.encounters;

    var total = 0;

    for (var i = 0; i < encounters.length; i++) {

        if (!encounters[i].start_time) {

            continue;
        }

        var encounterTime = new Date(encounters[i].start_time*1000);

        if ( (referenceTime.getMonth() - encounterTime.getMonth()) <= months &&
             (referenceTime.getMonth() - encounterTime.getMonth()) >= 0 &&
             referenceTime.getTime() > encounterTime.getTime())
        {

            total += 1;

        }

    }

    return total;

}
