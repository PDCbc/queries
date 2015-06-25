function hasWeight( pt, minDate, maxDate, complement ){
    var system1 = "LOINC";
    var cmo1 = "^3141-9$";
    var minVal;//undefined
    var maxVal;//undefined

    return hasCMO( pt, system1, cmo1, minDate, maxDate, complement );
}
