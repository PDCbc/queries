// Reference Number: PDC-020
// Query Title: Colon screening, age 50-74

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Denominator: patients 50-74
  var ageMin = 50,
      ageMax = 74;

  // Target: list of recorded immunizations, codes indicating colon screening
  var targetList = patient.results(),
      targetCodes = {
      "pCLOCD": ["58453-2", "14563-1", "14564-9", "14565-6"]
  };

  // Target dates: ends now, started two years ago, empty date defaults to now
  var end   = new Date(),
      start = new Date( end.getFullYear() - 2, end.getMonth(), end.getDate() );

  // 1 or 0: patient in our age range?
  function checkDenominator(){
    var age = patient.age( end );
    return ageMin <= age && age <= ageMax;
  }

  // 1 or 0: targetList has at least one match in targetCodes (vaccinations)?
  function checkTarget(){
    return 0 < targetList.match( targetCodes, start, end ).length;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator(),
      inNum = inDen && checkTarget();
  emit( "denominator" + pid, inDen );
  emit( "numerator"   + pid, inNum );
}
