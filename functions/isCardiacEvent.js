/*
* Determines whether a particular condition is a cardiac event
* 
* A cardiac event is defined as: 
*   - A stroke, MI, or acute MI
*
* @param con {object} - a condition object from the patient api.
* 
* @return true if the condition falls within the definition of a cardiac event, 
*   false otherwise. 
*/

function isCardiacEvent( con ){

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

    // loop through the codes and match against the cardiac event definition.
    // return true if we find a match.
    for( var i = 0; i < codes.length; i ++ ){

        if( typeof codes[i] === 'string' ){

            if ( codes[i].match("^410\..*") || 
                 codes[i].match("^410$")    || 
                 codes[i].match("^411\..*") || 
                 codes[i].match("^411$")    || 
                 codes[i].match("^412\..*") || 
                 codes[i].match("^412$")    || 
                 codes[i].match("^429\.7$") || 
                 codes[i].match("^V17\.1$") || 
                 codes[i].match("^438$")    || 
                 codes[i].match("^433\.1$") || 
                 codes[i].match("^434\.1$") || 
                 codes[i].match("^438\.*$") 
            ){

                return true; 

            }

        }

    }

    return false; 

}