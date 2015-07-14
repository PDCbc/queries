/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasGout( pt ){
    var system = "ICD9";
    var condition = "^274$|^274.*";

    return hasCondition(pt, system, condition);
}
