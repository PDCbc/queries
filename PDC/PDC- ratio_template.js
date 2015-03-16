/**
* Query Title: PDC-###
* Query Type:  Ratio
* Description: $$$ ...
*/
function map( patient ){
  /**
  * Denominator
  *
  * Base criteria:
  *   - <ageMin> to <ageMax> years old
  *   - has { "convention": ["code", ..., ""]} condition
  *   --> OR values <medMin> < <medication> < <medMax>
  *   - medication is active (filter_medActive())
  */
  // Declare shared variables within the scope for map()
  var mapScope_$$$List;

  function checkDenominator(){
    // Values
    //   - ages and min/max values
    var ageMin   = ##,
        ageMax   = ##,
        valMin   = ###,
        valMax   = ###,

    // Dates
    //   - subtract from now as Y, M, D
    //   - change now with: Date( YYYY, MM, DD ),
        now      = new Date(),
        medStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),
        resStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),
        vitStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),

    // Lists
        conList  = patient.conditions(),
        immList  = patient.immunizations(),
        medList  = patient.medications(),
        resList  = patient.results(),
        vitList  = patient.vitalSigns(),

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        conCodes ={ "ICD9"      :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        immCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "SNOMED-CT" :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        medCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "HC-DIN"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        resCodes ={ "pCLOCD"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        vitCodes ={ "LOINC"     :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // Filters
    //   - start/end and min/max may be used in either paired order
    //   - values may be ommitted (from right ) as necessary
    conditions    = filter_general( conList, conCodes, minStart, maxEnd, startMin, endMax ),
    immunizations = filter_general( immList, immCodes, minStart, maxEnd, startMin, endMax ),
    medications   = filter_general( medList, medCodes, minStart, maxEnd, startMin, endMax ),
    results       = filter_general( resList, resCodes, minStart, maxEnd, startMin, endMax ),
    vitalSigns    = filter_general( vitList, vitCodes, minStart, maxEnd, startMin, endMax );

    // Inclusion/exclusion
    //   - isAge() and isMatch() are boolean (yes/no)
    //   - use && (AND) and || (OR) with brackets (...)
    return isAge( ageMin, ageMax )  && / ||
           isMatch( conditions )    && / ||
           isMatch( immunizations ) && / ||
           isMatch( medications )   && / ||
           isMatch( results )       && / ||
           isMatch( vitalSigns );
  }


  /**
  * Numerator
  *
  * Additional criteria:
  *   - <ageMin> to <ageMax> years old
  *   - has { "convention": ["code", ..., ""]} condition
  *   --> OR values <medMin> < <medication> < <medMax>
  *   - medication is active (filter_medActive())
  */
  function checkNumerator(){
    // Values
    //   - ages and min/max values
    var ageMin   = ##,
        ageMax   = ##,
        valMin   = ###,
        valMax   = ###,

    // Dates
    //   - subtract from now as Y, M, D
    //   - change now with: Date( YYYY, MM, DD ),
        now      = new Date(),
        medStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),
        resStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),
        vitStart = new Date( now.getFullYear() - ###, now.getMonth(), now.getDate() ),

    // Lists
        conList  = patient.conditions(),
        immList  = patient.immunizations(),
        medList  = patient.medications(),
        resList  = patient.results(),
        vitList  = patient.vitalSigns(),

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        conCodes ={ "ICD9"      :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        immCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "SNOMED-CT" :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        medCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "HC-DIN"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        resCodes ={ "pCLOCD"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // http://search.loinc.org/search.zul?query=thing+stuff (<= search terms)
        vitCodes ={ "LOINC"     :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

    // Filters
    //   - start/end and min/max may be used in either paired order
    //   - values may be ommitted (from right ) as necessary
    conditions    = filter_general( conList, conCodes, minStart, maxEnd, startMin, endMax ),
    immunizations = filter_general( immList, immCodes, minStart, maxEnd, startMin, endMax ),
    medications   = filter_general( medList, medCodes, minStart, maxEnd, startMin, endMax ),
    results       = filter_general( resList, resCodes, minStart, maxEnd, startMin, endMax ),
    vitalSigns    = filter_general( vitList, vitCodes, minStart, maxEnd, startMin, endMax );

    // Inclusion/exclusion
    //   - isAge() and isMatch() are boolean (yes/no)
    //   - use && (AND) and || (OR) with brackets (...)
    return isAge( ageMin, ageMax )  && / ||
           isMatch( conditions )    && / ||
           isMatch( immunizations ) && / ||
           isMatch( medications )   && / ||
           isMatch( results )       && / ||
           isMatch( vitalSigns );
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


/*******************************************************************************
* Debugging Functions                                                          *
*   These are badly commented, non-optimized and intended for development.     *
*******************************************************************************/


/**
* Substitute for filter_general() to troubleshoot values
*/
function emit_filter_general( list, codes, min, max ){
  var filtered = list.match( codes );

  if( typeof min === 'number' )
    filtered = filter_values( filtered, min,( max || 1000000000 ));

  emit_values( filtered, min, max );

  return filtered;
}


/**
* Used by emit_filter_general() to emit age, ID and values
*/
function emit_values( list, min, max ){
  for( var i = 0, L = list.length; i < L; i++ ){

    if( list[ i ].values()[0] ){
      var scalar = list[ i ].values()[0].scalar();

      scalar = scalarToString( scalar );
      var units  = " " + list[ i ].values()[0].units(),
          age    = " -- " + scalarToString( patient.age ( new Date() )),
          first  = " -- " + patient.json.first.substr( 1, 5 );
      emit( scalar + units + age + first, 1 );
    }
  }
}


/**
* Round a scalar (or int) and convert to string, otherwise string emit crashes
*/
function scalarToString( scalar ){
  return Math.floor( scalar.toString() );
}
