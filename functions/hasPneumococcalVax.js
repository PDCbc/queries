/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the immunization documented, false otherwise.
*/
function hasPneumococcalVax( pt ){
    var system = "whoATC";
    var condition = "^J07AL02$";

    return hasImmunization(pt, system, condition);
}
