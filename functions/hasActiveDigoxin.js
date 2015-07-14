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
function hasActiveDigoxin( pt, minDose){
    var med = "^C01AA.*";

    return hasActiveMed(pt, med, true, minDose);
}
