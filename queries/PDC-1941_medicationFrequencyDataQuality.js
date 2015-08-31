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


    var meds   = patient.medications();
    var med    = null;
    var timing = null;

    for (var m = 0; m < meds.length; m++) {

        med = meds[m];

        if (!med.json.administrationTiming) {

            emit(patient.json.primary_care_provider_id + "_noTiming", 1);
            continue;

        }

        timing = med.json.administrationTiming;

        if (!timing.frequency || !timing.frequency.numerator || !timing.frequency.denominator || !timing.frequency.numerator.value || !timing.frequency.denominator.units || !timing.frequency.denominator.value) {

            emit(patient.json.primary_care_provider_id + "_noFrequency", 1);
            continue;
        }

        emit(patient.json.primary_care_provider_id + "_frequency-unit_"+timing.frequency.denominator.units, 1);

    }

}