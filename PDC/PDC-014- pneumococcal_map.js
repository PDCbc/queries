// Reference Number: PDC-014
// Query Title: Pneumococcal vaccination, age 65+

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;

  // Target age range
  var ageMin = 65;

  // Store a list of recorded immunizations (CodedEntryList, API), patient object fn()
  var tgtList = patient.immunizations();

  // whoATC and SNOMED CT codes denote searchable medical terms (immunizations)
  var tgtCodes = {
      "whoATC": ["J07AL02"],
      "SNOMED-CT": ["12866006", "394678003"]
  };

  // Target dates: ends now, started two years ago, empty date defaults to now
  var now   = new Date();

  // 1 or 0: patient in our age range?
  function checkDenominator(){
    return ageMin <= patient.age( now );
  }

  // 1 or 0: tgtList has at least one match in tgtCodes (vaccinations)?
  function checkTarget(){
    return 0 < tgtList.match( tgtCodes ).length;
  }

  // Numerator must be a member of denominator and target groups
  var inDen = checkDenominator(),
      inNum = inDen && checkTarget();
  emit( "denominator" + pid, inDen );
  emit( "numerator"   + pid, inNum );
}
