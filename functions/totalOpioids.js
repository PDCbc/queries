/**
 * @description Determines the total daily does of active opioid medications in milligrams (mg).
 *
 * @param pt {Patient} - hQuery patient api object that contains the patient information.
 *
 * @return {Number} - the dose of opioid medications prescribed per day in milligrams (mg). Only considers currently active medications.
 */
function totalOpioids(pt) {


    if (!pt || !pt.json || !pt.json.medications) {

        return 0;
    }

    var meds = pt.json.medications;
    var m    = null;

    var freq = 0;
    var dose = 0;

    var dailyTotal = 0;

    for (var i = 0; i < meds.length; i++) {

        m = meds[i];

        if (!isActiveMed(m) || !isOpioid(m)) {
            continue;
        }

        //check to make sure the fields we need are present.
        if (
            !m || !m.values || m.values.length !== 1 || !m.administrationTiming || !m.administrationTiming.frequency || !m.administrationTiming.frequency.numerator || !m.administrationTiming.frequency.numerator.value || !m.administrationTiming.frequency.denominator || !m.administrationTiming.frequency.denominator.unit || !m.administrationTiming.frequency.denominator.value
        ) {

            continue;

        } else {

            //we take a naive approach and expect only units of days ('d')for frequency
            // and units of 'mg' for dose. If do not match those, we ignore the frequency and dose information.

            if (
                m.administrationTiming.frequency.denominator.unit === 'd'
            ) {

                //assume that the frequency is in the numerator of the administrationTiming object and is an integter
                freq = m.administrationTiming.frequency.numerator.value;

                if (
                    m.values[0].unit &&
                    m.values[0].unit.toLowerCase() === 'mg' &&
                    m.values[0].scalar
                ) {

                    try {
                        dailyTotal += freq * Number(5);
                    } catch (e) {
                        continue;
                    }

                }

            }

        }


    }

    return dailyTotal;

}