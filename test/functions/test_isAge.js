module.exports = {


	/*
	*
	*/
	testUndefinedPatient : function(){

		if(!isAge()){
			return {result : true, message: "test passed!"}	
		}else{
			return {result : false, message : "passing undefined patient to isAge() should yield false."}; 	
		}

	},

	/*
	* Test a normal age range with the patient's age inside of the range. 
	*
	* Expected: isAge(); returns true. 
	*/
	testNormalAgeRange : function(){

		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000) 
			}
		); 

		if(isAge(p, 1, 11)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'true' for pt aged 10, min 1, max 10."}; 
		}
	},

	/*
	* Test the edge case where max and min are both zero and the patient's age is zero.
	* 
	* Expected: isAge() returns true. 
	*/
	testAgeZeroRangeZero : function(){

		var d = new Date(); 

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000) 
			}
		); 

		if(isAge(p, 0, 0)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'true' for pt aged 0, min 0, max 0."}; 
		}
	}
}


