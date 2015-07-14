/*
* Determines if a patient has as an active medication
*   that is digoxin.
*
* @param pt {object} - the patient API object.
* @param minDose {Number} - the minimum dose to check.
        if this value is not provided any dose will be considered.
*
* @return - true if the patient has an active statin medication
*               false otherwise.
*/
function hasActiveLevothyroxine( pt ){
    var med = "^H03AA*";

    return hasActiveMed(pt, med, false);
}
