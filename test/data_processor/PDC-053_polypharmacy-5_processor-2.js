function preProcess(data){


	//the current times in the data object are OFFSETS from the current
	// time by number of years. We need to adjust these to be absolute times.

	var now = null; //get the current time. 
	var x = null; 

	//loop through and change the birthdate fields
	for(i in data){
		now = new Date();
		data[i].birthdate = Math.floor(now.setFullYear(now.getFullYear()+data[i].birthdate)/1000)-86400; 

		x = new Date();  Math.floor((new Date()).getTime()/1000) - 1000;

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