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

    if( matches === undefined || matches === null ){
        return toReturn; 
    }

    var med     = null; 
    var start   = null; 
    var pad     = null; 
    var end     = null; 

    for( var i = 0; i < matches.length; i++ ){

        med  = matches[ i ]; 

        //check that this med is recorded as active. 
        if(med.json.statusOfMedication.value === "active"){
            if(med.isLongTerm()){
                toReturn.push( med ); 
            }else if(med.indicateMedicationStart() && med.indicateMedicationStop){
                start = med.indicateMedicationStart().getTime(); 
                pad   = ( med.indicateMedicationStop().getTime() - start )* 1.2;
                end   = start + pad;

                if( start <= now && now <= end ){
                    toReturn.push( med );
                }
            }
        }
    }
    
    return toReturn;
}