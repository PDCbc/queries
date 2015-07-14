/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/
function hasBloodPressure( pt, mostRecent, systolicMinVal, systolicMaxVal, diastolicMinVal, diastolicMaxVal, minDate, maxDate, complement ){
    //systolic
    var system1 = "LOINC";
    var code1 = "^8480-6$";
    var system2 = "SNOMEDCT";
    var code2 = "^271649006$";

    //diastolic
    var system3 = "LOINC";
    var code3 = "^8462-4$";
    var system4 = "SNOMEDCT";
    var code4 = "^271650006$";

    var ls = hasInRangeCMO(pt, system1, code1, mostRecent, systolicMinVal, systolicMaxVal, "", minDate, maxDate, complement);
    var ld = hasInRangeCMO(pt, system3, code3, mostRecent, diastolicMinVal, diastolicMaxVal, "", minDate, maxDate, complement);
    var ss = hasInRangeCMO(pt, system2, code2, mostRecent, systolicMinVal, systolicMaxVal, "", minDate, maxDate, complement);
    var sd = hasInRangeCMO(pt, system4, code4, mostRecent, diastolicMinVal, diastolicMaxVal, "", minDate, maxDate, complement);

    return (ls && ld) || (ss && sd);
}
