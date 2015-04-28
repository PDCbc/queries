/**
 * Filters a list of medications:
 *   - active status only (20% pad on time interval)
 *
 * @param (Array) matches -  a list of medications to handle
 * 
 * @return (Array) - containing only active medications. 
 *    if matches was undefined this will be an empty array. 
 */
function filter_activeMeds( matches ){

  var now      = new Date(),
      toReturn = new hQuery.CodedEntryList();

  if(matches === undefined || matches === null){
    return toReturn; 
  }

  for( var i = 0, L = matches.length; i < L; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   =( drug.indicateMedicationStop().getTime() - start )* 1.2,
        end   = start + pad;

    if( start <= now && now <= end )
      toReturn.push( drug );
  }
  return toReturn;
}