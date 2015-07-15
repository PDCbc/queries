/*
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveThiazide( pt ){

    var code = "^C03AA*";

    return hasActiveMed(pt, code, false);

}
