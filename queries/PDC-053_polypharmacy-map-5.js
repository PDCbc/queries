/**
 * Query Title: PDC-053
 * Query Type:  Ratio
 * Desctiption: PolyRx:  5+ meds, 65+
 */
function map( patient ){
  /**
   * Denominator:
   *   - 65+ years old
   */
  function checkDenominator(){

    var ageMin = 65;

    return isAge( patient, ageMin );
  }

  /**
   * Numerator:
   *   - 5+ medications
   *   - medications are active
   */
  function checkNumerator(){

    var medMin    = 5,

    // List of medications
        medList   = patient.medications(),

    // Filters
        medActive = filter_activeMeds( medList );

    return isMatch( medActive )&&( medMin <= medActive.length );
  }

  /**
   * Emit Numerator and Denominator, tagged with physician ID
   */
  var denominator = checkDenominator(),
      numerator   = denominator && checkNumerator(),
      physicianID = "_" + patient.json.primary_care_provider_id;

  emit( "denominator" + physicianID, +denominator );
  emit( "numerator"   + physicianID, +numerator   );
}