/**
 * @description Determines the total daily does of active opioid medications in milligrams (mg).
 *
 * @param pt {Patient} - hQuery patient api object that contains the patient information.
 *
 * @return {Number} - the dose of opioid medications prescribed per day in milligrams (mg). Only considers currently active medications.
 */
function totalOpioids(pt) {


    if (!pt || !pt.json || !pt.json.medications) {

        return null;
    }

    var meds = pt.json.medications;
    var m    = null;

    for (var i = 0; i < meds.length; i++) {

        m = meds[i];

        //check to make sure the fields we need are present.
        if (
            !m || !m.values ||
            !m.administrationTiming ||
            !m.administrationTiming.frequency ||
            !m.administrationTiming.frequency.numerator ||
            !m.administrationTiming.frequency.numerator.value ||
            !m.administrationTiming.frequency.denominator ||
            !m.administrationTiming.frequency.denominator
        ) {
            continue;
        }


    }

    return null;

}