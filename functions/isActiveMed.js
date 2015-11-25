/**
 * Determines if a medication is active. Uses the following definition:
 *
 * IF the medication is marked as active: return true
 *
 * ELSE IF the medication is marked as completed:
 *
 *   IF start < now AND stop is null: return true
 *
 *   ELSE IF start < now AND stop < NOW AND within 20% window: return true
 *
 *   ELSE IF start is null AND stop is after the intend time of query execution: return true
 *
 *   ELSE: return false
 *
 * ELSE: return false
 *
 * @param med : an object containing the medication information.
 * @param referenceTime : a time to use as the reference for determining if
 the medication is active. Given in number of seconds
 since the epoch (Jan 1st 1970).  If not provided, this
 will default to the current time.
 *
 * @return true if the medication is active, false otherwise.
 */

function isActiveMed(med, referenceTime) {

    //check for valid input, if invalid then we can't operate on the medication, return false. 
    if (med === undefined || med === null || med.json === undefined || med.json === null) {

        return false;

    }


    //set up time stamps to use as a reference for the medication.
    var now = null;

    if (referenceTime !== undefined && referenceTime !== null && !isNaN(referenceTime)) {

        now = new Date(referenceTime * 1000);

    } else {

        now = new Date();

    }

    now = Math.floor(now.getTime() / 1000);  //need to make this an absolute time in seconds.


    //check the status of the medication for integral values.
    if (
        med.json.statusOfMedication !== undefined &&
        med.json.statusOfMedication !== null &&
        med.json.statusOfMedication.value !== undefined &&
        med.json.statusOfMedication.value !== null
    ) {

        if (med.json.statusOfMedication.value === 'active') {

            //if the medication is marked as active, we just return true. 
            return true;

        } else if (med.json.statusOfMedication.value === 'completed') {

            var start = med.json.start_time;

            var stop = med.json.end_time;

            var extend = (stop - start) * 1.2; //get the amount of padding required

            if (
                ( start !== undefined && start !== null ) &&
                ( stop === undefined || stop === null ) &&
                start < now
            ) {

                return true;

            } else if (
                ( start === null || start === undefined ) &&
                ( stop !== undefined && stop !== null ) &&
                ( stop > now )
            ) {

                return true;

            } else if (
                ( start !== undefined && start !== null ) &&
                ( stop !== undefined || stop !== null ) &&
                ( start < now && stop < now ) &&
                ( !isNaN(extend) && (start + extend) > now )
            ) {

                return true;

            } else {

                return false;

            }
        } else {

            //default case, if neither of these is true return false. 
            return false;

        }


    } else {

        return false;

    }


}