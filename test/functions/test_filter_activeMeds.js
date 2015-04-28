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


	


	

	// start > current and stop >> current -> inactive

	// start >> current and stop > current -> inactive

	// start < current and stop < current but within 20% window. -> active

	// start < current and stop < current  but right on the 20% boundary -> active

	// start < current and stop < current but slightly over the 20% boundary -> inactive


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
}