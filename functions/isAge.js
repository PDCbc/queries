/**
 * T/F: Does the patient fall in this age range?
 *   - inclusive range, boundary cases are counted
 *
 * @param pt - the hQuery patient object to consider. 
 * @param ageMin - the lower bound of the age range.
 * @param ageMax - upper bound of the age range.
 *
 * @return (boolean) - true if the patient falls within range, false otherwise. 
 * 						Also returns false if the patient object is undefined.
 */
function isAge( pt, ageMin, ageMax ) {

	// Default values
	ageMax = ageMax || 200;
	ageMin = ageMin || 0;

	if(pt === undefined || pt === null){
		return false; 
	}

	ageNow = pt.age( new Date() );
	
	return ( ageMin <= ageNow && ageNow <= ageMax );
}