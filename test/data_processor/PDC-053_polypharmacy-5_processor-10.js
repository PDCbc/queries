function preProcess(data){

	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var tmp_end  	= null; 
	var tmp_start  	= null; 
	var now 		= null; //get the current time. 

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
	}
	return data; 
}; 

module.exports = { 
	preProcess : preProcess
}; 