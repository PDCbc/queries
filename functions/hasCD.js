/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasCD( pt ){
    var system = "ICD9";
    var condition = "^43[0-4]$|^43[6-8]$";

    console.log('hasCD');
    return hasCondition(pt, system, condition);
}
