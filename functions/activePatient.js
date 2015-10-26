/*
* Determines if a patient is active.
* 
* Leverages the definition provided in the Data Dictionary on the PDC Polarian instance, defined as:
*
*  (Record is flagged as active OR record in NOT flagged as inactive ) AND 
* 		(Documented encounter with 36 months OR Documented Prescription within 24 months)
*
* NOTE: the first part of the condition is satisfied by the record being in an E2E export...therefore we need not check it. 
*
* @param pt - patient object that contains the patient API
* @param refDate (Date) - a date to use as a reference, defaults to now if not passed. 
* @param frame (int) - number of seconds to use as the window for reference. i.e. how many seconds before the refDate, defaults to 2 years if not passed. 
*
* @return - true if the patient is considered active, false otherwise. 
*/

function activePatient( pt, refDate, frame ){


    if( !pt ){

        return false; 

    }

    refDate = refDate || new Date(); 
    frame   = frame || 94608000 ; //3 years in seconds: 60*60*24*365*3

    // check if they have an encounter in the last 24 months

    var eList = pt.encounters(); 

    var tmpTime = null; 

    for( var e = 0; e < eList.length; e++ ){

        tmpTime = eList[e].json.start_time; 

        //check that the time was defined
        if( tmpTime !== undefined && tmpTime !== null ){ 
            try{

                //check if the date of the counter falls within our range. 
                if( (tmpTime <= refDate.getTime()/1000) && (tmpTime >= (refDate.getTime()/1000 - frame)) ){

                    return true;  //if we get to here we have found an encounter that is valid as per the refDate and frame variables.

                }

            }catch( e ){ //catch any date parsing errors here. 
                //catch error and continue
            }
        }
    }

    // check if they have a medication in the last 24 months 

    var mList   = pt.medications(); 
    var start   = null; 
    var stop    = null; 
    var A       = Math.floor(refDate.getTime()/1000); 
    var B       = Math.floor(refDate.getTime()/1000 - frame); 

    for( var m = 0; m < mList.length; m ++ ){


        try{

            start = mList[m].json.start_time; 
            stop = mList[m].json.end_time; 


            if ( isNaN(start) || start === undefined || start === null ){

                continue; 

            }

             //if stop is not defined we assume it goes to infinity
            if ( isNaN(stop) || stop === undefined || start === null ){

                stop = 7258118400;  //Jan 1st 2200

            }

            start = Math.floor( (new Date( start*1000) ).getTime()/1000 ); //returns in number of seconds.
            stop = Math.floor( ( new Date(stop*1000) ).getTime()/1000 ); //returns in number of seconds.

        }catch(e){

            continue; 

        }
        

        //check that we have valid start and stop dates

        // Cases: 
        //
        // 1--|  2-----|    3----------|                    4------| 5---|
        //          |-------------------------------------------| 
        //          A                                           B
        //
        // 1) start < A && stop < A                                 -> exclude
        // 2) start < A && stop >= A                                -> include 
        // 3) start >= A && stop >= A && stop <= B && start < B     -> include 
        // 4) start <= B && stop > B                                -> include
        // 5) start > B && stop > B                                 -> exclude 

        if( start < A && stop < A ){ //case 1

            continue; 

        }else if( start < A && stop >= A ){ //case 2

            return true; 

        }else if( start >= A && stop >= A && start <= B && stop >= B ){ //case 3

            return true; 

        }else if( start > A && start <= B && stop > B ){ //case 4

            return true; 

        }else if( start > B && stop > B ){ //case 5

            continue; 

        }else{ //possible I missed a case, ignore the med. 

            continue; 

        }
    } 

    //if we get to here we failed the above tests and should return false. 
	return false; 
}
