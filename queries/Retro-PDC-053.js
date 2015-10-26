function map(patient) {
    
    if (!filterProviders(patient.json.primary_care_provider_id, "PPhRR")) {
        return;
    }
    
    /**
     * Numerator:
     *   - 5+ medications
     *   - medications are active
     */
    function checkNumerator(referenceTime) {

        var medMin    = 5,

        // List of medications
        medList   = patient.medications(),

        // Filters
        medActive = medList.filter(
            function filter(med)
            {
              return isActiveMed(med, referenceTime.getTime()/1000);
            }
          );

        return isMatch(medActive) && ( medMin <= medActive.length );
    }

        /**
     * Denominator:
     *   - 65+ years old
     */
    function checkDenominator(referenceDate) {

        var ageMin = 65;
        var ia = isAgeReference(patient, ageMin, Number.POSITIVE_INFINITY, referenceDate);
        var ap = activePatient(patient, referenceDate);
        return ia && ap;
    }

    /**
     * Emit Numerator and Denominator, tagged with physician ID
     */
    try {
        var pdcEpoch = new Date(2010, 0, 1);//1st of jan 2010 is the pdc Epoch

        var now = new Date();

        for(var referenceDate = new Date(pdcEpoch.getTime()); referenceDate.getTime() < now.getTime(); referenceDate.setMonth(referenceDate.getMonth()+1))
        {
          var d = checkDenominator(referenceDate);
          var n = d && checkNumerator(referenceDate);//how to set the reference time?

          var pid = patient.json.primary_care_provider_id;

          emit("{\"date\":\"" + referenceDate.getTime() + "\",\"pid\":\"" + pid + "\",\"value\":\"denominator\"}", +d);
          emit("{\"date\":\"" + referenceDate.getTime() + "\",\"pid\":\"" + pid + "\",\"value\":\"numerator\"}", +n);
        }
    } catch (e) {
        emit(e.toString(), 1);
        print("MAP_REDUCE_ERROR::::{\"error\":\"" + e + "\"");//records the error in the mongo log
    }
}
