/*
*
* @return - true if the patient has an active medication
*               false otherwise.
*/
function hasActiveAngeotensin2Antagonist( pt ){

    var code = "^C09CA*";

    return hasActiveMed(pt, code, false);

}
