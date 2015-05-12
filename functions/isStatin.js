/*
* Determines whether a particular medication is a statin.
* 
* The current definition of a statin is any medication that has:
*   whoATC: C10AA or C10BX
*
* @param med {object} - a medication object from the patient api.
* 
* @return true if the medication falls within the definition of a statin, 
*   false otherwise. 
*/

function isStatin( med ){

    //check for invalid input parameters
    if (med === undefined       || 
        med === null            || 
        med.json === undefined  || 
        med.json === null 
    ) {

        return false; 

    }


    //check that the medication 
    if ( med.json.codes === undefined || med.json.codes === null ){

        return false; 

    }

    if ( 
        med.json.codes['whoATC'] === undefined  || 
        med.json.codes['whoATC'] === null       || 
        med.json.codes['whoATC'].length === 0
    ){

        return false; 

    }

    var codes = med.json.codes['whoATC']; 

    // loop through the codes and match against the statin definition.
    // return true if we find a match.
    for( var i = 0; i < codes.length; i ++ ){

        if ( codes[i].match("^C10AA") || codes[i].match("^C10BX") ){

            return true; 

        }

    }

    return false; 

}