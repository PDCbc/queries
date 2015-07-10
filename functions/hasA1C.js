/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasA1C( pt, minDate, maxDate ){
    var system = "LOINC";
    var condition = "^4548-4$";

    return hasLab(pt, system, condition, minDate, maxDate);
}
