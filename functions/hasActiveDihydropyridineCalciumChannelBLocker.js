/*
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active  medication
*               false otherwise.
*/
function hasActiveDihydropyridineCalciumChannelBLocker( pt ){

    var code = "^C08[CG]A.*";

    return hasActiveMed(pt, code, false);

}
