function preProcess(data){

	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var now = null; //get the current time. 

	//loop through and change the birthdate fields
	for(i in data){
		now = new Date();
		data[i].birthdate = Math.floor(now.setFullYear(now.getFullYear()+data[i].birthdate)/1000)-86400; 
	}
	
	return data; 
}; 

module.exports = { 
	preProcess : preProcess
}; 