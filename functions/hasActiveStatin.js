/*
* Determines if a patient has an active statin.
* - Uses the definition of a statin provided in isStatin(). 
* - Uses the definition of a an active medication defined in isActiveMed 
*
* @param pt {object} - the patient API object.
* 
* @return - true if the patient has an active statin medication
*               false otherwise. 
*/
function hasActiveStatin( pt ){
    
    //check if the input was valid.
    if ( 
        pt === undefined    ||
        pt === null         ||
        pt.json === undefined || 
        pt.json ===  null 
    ){
        return false; 
    }

    var meds = pt.medications(); 

    if ( 
        meds === undefined  || 
        meds === null       || 
        meds.length === 0 
    ){

        return false
    }


    for ( var i = 0; i < meds.length; i++ ){

        if ( isActiveMed(meds[i]) && isStatin(meds[i]) ){

            return true; 

        }

    }

    return false; 

}