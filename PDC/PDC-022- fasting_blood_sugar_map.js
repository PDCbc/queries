/**
* Query Title: PDC-022
* Query Type:  Ratio
* Description: Fasting glucose recorded in last 3 yrs / age 45+
*/
function map( patient ){
  /**
  * Denominator
  *
  * Base criteria:
  *   - 45+ years old
  */
  function checkDenominator(){
    // Values
    var ageMin = 45;

    return isAge( ageMin );
  }


  /**
  * Numerator
  *
  * Additional criteria:
  *   - has had fasting glucose (blood sugar) recorded
  *   --> tested in the last three years
  */
  function checkNumerator(){
    // Values
    var end   = new Date(),
        start = new Date( end.getFullYear() - 3, end.getMonth(), end.getDate() ),

      // Lists and codes
        resList  = patient.results(),

      // http://search.loinc.org/search.zul?query=fasting+glucose
        resCodes ={ "pCLOCD":[ "1493-6",    // Glucose [Mass/​volume] in Serum or Plasma --1.5 hours post 0.05-0.15 U insulin/​kg IV 12 hours fasting
                               "1500-8",     // Glucose [Mass/​volume] in Serum or Plasma --1 hour post 0.05-0.15 U insulin/​kg IV post 12H CFst
                               "1554-5",     // Glucose [Mass/​volume] in Serum or Plasma --12 hours fasting
                               "1550-3",     // Glucose [Mass/​volume] in Serum or Plasma --pre 12 hour fast
                               "1555-2",     // Glucose [Mass/​volume] in Urine --12 hours fasting
                               "1556-0",     // Fasting glucose [Mass/​volume] in Capillary blood
                               "1557-8",     // Fasting glucose [Mass/​volume] in Venous blood
                               "1558-6",     // Fasting glucose [Mass/​volume] in Serum or Plasma
                               "6764-5",     // Fasting glucose [Presence] in Urine by Test strip
                               "10450-5",    // Glucose [Mass/​volume] in Serum or Plasma --10 hours fasting
                               "14769-4",    // Glucose [Moles/​volume] in Serum or Plasma --pre 12 hour fast
                               "14770-2",    // Fasting glucose [Moles/​volume] in Capillary blood by Glucometer
                               "14771-0",    // Fasting glucose [Moles/​volume] in Serum or Plasma
                               "16913-6",    // Fasting glucose [Presence] in Urine
                               "17865-7",    // Glucose [Mass/​volume] in Serum or Plasma --8 hours fasting
                               "41604-0",    // Fasting glucose [Mass/​volume] in Capillary blood by Glucometer
                               "63382-6" ]}, // Fasting glucose [Mass/​volume] in Urine

    // Filters
      results = filter_general( resList, resCodes, start, end );

    return isMatch( results );
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
