/**
* Query Title: PDC-028
* Description: Diabetics with all BP <= 130/80 in last yr
*
* Explanation: Of patients with diabetes, how many have had their blood pressure
*              recorded in the last year, such that BP <= 130/80?
*/

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;


  /**
  * Denominator
  *
  * Values:
  *  no restriction
  *
  * Sets:
  *   list of conditions, code for diabetes, code filtered match
  */
  var denomiList    = patient.conditions(),
      denomiCodes   ={ "ICD9" :[ "250*" ]},
      denomiMatches = denomiList.regex_match( denomiCodes );


  /**
  * Target Group
  *
  * Values:
  *   1 year ago <= date <= now, 0 <= LDL <= 2.5 (=tMax)
  *
  * Sets:
  *   list of test results, code for systolic, code for diastolic,
  *   date filtered matches for systolic, date filtered matches for diastolic
  */
  var targetEnd   = new Date(),
      targetStart = new Date( targetEnd.getFullYear() - 1, targetEnd.getMonth(), targetEnd.getDate() ),
      targetMin_S = 0,
      targetMax_S = 130.0,
      targetMin_D = 0,
      targetMax_D = 80.0;

  var targetList      = patient.vitalSigns(),
      targetCodes_S   ={ "LOINC":[ "8480-6" ]},
      targetCodes_D   ={ "LOINC":[ "8462-4" ]},
      targetMatches_S = targetList.match( targetCodes_S, targetStart, targetEnd ),
      targetMatches_D = targetList.match( targetCodes_D, targetStart, targetEnd );


  /**
  * Emit Numerator and Denominator
  *
  * Denominator:  Diabetics
  * Target Group: LDL <= 130/80, recorded in last year
  * Numerator:    Intersection of denominator and target
  */
  var denominator = checkDenominator( denomiMatches ),
      numerator   = denominator && checkTarget( targetMatches_S, targetMin_S, targetMax_S)
                    && checkTarget( targetMatches_D, targetMin_D, targetMax_S );
      emit( "denominator" + pid, denominator );
      emit( "numerator"   + pid, numerator   );
}


/**
* Checks the patient for a denominator match
*
*   1 or 0: diabetic?
*/
function checkDenominator( matches ) {
  return 0 < matches.length;
}


/**
* Checks the patient for a target group match
*
*   1 or 0: BP <= 130/80? (already filtered by date)?
*     0 <= systolic <= 130, 0 <= diastolic <= 80
*/
function checkTarget( matches, min, max ) {

  if(! matches.length )
    return false;

  for( var i = 0, l = matches.length; i < l; i++ ){
    var value = matches[ i ].values()[ 0 ].scalar();
      if( min <= value && value <= max )
        return true;
  }
  return false;
}
