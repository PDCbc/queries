/**
 * Query Title: PDC-054
 * Query Type:  Ratio
 * Desctiption: PolyRx: 10+ meds, 65+
 */
function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PPhRR")) {
        return;
    }

    /**
     * Denominator:
     *   - 65+ years old
     */
    function checkDenominator() {

        var ageMin = 65;

        return isAge(patient, ageMin);
    }

    /**
     * Numerator:
     *   - 10+ medications
     *   - medications are active
     */
    function checkNumerator() {
        var medMin = 10;

        // List of medications
        var medList = patient.medications();

        // Filters
        var medActive = filter_activeMeds(medList);

        return isMatch(medActive) && ( medMin <= medActive.length );

    }

    //Emit Numerator and Denominator, tagged with physician ID
    try {

        if (filterProviders(patient.json.primary_care_provider_id, "PPhRR")) {

            var denominator = activePatient(patient) && checkDenominator();
            var numerator   = denominator && checkNumerator();
            var physicianID = "_" + patient.json.primary_care_provider_id;

            emit("denominator" + physicianID, +denominator);
            emit("numerator" + physicianID, +numerator);
        }

    } catch (e) {
        emit("FAILURE_" + e);
    }
}
