function preProcess(data){

	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var tmp_end  	= null; 
	var tmp_start  	= null; 
	var now 		= null; //get the current time. 
	var x 			= null;

	for(i in data){
		//set the birthdates.
		now = new Date();
		data[i].birthdate = Math.floor(now.setFullYear(now.getFullYear()+data[i].birthdate)/1000)-86400; 

		for(m in data[i].medications){

			//set the start date of the medication
			now = new Date();
			tmp_start = new Date();
			tmp_start.setDate(now.getDate() + data[i].medications[m].start_time); //adjust by 50 days, puts us at 15% of a year, within the 20% window.
			data[i].medications[m].start_time = Math.floor(tmp_start.getTime()/1000); 

			//set the end date of the medication
			now = new Date();
			tmp_end = new Date();
			tmp_end.setDate(now.getDate() + data[i].medications[m].end_time); //adjust by 50 days, puts us at 15% of a year, within the 20% window.
			data[i].medications[m].end_time = Math.floor(tmp_end.getTime()/1000); 
		}

		x = new Date();

		x = Math.floor(x.getTime()/1000 - 1000); 

		data[i].encounters = [{
			"_id": { "$oid": "551cce86c58406644d0000b5"},
	        "_type": "Encounter",
          	"codes": {
		        "code": [
		          "REASON"
		        ],
		        "codeSystem": [
		          "ObservationType-CA-Pending"
		        ]
		    },
      		"start_time": x //make a recent encounter to force them as active.
		}];
	}
	return data; 
}; 

module.exports = { 
	preProcess : preProcess
}; 