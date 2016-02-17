/**
 * Query Title: Retro-PDC-001
 * Query Type:  Pyramid
 * Description: Population Pyramid
 */
function map( patient )
{
  // Store physician ID, via JSON key
  var pid = patient.json.primary_care_provider_id;

  // Store gender (can't change) and index
  var gdr = getGender( patient );
  var index_gdrs;
  //
  if( gdr.toString().toUpperCase() === "FEMALE" )
    index_gdrs = 0;
  else if( gdr.toString().toUpperCase() === "MALE" )
    index_gdrs = 1;
  else if( gdr.toString().toUpperCase() === "UNDEFINED" )
    index_gdrs = 2;
  else
    index_gdrs = 3;

  // Constants
  var all_gdrs =[ "female", "male", "undifferentiated", "undefined" ];
  var all_ages =[ '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+' ];

  // Start, end (now) and counter dates
  var start = new Date(2010, 0, 24);//jan 1st 2010 adjust for execution date
  var end = new Date().getTime();
  var i = new Date( start.getTime() );
  //
  // Monthly results
  for( ; i.getTime() < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Array to emit from (by age range, then FEMALE/MALE/OTHER/UNDEF)
    var mask = [
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ]
    ];

    // Mask rows assigned by ageRange and columns by index_gdrs
    var index_ages;

    // Store age and date at time i
    var i_age  = patient.age( i );
    var i_date = i.getTime();

    // Add to mask if values check out
    if(
      activePatient( patient, i )&&
      typeof i_age === 'number' &&
      i_age >= 0
    ){
      // Divide age by ten and round down to get age range
      index_ages = Math.floor( i_age / 10 );

      // Cap off ranges at 90+
      if( index_ages > 9 )
        index_ages = 9;

      // Store in max
      mask[ index_ages ][ index_gdrs ] = 1;
    }

    // Output mask, arranged by g=gender and a=age
    for( var a = 0; a < all_ages.length; a++ )
    {
      for( var g = 0; g < all_gdrs.length; g++ )
      {
        emit(
          '{' +
            '"gender":"'   + all_gdrs[ g ] + '"' + ',' +
            '"ageRange":"' + all_ages[ a ] + '"' + ',' +
            '"pid":"'      + pid           + '"' + ',' +
            '"date":"'     + i_date        + '"' +
          '}',
          mask[ a ][ g ]
        );
      }
    }
  }
}
