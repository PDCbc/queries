/*
* Determines whether a particular condition is part of those defined by the SPICT document as an indicator of Eol
* 
* A patient is assumed to be Eol( or a physician would not be surprised if they passed in the next 6 months to a year)
* if they have one or more of the SPICT clinical indicators listed below as ICD 9 codes.
*
* The exact SPICT indicators and the ICD9 codes/explanations can be found in the EoL Patient Definition doc
*
* @param pt - the patient api object
 *
 * @returns true if the patient has any of the conditions, false otherwise.
*/

function hasEoLCondition( pt ){
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
                    // Neurological disease
                    conditions[c].codes["ICD9"][s].match("^784.5") ||
                    conditions[c].codes["ICD9"][s].match("^V41.6") ||
                    conditions[c].codes["ICD9"][s].match("^770.16")||
                    conditions[c].codes["ICD9"][s].match("^518.81")||
                    conditions[c].codes["ICD9"][s].match("^518.83")||
                    conditions[c].codes["ICD9"][s].match("^518.84")||
                    // Liver disease
                    conditions[c].codes["ICD9"][s].match("^571.2")||
                    conditions[c].codes["ICD9"][s].match("^571.5")||
                    conditions[c].codes["ICD9"][s].match("^571.6")||
                    conditions[c].codes["ICD9"][s].match("^572.2")||
                    conditions[c].codes["ICD9"][s].match("^572.4")||
                    conditions[c].codes["ICD9"][s].match("^567.23")||
                    conditions[c].codes["ICD9"][s].match("^789.51")||
                    conditions[c].codes["ICD9"][s].match("^456.0")||
                    conditions[c].codes["ICD9"][s].match("^456.1")||
                    conditions[c].codes["ICD9"][s].match("^456.2")||
                    // Respiratory disease
                    conditions[c].codes["ICD9"][s].match("^491\..*")||
                    conditions[c].codes["ICD9"][s].match("^492\..*")||
                    conditions[c].codes["ICD9"][s].match("^494\..*")||
                    conditions[c].codes["ICD9"][s].match("^496\..*")||
                    conditions[c].codes["ICD9"][s].match("^V46.2")||
                    // Dementia/Frailty
                    conditions[c].codes["ICD9"][s].match("^780.31")||
                    conditions[c].codes["ICD9"][s].match("^780.32")||
                    // Kidney disease
                    conditions[c].codes["ICD9"][s].match("^585.4")||
                    conditions[c].codes["ICD9"][s].match("^585.5")||
                    // Heart/vascular disease
                    conditions[c].codes["ICD9"][s].match("^428\..*")||
                    conditions[c].codes["ICD9"][s].match("^402.01")||
                    conditions[c].codes["ICD9"][s].match("^402.11")||
                    conditions[c].codes["ICD9"][s].match("^402.91")||
                    conditions[c].codes["ICD9"][s].match("^404.01")||
                    conditions[c].codes["ICD9"][s].match("^404.03")||
                    conditions[c].codes["ICD9"][s].match("^404.11")||
                    conditions[c].codes["ICD9"][s].match("^404.13")||
                    conditions[c].codes["ICD9"][s].match("^404.91")||
                    conditions[c].codes["ICD9"][s].match("^404.93")||
                    // Cancer
                    conditions[c].codes["ICD9"][s].match("^196.9")||
                    conditions[c].codes["ICD9"][s].match("^197.7")||
                    conditions[c].codes["ICD9"][s].match("^198.3")||
                    conditions[c].codes["ICD9"][s].match("^198.5")

                ){

                    return true;

                }
            }
        }
    }

    return false;
}
