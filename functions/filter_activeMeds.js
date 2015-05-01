/**
 * Filters a list of medications for only active medications.
 * An active medication is defined as: 
 * 
 * (flagged_as_active AND flagged_as_longterm) || (flagged_as_active AND (start < current) AND (stop < current + 20%))
 *
 * @param (Array) matches -  a list of medications to handle
 * 
 * @return (Array) - containing only active medications. 
 *    if matches was undefined this will be an empty array. 
 */
function filter_activeMeds( matches ){

    var now = new Date(); 
    var toReturn = new hQuery.CodedEntryList();

    if( matches === undefined || matches === null || 
        matches.length === undefined || matches.length === 0 
    ){

        return toReturn; 
    }

    var med     = null; 
    var start   = null; 
    var pad     = null; 
    var end     = null; 

    try{

        now = Math.floor(now.getTime()/1000); 

        for( var i = 0; i < matches.length; i++ ){

            med  = matches[ i ]; 

            if(med === undefined || med === null || med.json === undefined || 
                med.json === undefined || med.json === null
            ){

               continue;  

            }

            //check that this med is recorded as active. 
            if( med.json.statusOfMedication !== undefined && 
                med.json.statusOfMedication !== null &&
                med.json.statusOfMedication.value === "active" 
            ){

                start = med.json.start_time;

                end = med.json.end_time; 


                if(med.isLongTerm()){

                    toReturn.push( med ); 

                }else if( !isNaN(start) && start !== undefined && start !== null ){


                    //determine if end is a valid input, if not set it to a long time in the future. 
                    if( isNaN(end) || end === undefined || end === null ){

                        end = 7258118400; //Jan 1st 2200 (in seconds from EPOCH)

                    }

                    //compute the amount to add to the duration for an active medication
                    pad = ( end - start ) * 1.2;

                    end = start + pad;

                    if( start <= now && now <= end ){

                        toReturn.push( med );

                    }
                }
            }
        }

        return toReturn;

    }catch(e){

        return new hQuery.CodedEntryList(); 

    }
}