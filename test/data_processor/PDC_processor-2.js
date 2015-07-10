function preProcess(data){

	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var now = null; //get the current time.
	var x = null;
	for(var i in data){
		//set the birthdates.
		now = new Date();
		data[i].birthdate = Math.floor(now.setFullYear(now.getFullYear()+data[i].birthdate)/1000)-86400;

		var m;

		for( m in data[i].medications ){

			//set the start date of the medication
			now = new Date();
			data[i].medications[m].start_time = Math.floor(now.setFullYear(now.getFullYear()+data[i].medications[m].start_time)/1000);

			//set the end date of the medication
			now = new Date();
			data[i].medications[m].end_time = Math.floor(now.setFullYear(now.getFullYear()+data[i].medications[m].end_time)/1000);
		}

		for( m in data[i].vital_signs )
		{
			//set the start date of the cmo
			now = new Date();
			now = Math.floor(now.getTime()/1000 - 1000);

			data[i].vital_signs[m].start_time = now;
		}

		for( m in data[i].results )
		{
			//set the start date of the cmo
			now = new Date();
			now = Math.floor(now.getTime()/1000 - 1000);

			data[i].results[m].start_time = now;
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
}

module.exports = {
	preProcess : preProcess
};
