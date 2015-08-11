/*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveLevothyroxine( pt ){
    var med = "^H03AA.*";

    return hasActiveMed(pt, med, false);
}
