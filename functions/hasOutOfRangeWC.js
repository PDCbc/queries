function hasOutOfRangeWC(pt, mostRecent, minDate, maxDate) {

    var system1 = "LOINC";
    var cmo1    = "^56115-9$";
    var system2 = "SNOMEDCT";
    var cmo2    = "^276361009$";
    var minVal  = null;
    var maxVal  = pt.gender === 'F' ? 101 : 95;
    var units   = 'cm';

    return hasInRangeCMO(pt, system1, cmo1, mostRecent, minVal, maxVal, units, minDate, maxDate, true) ||
        hasInRangeCMO(pt, system2, cmo2, mostRecent, minVal, maxVal, units, minDate, maxDate, true);
}
