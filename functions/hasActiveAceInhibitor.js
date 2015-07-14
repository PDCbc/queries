/*
* Determines if a patient has an active statin.
* - Uses the definition of a statin provided in isStatin().
* - Uses the definition of a an active medication defined in isActiveMed
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active statin medication
*               false otherwise.
*/
function hasActiveAceInhibitor( pt ){

    var code = "^C09A*";

    return hasActiveMed(pt, code, false);

}
