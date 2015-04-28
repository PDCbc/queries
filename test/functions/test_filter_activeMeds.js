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


	// start << current and stop < current -> inactive med.

	// start < current and stop > current -> active med

	// start < current and stop << current -> inactive

	// start > current and stop >> current -> inactive

	// start >> current and stop > current -> inactive

	// start < current and stop < current but within 20% window. -> active

	// start < current and stop < current  but right on the 20% boundary -> active

	// start < current and stop < current but slightly over the 20% boundary -> inactive

}