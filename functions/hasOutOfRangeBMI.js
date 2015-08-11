function hasOutOfRangeBMI(pt, mostRecent, minDate, maxDate) {

    var system1 = "LOINC";
    var cmo1    = "^39156-5$";
    var system2 = "SNOMEDCT";
    var cmo2    = "^60621009$";
    var minVal  = null;
    var maxVal  = 29;
    var units   = null;

    return hasInRangeCMO(pt, system1, cmo1, mostRecent, minVal, maxVal, units, minDate, maxDate, true) ||
        hasInRangeCMO(pt, system2, cmo2, mostRecent, minVal, maxVal, units, minDate, maxDate, true);
}
