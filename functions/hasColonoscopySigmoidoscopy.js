function hasColonoscopySigmoidoscopy( pt, minDate, maxDate, complement ){
    var system1 = "LOINC";
    var cmo1 = "^28023-0$";

    var system2 = "LOINC";
    var cmo2 = "^28027-1$";

    var system3 = "SNOMEDCT";
    var cmo3 = "^24420007$";

    var system4 = "SNOMEDCT";
    var cmo4 = "^73761001$";

    var system5 = "SNOMEDCT";
    var cmo5 = "^6019008$";

    var minVal;//undefined
    var maxVal;//undefined

    return hasCMO( pt, system1, cmo1, minDate, maxDate, complement ) ||
            hasCMO( pt, system2, cmo2, minDate, maxDate, complement ) ||
            hasCMO( pt, system3, cmo3, minDate, maxDate, complement ) ||
            hasCMO( pt, system4, cmo4, minDate, maxDate, complement ) ||
            hasCMO( pt, system5, cmo5, minDate, maxDate, complement );
}
