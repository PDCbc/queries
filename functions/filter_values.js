/**
* Used by filter_general() and filter_general()
*   - inclusive range, boundary cases are counted
*
*
* @param list -  A coded entry list? 
* @param min - a minimum value to compare against, defaults to Number.MIN_VALUE
* @param max - a maximum value to compare against, defaults to Number.MAX_VALUE
*/
function filter_values( list, min, max ){
  // Default value
  max = max || Number.MAX_VALUE;
  list = list || []; 
  min = min || Number.MIN_VALUE; 

  var toReturn = new hQuery.CodedEntryList();

  for( var i = 0, L = list.length; i < L; i++ ){
    // Try-catch for missing value field in lab results
    try {

      var entry  = list[ i ]; 
      var scalar = entry.values()[ 0 ].scalar();

      if( min <= scalar && scalar <= max ){
        toReturn.push( entry );
      }

    }
    catch( err ){
      emit( "Values key is missing! " + err, 1 );
    }
  }
  return toReturn;
}