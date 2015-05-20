/*
* Determines if a patient has had a cardiac event, as defined by the 
* the isCardiacEvent() function. 
*
* @param pt {object} - the patient object from the patient api 
* 
* @return - true if the patient meets the criteria for a cardiac event,
*            false otherwise
*/
function hasCardiacEvent ( pt ){
    

    if ( pt === undefined || pt === null ){

        return false; 

    }

    var cons = pt.conditions(); 

    if ( cons === undefined || cons === null || cons.length === 0 ){

        return false; 

    }

    for ( var i = 0; i < cons.length; i++ ){

        if ( isCardiacEvent(cons[i])){

            return true; 

        }

    }

    return false; 

}