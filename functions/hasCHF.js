/**
* Determines whether a patient has CHF listed in the conditions.
*   follows the definition provided within the data dictionary on Polarian.
*
* From the data dictionary, CHF is defined as anything having ICD9 code 428.*. 
*
* @param pt - the patient object that contains the hQuery patient API. 
* 
* @return - true if the patient has CHF, false otherwise. 
*/
function hasCHF( pt ){

  //check if the pt api is correctly set up. 
  if( pt === undefined || pt === null || pt.json === undefined || pt.json === null ){

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
        conditions[c].codes["ICD9"] && 
        conditions[c].codes["ICD9"].length > 0
    ){

      //loop through the codes for this condition and check if any of them match CHF
      for( var s = 0; s < conditions[c].codes["ICD9"].length; s++ ){

        if( conditions[c].codes["ICD9"][s].match("^428.*") ){

          return true; 

        }

      }

    }

  }

  //if we get to here, we didn't find any CHF

  return false; 

}