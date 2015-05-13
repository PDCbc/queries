/*
* Determines if the patient has impaired renal function.
* 
* Uses the definition of impaired renal function provided in the 
*   Polarian Data Dictionary.
* 
* @param pt {object} -  a patient API object.
* 
* @return true if the patient has impaired renal function, false otherwise.
*/
function hasImpairedRenalFunction( pt ){
    

    if ( !pt || !pt.json ){

        return false; 

    }

    var cons = pt.conditions(); 

    if ( cons === undefined || cons === null || cons.length === 0 ){

        return false; 

    }


    var codes = null; 

    for ( var i = 0; i < cons.length; i++ ){

        if(
            cons[i].json.codes !== undefined && 
            cons[i].json.codes !== null      && 
            cons[i].json.codes.length !== 0  &&
            cons[i].json.codes["ICD9"] !== undefined &&
            cons[i].json.codes["ICD9"].length !== 0 

        ){

            var codes = cons[i].json.codes["ICD9"]; 

            for ( var j=0; j < codes.length; j++ ){

                if ( codes[j].match("^586.*") ){

                    return true; 

                }

            }

        }

    }


}