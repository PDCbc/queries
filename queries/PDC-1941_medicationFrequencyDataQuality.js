/**
 * title : PDC-1941
 * description : Emits the units of frequency used to describe medications.
 *
 * @param patient {Patient} - hquery patient api object.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "ANY")) {
        return;
    }

    var meds = patient.json.medications;

    if (!meds) {
        return;
    }

    var med    = null;
    var timing = null;

    for (var m = 0; m < meds.length; m++) {

        med = meds[m];

        if (!med.administrationTiming) {

            emit(patient.json.primary_care_provider_id + "_noTiming", 1);
            continue;

        }

        timing = med.administrationTiming;

        if (!timing.frequency) {

            emit(patient.json.primary_care_provider_id + "_no-frequency", 1);

        } else if (!timing.frequency.numerator) {

            emit(patient.json.primary_care_provider_id + "_no-frequency.numerator", 1);

        } else if (!timing.frequency.denominator) {

            emit(patient.json.primary_care_provider_id + "_no-frequency.denominator", 1);

        } else if (!timing.frequency.numerator.value) {

            emit(patient.json.primary_care_provider_id + "_no-frequency.numerator.value", 1);

        } else if (!timing.frequency.denominator.unit) {

            emit(patient.json.primary_care_provider_id + "_no-frequency.denominator.unit", 1);

        } else if (!timing.frequency.denominator.value) {

            emit(patient.json.primary_care_provider_id + "_no-frequency.denominator.value", 1);

        } else {

            emit(patient.json.primary_care_provider_id + "_frequency.denominator.unit_" + timing.frequency.denominator.unit, 1);

        }


    }

}
