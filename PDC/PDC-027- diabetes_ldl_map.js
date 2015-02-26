// Reference Number: PDC-027
// Query Title: Diabetics with LDL in last yr, LDL <= 2.5
//
// Denominator: diabetics
// Target: LDL <= 2.5, recorded in last year
// Numerator: intersection of denominator and target
//
// Explanation: Of patients with diabetes, how many have had LDL recorded in
//   the last year, such that LDL <= 2.5?
//
function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Denominator: list of conditions, code indicating diabetes, matches
  var dConditions   = patient.conditions(),
      dCondiCodes   ={ "ICD9" :[ "250*" ]},
      dCondiMatches = dConditions.regex_match( dCondiCodes );

  // Target dates: ends now, starts one year ago
  var end   = new Date(),
      start = new Date( end.getFullYear() - 1, end.getMonth(), end.getDate() );

  // Target: list of test results, code for HGBA1C, matches in date range
  var dTResults  = patient.results(),
      dTResCodes ={ "pCLOCD" :[ "39469-2" ]},
      dTRMatches = dTResults.match( dTResCodes, start, end );

  // Target: LDL <= 2.5
  var tgtMax = 2.5;

  // 1 or 0: diabetic?
  function checkDenominator() {
    return 0 < dCondiMatches.length;
  }

  // 1 or 0: LDL in last year, such that LDL <= 2.5?
  function checkTarget() {
    for( var i = 0, l = dTRMatches.length; i < l; i++ ){
        if( dTRMatches[ i ].values()[ 0 ].scalar() <= tgtMax )
          return true;
    }
    return false;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator(),
      inNum = inDen && checkTarget();
      emit( "denominator" + pid, inDen );
      emit( "numerator"   + pid, inNum );
}
