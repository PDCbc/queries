/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasHypothyroidism( pt ){
    var system = "ICD9";
    var condition = "^24[3-5]";

    return hasCondition(pt, system, condition);
}
