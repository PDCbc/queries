function hasWC( pt, minDate, maxDate, complement ){
    var system1 = "LOINC";
    var cmo1 = "^56115-9$";
    var system2 = "SNOMEDCT";
    var cmo2 = "^276361009$";
    var minVal;//undefined
    var maxVal;//undefined

    var loincResult = hasCMO( pt, system1, cmo1, minDate, maxDate, complement );

    return hasCMO( pt, system1, cmo1, minDate, maxDate, complement ) ||
            hasCMO( pt, system2, cmo2, minDate, maxDate, complement );
}
