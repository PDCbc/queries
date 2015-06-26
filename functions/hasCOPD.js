/**
* @param pt - the patient object that contains the hQuery patient API. 
* 
* @return - true if the patient has the condition documented, false otherwise. 
*/
function hasCOPD( pt ){
    var system = "ICD9";
    var condition = "^496.*";

    return hasCondition(pt, system, condition);
}
