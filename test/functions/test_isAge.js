/*
* Unit tests for the isAge function 
*/

module.exports = {

	/*
	* Test case where a patient is undefined.
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
	}, 

	/*
	* Test a patient with age that is out of the current age range. 
	* 
	* Expected: isAge() returns false. 
	*/
	testAgeBelowRange : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000) 
			}
		); 

		if(!isAge(p, 11, 200)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'false' for pt aged 10, min 11, max 200."}; 
		}
	},

	/*
	* Test a patient with age that is out of the current age range. 
	* 
	* Expected: isAge() returns false. 
	*/
	testAgeAboveRange : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 20); //10 years old.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000) 
			}
		); 

		if(!isAge(p, 11, 19)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'false' for pt aged 20, min 11, max 19."}; 
		}
	},

	/*
	* Test the case where the patient's age is on the upper boundary 
	* 
	* Expected: isAge() returns true. 
	*/
	testAgeOnUpperBound : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000) 
			}
		); 

		if(isAge(p, 5, 10)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'true' for pt aged 10, min 5, max 10."}; 
		}
	}, 

	/*
	* Test the case where age is on the lower bound of the range. 
	* 
	* Expected: isAge() returns true. 
	*/
	testAgeOnLowerBound : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		d.setDate(d.getDate() - 1);  //Offset by 1 day.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000)
			}
		); 

		if(isAge(p, 10, 20)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'true' for pt aged 10, min 10, max 20."}; 
		}
	},

	/*
	* Test that the isAge function returns false if the lower bound is not defined.
	* 
	* Expected: isAge() returns false. 
	*/
	testLowerUndefined : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		d.setDate(d.getDate());  //Offset by 1 day.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000)
			}
		); 

		if(!isAge(p, undefined, 15)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'false' if ageMin was undefined"}; 
		}
	},

	/*
	* Test that the isAge function works if the upper bound is not defined. *
	*
	* Expected: isAge() returns false. 
	*/
	testUpperUndefined : function(){
		var d = new Date(); 

		d.setFullYear(d.getFullYear() - 10); //10 years old.

		d.setDate(d.getDate());  //Offset by 1 day.

		var p = new hQuery.Patient(
			{
				birthdate: Math.floor(d.getTime()/1000)
			}
		); 

		if(isAge(p, 5)){
			return {result : true, message : "test passed"}; 
		}else{
			return {result : false, message : "should have returned 'true' if ageMax was undefined, since ageMax defaults to 200"}; 
		}
	},
}


