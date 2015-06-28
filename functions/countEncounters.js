/**
 * countEncounters()
 *
 * Counts the number of encounters that have occured in the last time period.
 *
 * @param pt {Object} - The hQuery patient object to assess the number of encounters for.
 *
 * @param months {Object} - How far to look back in time to count encounters, expressed in number of months.
 *      Defaults to all encounters if nothing is passed.
 *
 * @return {Number} - The number of encounters that fall within the specified time frame.
 *      Must be a positive integer. Returns null if there was an error.
 */
function countEncounters(pt, months) {

    if (!pt || months === null || months === undefined) {

        return null;

    }

    var now       = new Date();
    var timeFrame = new Date();

    timeFrame.setMonth(timeFrame.getMonth() - months);

    now       = Math.floor(now.getTime() / 1000);
    timeFrame = Math.floor(timeFrame.getTime() / 1000);

    if (!pt.json || !pt.json.encounters || !pt.json.encounters.length) {

        return null;

    }

    //if we get here we know we have a valid encounters array to work with.

    var encounters = pt.json.encounters;

    var total = 0;

    for (var i = 0; i < encounters.length; i++) {

        console.log(encounters[i].start_time+ " "+now + " " +timeFrame);

        console.log(encounters[i].start_time <= now);
        console.log(encounters[i].start_time >= timeFrame);
        //console.log(new Date(encounters[i].start_time*1000));

        if (!encounters[i].start_time) {

            console.log('ereh');

            continue;
        }

        if (encounters.start_time <= now && encounters.start_time >= timeFrame) {

            total += 1;

        }

    }

    return total;

}