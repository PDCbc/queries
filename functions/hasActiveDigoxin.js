/*
* Determines if a patient has as an active medication
*   that is digoxin. 
*
* @param pt {object} - the patient API object.
* @param minDose {Number} - the minimum dose to check.
        if this value is not provided any dose will be considered.
* 
* @return - true if the patient has an active statin medication
*               false otherwise. 
*/
function hasActiveDigoxin( pt, minDose){
    
    //check if the input was valid.
    if ( 
        pt === undefined    ||
        pt === null         ||
        pt.json === undefined || 
        pt.json ===  null 
    ){
        return false; 
    }

    //set the default minDose to 0
    minDose = minDose || 0;

    var meds = pt.medications(); 

    if ( 
        meds === undefined  || 
        meds === null       || 
        meds.length === 0 
    ){

        return false
    }


    for ( var i = 0; i < meds.length; i++ ){

        if ( isActiveMed(meds[i])   && 
             meds[i].json.codes          &&
             meds[i].json.codes["whoATC"] 
        ){

            for (var j = 0; j < meds[i].json.codes["whoATC"].length; j++ ){

                if (meds[i].json.codes["whoATC"][j].match("^C01AA.*") ){

                    if (
                        meds[i].json.values      && 
                        meds[i].json.values[0].scalar
                    ){

                        try{

                            var v = parseFloat(meds[i].json.values[0].scalar)

                            if( v >= minDose){

                                return true; 

                            }
                        }catch(e){

                        }

                    }

                }

            }
            
        }

    }

    return false; 

}