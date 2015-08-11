/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasHypertension( pt ){
    var system1 = "ICD9";
    var code1 = "^401$|^401.*";

    var system2= "SNOMEDCT";
    var code2 = "38341003";

    return hasCondition(pt, system1, code1) ||
            hasCondition(pt, system2, code2);
}
