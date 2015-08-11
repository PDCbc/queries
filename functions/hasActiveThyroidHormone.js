/*
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active  medication
*               false otherwise.
*/
function hasActiveThyroidHormone( pt ){

    var code = "^H03AA.*";

    return hasActiveMed(pt, code, false);

}
