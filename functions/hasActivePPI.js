/*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActivePPI( pt ){

    var code = "^A02BC.*";

    return hasActiveMed(pt, code, false);

}
