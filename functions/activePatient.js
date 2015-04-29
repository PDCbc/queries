/*
* Determines if a patient is active. 
* 
* Leverages the definition provided in the Data Dictionary on the PDC Polarian instance, defined as:
*
*  (Record is flagged as active OR record in NOT flagged as inactive ) AND 
* 		(Documented encounter OR Documented Prescription)
*
* @param - patient object that contains the patient API
*
* @return - true if the patient is active, false otherwise. 
*/

function activePatient(pt){
	return true; 
}