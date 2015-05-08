/*
* Determines whether or not a patient has Chronic Kidney Disease (CKD) on their problem list.
* 
* Definition of CKD is as per the data dictionary on PDC polarian:
*   Any of the following IDC9 Codes: 
*       -  585.*
*       -  581.*
*       -  582.*
*       -  583.*
*       -  587.*
*       -  588.*
*
* @param pt - the patient api object  
*
* @returns true if the patient has CKD, false otherwise. 
*/

function hasCKD( pt ) {

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

            if( 
                conditions[c].codes["ICD9"][s].match("^585.*") ||
                conditions[c].codes["ICD9"][s].match("^581.*") ||
                conditions[c].codes["ICD9"][s].match("^582.*") ||
                conditions[c].codes["ICD9"][s].match("^583.*") ||
                conditions[c].codes["ICD9"][s].match("^587.*") ||
                conditions[c].codes["ICD9"][s].match("^588.*") 

            ){

              return true; 

            }
          }
        }
    }

    return false;
}