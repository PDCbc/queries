/**
 * T/F: is this patient frail as per Drubbel et. al's frailty index?
 *  - 55 and over
 *  - Has an FI score greater than 0.5
 * @param pt
 * @returns {boolean}
 */

function isFrail(pt) {
    //console.log(pt); //***remove me before merge***

    if (isAge(pt, 55) && (activePatient(pt))) {

        // Does the patient meet the frailty condition i.e. has an F.I. score greater than 0.5
        if( hasFrailtyCondition(pt))
            return true;
    }

    return false;

}