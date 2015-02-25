// Reference Number: PDC-022
// Query Title: Fasting blood sugar documented in last 3 yrs, age 45+

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Denominator: patients 45+
  var ageMin = 45;

  // Target: Store a list of recorded immunizations (CodedEntryList, API), patient object fn()
  var tgtList = patient.results();

  // These are searchable medical terms (?)
  var targetLabCodes = {
      "pCLOCD": ["14771-0"]
  };

  // Target dates: ends now, started three years ago, empty date defaults to now
  var end   = new Date(),
      start = new Date( end.getFullYear() - 3, end.getMonth(), end.getDate() );

  // 1 or 0: patient in our age range?
  function checkDenominator(){
    var age = patient.age( end );
    return ageMin <= patient.age( end );
  }

  // 1 or 0: tgtList has at least one match in targetCodes (vaccinations)?
  function checkTarget(){
    // API .match() returns targetCodes found in tgtList (CodedEntryList object)
    return 0 < tgtList.match( targetCodes, start, end ).length;
  }

  // Numerator must be a member of denominator and target groups
  var den = checkDenominator();
  var num = inDen && checkTarget();
  emit( "denominator" + pid, den );
  emit( "numerator"   + pid, num );
}
