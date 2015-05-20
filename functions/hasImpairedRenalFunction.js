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
    var labs = pt.results();


    if (cons !== undefined && cons !== null && cons.length > 0){

        for ( var i = 0; i < cons.length; i++ ){

            if(
                cons[i].json.codes !== undefined && 
                cons[i].json.codes !== null      && 
                cons[i].json.codes.length !== 0  &&
                cons[i].json.codes["ICD9"] !== undefined &&
                cons[i].json.codes["ICD9"].length !== 0 

            ){

                var conCodes = cons[i].json.codes["ICD9"]; 

                for ( var j=0; j < conCodes.length; j++ ){

                    if ( conCodes[j].match("^586.*") ){

                        return true; 

                    }

                }

            }

        }

    }
    
    if (labs !== undefined && labs !== null && labs.length > 0){

        for ( var i = 0; i < labs.length; i++ ){

            if (
                labs[i].json.codes !== undefined && 
                labs[i].json.codes !== null      && 
                labs[i].json.codes.length !== 0  &&
                labs[i].json.codes["pCLOCD"] !== undefined &&
                labs[i].json.codes["pCLOCD"].length !== 0 &&
                labs[i].json.values !== undefined &&
                labs[i].json.values.length !==  0 
            ){

                var labCodes = labs[i].json.codes["pCLOCD"]; 

                for ( var j=0; j < labCodes.length; j++ ){

                    if ( labCodes[j].match("^14682-9") ){

                        try{

                            if (parseFloat(labs[i].json.values[0].scalar) > 150){

                                return true; 

                            }

                        }catch(e){

                        }
                        
                    }else if( labCodes[j].match("^33914-3") ){

                        try{

                            if ( parseInt(labs[i].json.values[0].scalar) > 50 ){

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