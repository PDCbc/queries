/**
* Query Title: PDC-053
* Description: Patients, 65 and older, on 5 or more medications
*
* Explanation: Of patients aged 65+, how many have 5+ current medications?
*/

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;


  /**
  * Denominator
  *
  * Values:
  *  minimum age
  *
  * Sets:
  *   list of conditions, code for diabetes, code filtered match
  */
  var denomiAgeMin  = 65;

  var denomiList    = patient.conditions(),
      denomiCodes   ={ "ICD9" :[ "250*" ]},
      denomiMatches = denomiList.regex_match( denomiCodes );


  /**
  * Target Group
  *
  * Values:
  *   minimum number of current meds
  *
  * Sets:
  *   list of test results, code for systolic, code for diastolic,
  *   date filtered matches for systolic, date filtered matches for diastolic
  */
  var targetMin  = 5;

  var targetList = patient.medications();

  /**
  * Emit Numerator and Denominator
  *
  * Denominator:  Age >= 65
  * Target Group: Medication Count >= 5
  * Numerator:    Intersection of denominator and target
  */
  var denominator = checkDenominator( denomiAgeMin ),
      numerator   = denominator && checkTarget( targetList, targetMin );
      emit( "denominator" + pid, denominator );
      emit( "numerator"   + pid, numerator   );
}


/**
* Checks the patient for a denominator match
*
*   1 or 0: 65+ years old?
*/
function checkDenominator( ageMin ) {
  now = new Date();
  return ageMin <= patient.age( now );
}


/**
* Checks the patient for a target group match
*
*   1 or 0: 5+ medications
*/
function checkTarget( matches, min ) {
  if(! matches.length )
    return false;

  var now = new Date(),
      count = 0;

  for( var i = 0, l = matches.length; i < l; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   = ( drug.indicateMedicationStop().getTime() - start )* 1.2,
        end   = start + pad;

    if( start <= now && now <= end )
      count++;
  }
  return min <= count;
}
