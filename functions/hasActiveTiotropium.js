/*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveTiotropium( pt ){

    var code = "^R03BB04.*";

    return hasActiveMed(pt, code, false);

}
