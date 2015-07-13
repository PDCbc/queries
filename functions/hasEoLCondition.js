/*
* Determines whether a particular condition is part of those defined by the SPICT document as an indicator of Eol
* 
* A patient is assumed to be Eol( or a physician would not be surprised if they passed in the next 6 months to a year)
* if they have one or more of the SPICT clinical indicators listed below as ICD 9 codes.
*
* @param con {object} - a condition object from the patient api.
* 
* @return true if the condition falls within the definition of a cardiac event, 
*   false otherwise. 
*/

function hasEoLCondition( con ){

    //check for invalid input parameters
    if (    con === undefined       || 
            con === null            || 
            con.json === undefined  || 
            con.json === null 
    ) {

        return false; 

    }


    //check that the condition has a coded entry list 
    if ( con.json.codes === undefined || con.json.codes === null ){

        return false; 

    }

    if ( 
        con.json.codes['ICD9'] === undefined  || 
        con.json.codes['ICD9'] === null       || 
        con.json.codes['ICD9'].length === 0
    ){

        return false; 

    }

    var codes = con.json.codes['ICD9']; 

    // loop through the codes and match against the SPICT clinical indicators definition
    // return true if we find a match.
    for( var i = 0; i < codes.length; i ++ ){

        if( typeof codes[i] === 'string' ){

            if ( // Neurological disease
                codes[i].match("^784.5") ||
                codes[i].match("^V41.6") ||
                codes[i].match("^770.16")||
                codes[i].match("^518.81")||
                codes[i].match("^518.83")||
                codes[i].match("^518.84")||
                 // Liver disease
                codes[i].match("^571.2")||
                codes[i].match("^571.5")||
                codes[i].match("^571.6")||
                codes[i].match("^572.2")||
                codes[i].match("^572.4")||
                codes[i].match("^567.23")||
                codes[i].match("^789.51")||
                codes[i].match("^456.0")||
                codes[i].match("^456.1")||
                codes[i].match("^456.2")||
                // Respiratory disease
                codes[i].match("^491\..*")||
                codes[i].match("^492\..*")||
                codes[i].match("^494\..*")||
                codes[i].match("^496\..*")||
                codes[i].match("^V46.2")||
                // Dementia/Frailty
                codes[i].match("^780.31")||
                codes[i].match("^780.32")||
                // Kidney disease
                codes[i].match("^585.4")||
                codes[i].match("^585.5")||
                // Heart/vascular disease
                codes[i].match("^428\..*")||
                codes[i].match("^402.01")||
                codes[i].match("^402.11")||
                codes[i].match("^402.91")||
                codes[i].match("^404.01")||
                codes[i].match("^404.03")||
                codes[i].match("^404.11")||
                codes[i].match("^404.13")||
                codes[i].match("^404.91")||
                codes[i].match("^404.93")||
                // Cancer
                codes[i].match("^196.9")||
                codes[i].match("^197.7")||
                codes[i].match("^198.3")||
                codes[i].match("^198.5")

            ){

                return true; 

            }

        }

    }

    return false; 

}