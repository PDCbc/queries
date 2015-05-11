function preProcess(data){

	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var now = null; //get the current time. 
	for(i in data){
		//set the birthdates.
		now = new Date();
		data[i].birthdate = Math.floor(now.setFullYear(now.getFullYear()+data[i].birthdate)/1000)-86400; 

		for(m in data[i].medications){

			//set the start date of the medication
			now = new Date();
			data[i].medications[m].start_time = Math.floor(now.setFullYear(now.getFullYear()+data[i].medications[m].start_time)/1000); 

			//set the end date of the medication
			now = new Date();
			data[i].medications[m].end_time = Math.floor(now.setFullYear(now.getFullYear()+data[i].medications[m].end_time)/1000); 
		}
	}
	return data; 
}; 

module.exports = { 
	preProcess : preProcess
}; 