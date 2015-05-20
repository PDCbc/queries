/**
 * Filters a list of medications for only active medications.
 * An active medication is defined within the polarian documentation for the project.
 *
 * Leverages a definition provided in isActiveMed() function.
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

    try{

        for( var i = 0; i < matches.length; i++ ){

            med  = matches[ i ]; 

            if ( isActiveMed(med) ){

                toReturn.push(med)

            }
        }

        return toReturn;

    }catch(e){

        return new hQuery.CodedEntryList(); 

    }
}