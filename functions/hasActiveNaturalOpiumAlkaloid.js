/*
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveNaturalOpiumAlkaloid( pt ){

    var code = "^N02AA*";

    return hasActiveMed(pt, code, false);

}
