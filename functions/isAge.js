/**
 * T/F: Does the patient fall in this age range?
 *   - inclusive range, boundary cases are counted
 *
 * @param pt - the hQuery patient object to consider, returns false if undefined.
 * @param ageMin - the lower bound of the age range, returns false if undefined. 
 * @param ageMax - upper bound of the age range, defaults to 200 if undefined. 
 *
 * @return (boolean) - true if the patient falls within range, false otherwise. 
 * 						Also returns false if the patient object or minAge is undefined.
 */
function isAge( pt, ageMin, ageMax ) {

	// Default values
	ageMax = ageMax || Number.MAX_VALUE;

	if(ageMin === undefined || ageMin === null){

		return false; 

	}

	if(pt === undefined || pt === null){

		return false; 

	}

	

    try{ //enclosed in try/catch b/c the patient api may behave unexpectedly. 

        ageNow = pt.age( new Date() );

    }catch(e){

        return false; 

    }

	//check that the ageNow value is defined.
	if(ageNow){

		return ( ageMin <= ageNow && ageNow <= ageMax );

	}else{

		return false; 

	}

}
