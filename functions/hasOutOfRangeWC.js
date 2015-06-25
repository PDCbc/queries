function hasOutOfRangeWC( pt, mostRecent, minDate, maxDate ){
    var system1 = "LOINC";
    var cmo1 = "^56115-9$";
    var system2 = "SNOMEDCT";
    var cmo2 = "^276361009$";
    var minVal;//undefined
    var maxVal = pt.gender === 'F' ? 102 : 95;
    var units = 'cm';

    return hasInRangeCMO( pt, system1, cmo1, mostRecent, minVal, maxVal, units, minDate, maxDate, true ) ||
            hasInRangeCMO( pt, system1, cmo1, mostRecent, minVal, maxVal, units, minDate, maxDate, true );
}
