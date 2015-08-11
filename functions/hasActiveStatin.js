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
function hasActiveStatin( pt ){

    var code = "^C10(AA|BX|BA).*";

    /*
    var code1 = "^C10BAA";
    var code2 = "^C10BX";
    var codes3 = "^C10BA";
    */

    return hasActiveMed(pt, code, false);

}
