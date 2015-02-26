// Reference Number: PDC-026
// Query Title: Diabetics with HGBA1C in the last year, value 7+
//
// Denominator: diabetics
// Target: HGBA1C >= 7, recorded in last year
// Numerator: intersection of denominator and target
//
// Explanation: Of patients with diabetes, how many have had HGBA1C recorded
//   in the last year, such that LDL >= 7.0?
//
function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Denominator: list of conditions, codes indicating diabetes
  var dConditions   = patient.conditions(),
      dCondiCodes   ={ "ICD9" :[ "250*" ]},
      dCondiMatches = dConditions.regex_match( dCondiCodes );

  // Target dates: ends now, starts one year ago
  var end   = new Date(),
      start = new Date( end.getFullYear() - 1, end.getMonth(), end.getDate() );

  // Target: list of test results, codes indicating HGBA1C (last 6 months)
  var tTResults  = patient.results(),
      tTResCodes ={ "pCLOCD" :[ "4548-4" ]},
      tTRMatches = tTResults.match( tTResCodes, start, end );

  // Target: HGBA1C >= 7.0
  var tMin = 7.0;

  // 1 or 0: are dCondiCodes (disabetes) in dConditions (conditions)?
  function checkDenominator() {
    return 0 < dCondiMatches.length;
  }

  // 1 or 0: are tTResCodes (HGBA1C, last 6 months), in tTResults (test results)?
  function checkTarget() {
    if(! tTRMatches.length )
      return false;

    for( var i = 0, l = tTRMatches.length; i < l; i++ ){
      if( tTRMatches.length[ i ].values()[ 0 ].scalar >= tMin ){
        return true;
      }
    }
    return false;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator(),
      inNum = inDen && checkTarget();
  emit( "denominator" + pid, inDen );
  emit( "numerator"   + pid, inNum );
}
