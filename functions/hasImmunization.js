/**
* Determines whether a patient has the immunization listed in the immunizations.
*   follows the definition provided within the data dictionary on Polarian.
*
* @param pt - the patient object that contains the hQuery patient API.
* @param system - the code system for the specified condition
* @param immunization - a regular expression for the immunization. e.g., ^J07AL for pneumococcal
* @return - true if the patient has the specified condition, false otherwise.
*/
function hasImmunization( pt, system, immunization, dateMin, dateMax ){

  //check if the pt api is correctly set up.
  if( pt === undefined ||
      pt === null ||
      pt.json === undefined ||
      pt.json === null ||
      system === undefined ||
      system === null ||
      immunization === undefined ||
      immunization === null){

    return false;

  }

  var immunizations = pt.json.immunizations;

  //check that we actually have immunizations.
  if( immunizations === undefined || immunizations === null || immunizations.length === 0 ){

    return false;

  }

  for( var c = 0; c < immunizations.length; c ++ ){

    //check to see that we have a code and code system for the immunization.
    if( immunizations[c] &&
        immunizations[c].codes &&
        immunizations[c].codes[system] &&
        immunizations[c].codes[system].length > 0
    ){

      //loop through the codes for this condition and check if any of them match CHF
      for( var s = 0; s < immunizations[c].codes[system].length; s++ ){

        if( immunizations[c].codes[system][s].match(immunization) ){

          return true;

        }

      }

    }

  }

  //if we get to here, we didn't find the right code

  return false;

}
