// Reference Number: PDC-020
// Query Title: Practice population profile

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Target age range
  var ageMin = 50,
      ageMax = 74;

  // Store a list of recorded immunizations (CodedEntryList, API), patient object fn()
  var targetList = patient.results();

  // These are searchable medical terms (?)
  var targetCodes = {
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
    // API .match() returns targetCodes found in targetList (CodedEntryList object)
    return 0 < targetList.match( targetCodes, start, end ).length;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator();
  var inNum = inDen && checkTarget();
  emit( "denominator" + pid, inDen );
  emit( "numerator" + pid,   inNum );
}
