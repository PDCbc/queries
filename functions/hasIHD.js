/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasIHD( pt ){
    var system = "ICD9";
    var condition = "^414|^41[0-4].*$";

    return hasCondition(pt, system, condition);
}
