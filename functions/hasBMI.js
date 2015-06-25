function hasBMI( pt, minDate, maxDate, complement ){
    var system1 = "LOINC";
    var cmo1 = "^39156-5$";
    var system2 = "SNOMEDCT";
    var cmo2 = "^60621009$";
    var minVal;//undefined
    var maxVal;//undefined

    return hasCMO( pt, system1, cmo1, minDate, maxDate, complement ) ||
            hasCMO( pt, system2, cmo2, minDate, maxDate, complement );
}
