// Reference Number: PDC-025
// Query Title: Diabetics with HGBA1C in last 6 mo

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Denominator: list of conditions, codes indicating diabetes
  var denList  = patient.conditions(),
      denCodes = {
      "ICD9": ["250*"]
  };

  // Target: list of test results, codes indicating HGBA1C (last 6 months)
  var tgtList  = patient.results(),
      tgtCodes = {
      "pCLOCD": ["4548-4"]
  };

  // Target dates: ends now, starts six months ago
  var end   = new Date(),
      start = new Date( end.getFullYear(), end.getMonth() - 6, end.getDate() );

  // 1 or 0: are denCodes (disabetes) in denList (conditions)?
  function checkDenominator() {
    return 0 < denList.regex_match( denCodes ).length;
  }

  // 1 or 0: are tgtGoces (HGBA1C, last 6 months), in tgtList (test results)?
  function checkTarget() {
    return 0 < tgtList.match( tgtCodes, start, end ).length;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator(),
      inNum = inDen && checkTarget();
  emit( "denominator" + pid, inDen );
  emit( "numerator"   + pid, inNum );
}
