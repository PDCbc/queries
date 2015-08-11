/**
* Determines whether a patient has the conition listed in the conditions.
*   follows the definition provided within the data dictionary on Polarian.
*
* @param pt - the patient object that contains the hQuery patient API.
* @param system - the code system for the specified condition
* @param condition - a regular expression for the condition. e.g., ^250.* for diabetes
* @return - true if the patient has the specified condition, false otherwise.
*/
function hasCondition( pt, system, condition ){

  //check if the pt api is correctly set up.
  if( pt === undefined ||
      pt === null ||
      pt.json === undefined ||
      pt.json === null ||
      system === undefined ||
      system === null ||
      condition === undefined ||
      condition === null){

    return false;

  }

  var conditions = pt.json.conditions;

  //check that we actually have conditions.
  if( conditions === undefined || conditions === null || conditions.length === 0 ){

    return false;

  }

  for( var c = 0; c < conditions.length; c ++ ){

    //check to see that we have an ICD9 code system for the condition.
    if( conditions[c] &&
        conditions[c].codes &&
        conditions[c].codes[system] &&
        conditions[c].codes[system].length > 0
    ){

      //loop through the codes for this condition and check if any of them match condition
      for( var s = 0; s < conditions[c].codes[system].length; s++ ){

        if( conditions[c].codes[system][s].match(condition) ){

          return true;

        }

      }

    }

  }

  //if we get to here, we didn't find the condition

  return false;

}
