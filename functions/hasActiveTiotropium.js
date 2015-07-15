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
function hasActiveTiotropium( pt ){

    var code = "^R03BB04.*";

    return hasActiveMed(pt, code, false);

}
