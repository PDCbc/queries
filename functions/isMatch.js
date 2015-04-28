/**
 * T/F: Does a filtered list contain matches (/is not empty)?
 * 
 * @param list - a list of of items to check
 * 
 * @result (boolean) - true if the filtered list contains matches, false otherwise. 
 */
function isMatch( list ) {
	try{
		return ( 0 < list.length );
	}catch(e){
		if(e.name === "TypeError"){
			return false; 	
		}
	}
}