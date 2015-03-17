/**
* Query Title: PDC-020
* Query Type:  Ratio
* Desctiption: Colon screenings, age 50-74
*/
function map( patient ){
  /**
  * Denominator
  *
  * Base criteria:
  *   - 50 to 74 years old
  */
  function checkDenominator(){
    // Values
    var ageMin = 50,
        ageMax = 74;

    return isAge( ageMin );
  }


  /**
  * Numerator
  *
  * Additional criteria:
  *   - have received a colon cancer screening (hemoccult test)
  *   --> tested in the last two years
  *   OR
  *   --> tested in the last five years
  *   - AND
  *   --- have received a colonoscopy OR sigmoidoscopy
  *   ----> in the last five years
  */
  function checkNumerator(){
    // Values
    var now    = new Date(),
        back2y = new Date( now.getFullYear() - 2, now.getMonth(), now.getDate() ),
        back5y = new Date( now.getFullYear() - 5, now.getMonth(), now.getDate() ),

    // List of results, result codes (hemoccult)
        resList     = patient.results(),

    // http://search.loinc.org/search.zul?query=hemoccult
        resCodes_Hc ={ "pCLOCD":[ "14563-1",   // Hemoglobin.gastrointestinal [Presence] in Stool --1st specimen
                                  "14564-9",   // Hemoglobin.gastrointestinal [Presence] in Stool --2nd specimen
                                  "14565-6",   // Hemoglobin.gastrointestinal [Presence] in Stool --3rd specimen
                                  "58453-2"]}, // Hemoglobin.gastrointestinal [Mass/​volume] in Stool by Immunologic method

    // http://search.loinc.org/search.zul?query=colonoscopy
        resCodes_CS ={ "LOINC":[ "18746-8",    // Colonoscopy study
                                 "28022-2",    // Colonoscopy Study observation Narrative
                                 "28023-0",    // Colonoscopy Study observation
                                 "28033-9",    // Colonoscopy.thru stoma Study observation Narrative
                                 "28034-7",    // Colonoscopy.thru stoma Study observation

    // http://search.loinc.org/search.zul?query=sigmoidoscopy
                                 "18753-4",    // Flexible sigmoidoscopy study
                                 "19795-4",    // Insertion depth Gastrointestine lower Flexible sigmoidoscopy
                                 "28026-3",    // Flexible sigmoidoscopy Study observation Narrative
                                 "28027-1"]},  // Flexible sigmoidoscopy Study observation

    // Filters
        results_CS_5y = filter_general( resList, resCodes_Hc, back5y ),
        results_Hc_5y = filter_general( resList, resCodes_Hc, back5y ),
        results_Hc_2y = filter_general( results_Hc_5y, resCodes_Hc, back2y );

    return isMatch( results_Hc_2y )||
           ( isMatch( results_Hc_5y )&& isMatch( results_CS_5y ));
  }


  /**
  * Emit Numerator and Denominator:
  *   - numerator must also be in denominator
  *   - tagged with physician ID
  */
  var denominator = checkDenominator(),
      numerator   = denominator && checkNumerator(),
      physicianID = "_" + patient.json.primary_care_provider_id;

  emit( "denominator" + physicianID, denominator );
  emit( "numerator"   + physicianID, numerator   );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a list of lab results:
*   - lab, medication and condition codes (e.g. pCLOCD, whoATC, HC-DIN)
*   - minimum and maximum values
*   --> exclusive range, boundary cases are excluded
*   - start and end dates
*/
function filter_general( list, codes, p1, p2, p3, p4 ){
  // Default variables = undefined
  var min, max, start, end, filteredList;

  // Check parameters, which can be dates or scalars (numbers)
  if( p1 instanceof Date ){
    start = p1;
    end   = p2;
    min   = p3;
    max   = p4;
  }
  else {
    min   = p1;
    max   = p2;
    start = p3;
    end   = p4;
  }

  // Use API's match functions to filter based on codes and dates
  //   - Immunizations, medications and results use an exact code match
  //   - Conditions use a regex match, so make sure to preface with '\\b'!
  if(( list[0] )&&( list[0].json._type === 'Condition' ))
    filteredList = list.regex_match( codes, start, end );
  else
    filteredList = list.match( codes, start, end );

  // If there are scalar values (min/max), then filter with them
  if( typeof min === 'number' ){
    // Default value
    max = max || 1000000000;
    filteredList = filter_values( filteredList, min, max );
  }

  return filteredList;
}


/**
* Filters a list of medications:
*   - active status only (20% pad on time interval)
*/
function filter_activeMeds( matches ){
  var now      = new Date(),
      toReturn = new hQuery.CodedEntryList();

  for( var i = 0, l = matches.length; i < l; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   =( drug.indicateMedicationStop().getTime() - start )* 1.2,
        end   = start + pad;

    if( start <= now && now <= end )
      toReturn.push( drug );
  }
  return toReturn;
}


/**
* Used by filter_general() and filter_general()
*   --> exclusive range, boundary cases are excluded
*/
function filter_values( list, min, max ){
  // Default value
  max = max || 1000000000;

  var toReturn = new hQuery.CodedEntryList();

  // Builds a set with values meeting min/max
  for( var i = 0, L = list.length; i < L; i++ ){
    var entry  = list[ i ],
        scalar = entry.values()[0].scalar();

    if( min < scalar && scalar < max )
      toReturn.push( entry );
  }
  return toReturn;
}


/**
* T/F: Does a filtered list contain matches (/is not empty)?
*/
function isMatch( list ) {
  return 0 < list.length;
}


/**
* T/F: Does the patient fall in this age range?
*/
function isAge( ageMin, ageMax ) {
  // Default values
  ageMax = ageMax || 200;

  ageNow = patient.age( new Date() );
  return ( ageMin <= ageNow && ageNow <= ageMax );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a list of lab results:
*   - lab, medication and condition codes (e.g. pCLOCD, whoATC, HC-DIN)
*   - minimum and maximum values
*   --> exclusive range, boundary cases are excluded
*   - start and end dates
*/
function filter_general( list, codes, p1, p2, p3, p4 ){
  // Default variables = undefined
  var min, max, start, end;

  // Check parameters, which can be dates or scalars (numbers)
  if( p1 instanceof Date ){
    start = p1;
    end   = p2;
    min   = p3;
    max   = p4;
  }
  else {
    min   = p1;
    max   = p2;
    start = p3;
    end   = p4;
  }

  // Check parameters, which can be dates or scalars (numbers)
  var filteredList = list.match( codes, start, end );

  // If there are scalar values (min/max), then filter with them
  if( typeof min === 'number' ){
    // Default value
    max = max || 1000000000;
    filteredList = filter_values( filteredList, min, max );
  }

  return filteredList;
}


/**
* Filters a list of medications:
*   - active status only (20% pad on time interval)
*/
function filter_activeMeds( matches ){
  var now      = new Date(),
      toReturn = new hQuery.CodedEntryList();

  for( var i = 0, l = matches.length; i < l; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   =( drug.indicateMedicationStop().getTime() - start )* 1.2,
        end   = start + pad;

    if( start <= now && now <= end )
      toReturn.push( drug );
  }
  return toReturn;
}


/**
* Used by filter_general() and filter_general()
*   --> exclusive range, boundary cases are excluded
*/
function filter_values( list, min, max ){
  // Default value
  max = max || 1000000000;

  var toReturn = new hQuery.CodedEntryList();

  // Builds a set with values meeting min/max
  for( var i = 0, L = list.length; i < L; i++ ){
    var entry  = list[ i ],
        scalar = entry.values()[0].scalar();

    if( min < scalar && scalar < max )
      toReturn.push( entry );
  }
  return toReturn;
}


/**
* T/F: Does a filtered list contain matches (/is not empty)?
*/
function isMatch( list ) {
  return 0 < list.length;
}


/**
* T/F: Does the patient fall in this age range?
*/
function isAge( ageMin, ageMax ) {
  // Default values
  ageMax = ageMax || 200;

  ageNow = patient.age( new Date() );
  return ( ageMin <= ageNow && ageNow <= ageMax );
}
