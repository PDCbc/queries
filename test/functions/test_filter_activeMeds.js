module.exports = {
	
	testUndefinedParam : function(){

		try{
			var result = filter_activeMeds(); 
		}catch(e){
			return null; 
		}

		if(result === undefined){
			return {result:false, message : "undefined list should result in empty list response"}; 
		}else if(result.length === undefined){
			return {result:false, message : "undefined list should result in empty list response"}; 
		}else if(result.length === 0){
			return {result:true, message : "test passed"}; 
		}
	}, 





	/*
	* Test the case where the start is in the past and the stop date also in the past.  
	* This is case must also be clearly outside the 120% time window.
	* 
	*  (start << current && stop < current) -> inactive med.
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStartLessThanCurrentAndStopLessThanCurrent : function(){


		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear(start.getFullYear() - 2); 
		stop.setFullYear(stop.getFullYear() - 1 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if(result.length == 0){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was non-zero"}; 
     	}
	},

	/*
	* When the start is less than the current time
	* 	and the stop is greater than the current time. 
	* 
	*  	(start < current) && (stop > current) -> active med
	* 
	* Expected: the medication will be in the results.
	*/
	testStartLessThanCurrentAndStopAfterThanCurrent : function(){


		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear(start.getFullYear() - 2); 
		stop.setFullYear(stop.getFullYear() + 1 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	},

	/*
	* When the start is less than the current time
	* 	and the stop is much later than the current time. 
	* 
	*  	 (start < current) && (stop << current) -> inactive
	* 
	* Expected: the medication will not be in the results.
	*/
	testStartLessThanCurrentAndStopMuchLessThanCurrent : function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() - 2 ); 
		stop.setFullYear( stop.getFullYear() - 3 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	},


	/*
	* Test the case where start is after the current time and the stop 
	* time of the medication is even further in the future. 
	* 
	* (start > current) && (stop >> current) -> inactive
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStartAfterCurrentAndStopAfterCurrent : function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() + 2 ); 
		stop.setFullYear( stop.getFullYear() + 3 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	}, 

	/*
	* Test the case where  stop is after current 
	* and the start is after the stop. (this would be an invalid time window.) 
	* 
	* (start >> current) && (stop > current) -> inactive
	* 
	* Expected: the medication will not be in the results. 
	*/
	testStopAfterCurrendAndStartAfterCurrent : function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() + 3 ); 
		stop.setFullYear( stop.getFullYear() + 2 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current but within 20% window. -> active
	* 
	*	start = current - (1 yr) - (15% of a year)
	* 	stop  = current - (15% of a year) 
	*
	* 	(15% of a year) = 365*0.15 = 54.75 ~= 55 days. 
	* 
	* Expected: the medication will be in the results. 
	*/
	testWithin20PercentWindow: function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 55 ); //add in the extra 55 days

		stop.setDate( stop.getDate() - 55 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current  but right on the 20% boundary -> active
	* 
	*	start = current - (1 yr) - (20% of a year)
	* 	stop  = current - (20% of a year) 
	*
	* 	(20% of a year) = 365*0.20 = 73 days.  //we will make this 72 to deal with calendar (closer to 19.xx%)
	* 
	* Expected: the medication will be in the results. 
	*/
	testOn20PercentWindow : function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 72 ); //add in the extra 55 days

		stop.setDate( stop.getDate() - 72 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 1 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 1 as expected."}; 
     	}
	}, 

	/*
	* Test case where start is less than current and stop is less than current
	* 	but the current date is within 120% of the duration of the medication. 
	* 
	*  	start < current and stop < current but slightly over the 20% boundary -> inactive
	* 
	*	start = current - (1 yr) - (25% of a year)
	* 	stop  = current - (25% of a year) 
	*
	* 	(25% of a year) = 365*0.25 = 91 days.  
	* 
	* Expected: the medication will be in the results. 
	*/
	testOn20PercentWindow : function(){

		var start = new Date(); 
		var stop = new Date(); 

		start.setFullYear( start.getFullYear() - 1 ); 

		start.setDate( start.getDate() - 91 ); //add in the extra 55 days

		stop.setDate( stop.getDate() - 91 ); 

		var obj = {
			"primary_care_provider_id" : "PROVIDER1", 
			"birthdate": -70, 
			"medications" : [
  				{ 
	  				"_id" : { "$oid" : "551cce86c58406644d0000c4" }, "_type" : "Medication",   "time" : -1,
	    			"start_time" : Math.floor(start.getTime()/1000), "end_time" : Math.floor(stop.getTime()/1000), 
	    			"statusOfMedication" : { "value" : "active" },
	     			"codes" : { "HC-DIN" : [ "00559407" ], "whoATC" : [ "N02BE01" ] }, 
	     			"freeTextSig" : ""
     			} 
     		]
     	}

     	try{
	     	var p  = new hQuery.Patient(obj); 
	     	var result = filter_activeMeds(p.medications()); 
     	}catch(e){

     	}

     	if( result.length == 0 ){
     		return {result : true, message : "test passed"}; 
     	}else{
     		return {result : false, message : "number of active meds was "+result.length+" not 0 as expected."}; 
     	}
	}
}