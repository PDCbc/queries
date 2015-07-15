/*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveBetaBlocker( pt ){

    var code = "^C07[ABCDEF]B*";

    return hasActiveMed(pt, code, false);

}
