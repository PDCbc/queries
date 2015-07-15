/*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*/
function hasActiveAceInhibitor( pt ){

    var code = "^C09A*";

    return hasActiveMed(pt, code, false);

}
