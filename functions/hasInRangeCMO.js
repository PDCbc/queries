/**
 * @param pt - the patient object that contains the hQuery patient API.
 * @param system - the code system for the specified cmo
 * @param cmo - a regular expression for the cmo. e.g., ^56115-9$
 * @param minVal - the low value of the range for a positive result for the cmo
 * @param maxVal - the high value of the range for a positive result for the cmo
 * @param minDate - the low date value of the date range for a positive result for the cmo
 * @param maxDate - the high date value of the date range for a positive result for the cmo
 * @return - true if the patient has the specified condition, false otherwise.
 */
function hasInRangeCMO(pt, system, cmo, mostRecent, minVal, maxVal, units, minDate, maxDate, complement) {
    var maxMillisFromEpoch = 8640000000000000;

    mostRecent = typeof mostRecent !== 'undefined' && mostRecent !== null ? mostRecent : false;
    minVal     = typeof minVal !== 'undefined' && minVal !== null ? minVal : Number.NEGATIVE_INFINITY;
    maxVal     = typeof maxVal !== 'undefined' && maxVal !== null ? maxVal : Number.POSITIVE_INFINITY;
    units      = typeof units !== 'undefined' && units !== null ? units : null;
    minDate    = typeof minDate !== 'undefined' && minDate !== null ? minDate : new Date(-maxMillisFromEpoch);
    maxDate    = typeof maxDate !== 'undefined' && maxDate !== null ? maxDate : new Date(maxMillisFromEpoch);
    complement = typeof complement !== 'undefined' && complement !== null ? complement : false;

    //check if the pt api is correctly set up.
    if (pt === undefined ||
        pt === null ||
        pt.json === undefined ||
        pt.json === null ||
        system === undefined ||
        system === null ||
        cmo === undefined ||
        cmo === null) {
        return false;
    }

    var measurements = pt.json.vital_signs;

    //check that we actually have conditions.
    if (measurements === undefined || measurements === null || measurements.length === 0) {
        return false;
    }

    //filter out cmos that don't have the right code
    measurements = measurements.filter(
        function (measurement) {
            if (measurement.codes === null ||
                measurement.codes === undefined
            ) {
                return false;
            }


            if (measurement.codes[system] === null ||
                measurement.codes[system] === undefined ||
                measurement.codes[system] < 1) {
                return false;
            }

            var codes = measurement.codes[system];


            for (var i = 0; i < codes.length; i++) {
                if (codes[i].match(cmo)) {
                    return true;
                }
            }

            return false;
        }
    );

    //filter out cmos without a start_date
    measurements = measurements.filter(
        function (measurement) {
            return measurement.start_time !== null && measurement.start_time !== undefined;
        }
    );

    //filter out out of date range dates
    measurements = measurements.filter(
        function (measurement) {
            return measurement.start_time * 1000 > minDate && measurement.start_time * 1000 < maxDate;
        }
    );

    if (measurements.length < 1) {
        return false;
    }

    //sort by date
    measurements.sort(
        function (a, b) {
            if (a.start_time < b.start_time) {
                return -1;
            }
            else if (a.start_time > b.start_time) {
                return 1;
            }
            else if (a.start_time === b.start_time) {
                return 0;
            }
            else {
                return 0;
            }
        }
    );


    if (mostRecent) {

        measurements = measurements.slice(-1);
    }

    for (var i = 0; i < measurements.length; i++) {
        var measurement = measurements[i];

        if (measurement.values !== null &&
            measurement.values !== undefined &&
            measurement.values.length > 0) {

            measurement.values = filterOnUnits(measurement.values, units);

            for (var j = 0; j < measurement.values.length; j++) {
                var value = measurement.values[j];

                if (value.scalar !== null && value.scalar !== undefined) {
                    if (!complement) {
                        if (value.scalar >= minVal && value.scalar <= maxVal) {
                            return true;
                        }
                    }
                    else {
                        if (value.scalar < minVal || value.scalar > maxVal) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
        else {
            return false;
        }
    }
}

function filterOnUnits(values, units) {
    return values.filter(
        function (value) {
            return value.units === units;
        }
    );
}
