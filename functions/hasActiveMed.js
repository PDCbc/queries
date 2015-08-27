/**
 * @param pt {Patient} - hQuery patient API object.
 * @param med {String} - a regular expression string to match against the ATC codes for the patient's medications.
 * @param doseLimit
 * @param minDose
 * @param maxDose
 * @returns {boolean}
 */
function hasActiveMed(pt, med, doseLimit, minDose, maxDose) {

    //check if the input was valid.
    if (
        pt === undefined ||
        pt === null ||
        pt.json === undefined ||
        pt.json === null
    ) {
        return false;
    }

    //set the default minDose to 0
    minDose = minDose || 0;

    //set the default maxDose to POSITIVE_INFINITY
    maxDose = maxDose || Number.POSITIVE_INFINITY;

    var meds = pt.medications();

    if (
        meds === undefined ||
        meds === null ||
        meds.length === 0
    ) {

        return false;
    }

    meds = meds.filter(
        function (m) {
            atcCoded = m.json.codes !== null &&
                m.json.codes !== undefined &&
                m.json.codes.whoATC !== null &&
                m.json.codes.whoATC !== undefined &&
                m.json.codes.whoATC.length > 0;

            return isActiveMed(m) && atcCoded;
        }
    );

    for (var i = 0; i < meds.length; i++) {
        var m = meds[i];

        for (var j = 0; j < m.json.codes.whoATC.length; j++) {
            var c = m.json.codes.whoATC[j];

            if (c.match(med)) {

                if (!doseLimit) {
                    return true;
                }

                if (m.json.values && m.json.values[0].scalar) {
                    try {
                        var v = parseFloat(m.json.values[0].scalar);

                        if (v >= minDose) {
                            return true;
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }

    return false;
}
