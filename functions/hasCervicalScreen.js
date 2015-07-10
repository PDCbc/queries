/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasCervicalScreen( pt, minDate, maxDate ){
    var system1 = "SNOMEDCT";
    var result1 = "^171149006$";

    var system2 = "SNOMEDCT";
    var result2 = "^308728002$";

    var system3 = "SNOMEDCT";
    var result3 = "^439958008$";

    return hasLab(pt, system1, result1, minDate, maxDate) ||
            hasLab(pt, system2, result2, minDate, maxDate) ||
            hasLab(pt, system3, result3, minDate, maxDate);
}
