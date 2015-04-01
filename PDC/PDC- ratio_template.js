/**
* Query Title: PDC-###
* Query Type:  Ratio
* Description: Numerator-y words / denominator-y words
*/
function map( patient ){
  // Coded entry lists declared here can be used for denominator and numerator
  //   - pass filtered lists, less overhead than unfiltered (longer) lists
  //   - not usually necessary
  var mapScope_conList,
      mapScope_immList,
      mapScope_medList,
      mapScope_resList,
      mapScope_vitList,


  /**
   * Denominator
   *
   * Base criteria:
   *   - <ageMin> to <ageMax> years old
   *   - has { "convention": ["code", ..., ""]} condition, in last 1000000 years
   *   OR
   *   - values <medMin> < <medication> < <medMax>, in last 3 days
   *   - medication is active (filter_medActive())
   */
  function checkDenominator(){
    // Ages
    //   - age ranges are INCLUSIVE, edge cases are counted
    var ageMin   = ##,
        ageMax   = ##,

    // Values
    //   - value ranges are INCLUSIVE, edge cases are counted
        resMin   = ###,
        resMax   = ###,
        medMin   = ###,
        medMax   = ###,
        vitMin   = ###,
        vitMax   = ###,

    // Dates
    //   - end:   () for current date, otherwise ( YYYY, MM, DD )
    //   - start: subtract from end as Y, M, D
        end      = new Date(),
        medStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),
        resStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),
        vitStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),

    // Coded entry lists
    //   - Note: Conditions used a regex match.  Preface codes with '^'!
        conList  = patient.conditions(),
        immList  = patient.immunizations(),
        medList  = patient.medications(),
        resList  = patient.results(),
        vitList  = patient.vitalSigns(),

    // Medical codes
    //   - Immunizations, medications and results use an exact code match
    //   - Conditions use a regex match, so make sure to preface with '^'!
        // http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx
        conCodes ={ "ICD9"      :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // hhttp://www.whocc.no/atc_ddd_index/
        // http://www.snomedbrowser.com -- use 'Concept Type:' Procedure!
        immCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "SNOMED-CT" :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        medCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "HC-DIN"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        resCodes ={ "pCLOCD"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        vitCodes ={ "LOINC"     :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS
    // Filters
    //   - start/end and min/max may be used in either paired order
    //   - values may be ommitted (from right ) as necessary
    conditions    = filter_general( conList, conCodes, conStart, conEnd ),
    immunizations = filter_general( immList, immCodes, immStart, immEnd ),
    medications   = filter_general( medList, medCodes, medStart, medEnd, medMin, medMax ),
    results       = filter_general( resList, resCodes, resStart, resEnd, resMin, resMax ),
    vitalSigns    = filter_general( vitList, vitCodes, vitStart, vitEnd, vitMin, vitMax );

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
  *   - has { "convention": ["code", ..., ""]} condition, in last 1000000 years
  *   OR
  *   - values <medMin> < <medication> < <medMax>, in last 3 days
  *   - medication is active (filter_medActive())
  */
  function checkNumerator(){
    // Ages
    //   - age ranges are INCLUSIVE, edge cases are counted
    var ageMin   = ##,
        ageMax   = ##,

    // Values
    //   - value ranges are INCLUSIVE, edge cases are counted
        resMin   = ###,
        resMax   = ###,
        medMin   = ###,
        medMax   = ###,
        vitMin   = ###,
        vitMax   = ###,

    // Dates
    //   - end:   () for current date, otherwise ( YYYY, MM, DD )
    //   - start: subtract from end as Y, M, D
        end      = new Date(),
        medStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),
        resStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),
        vitStart = new Date( end.getFullYear() - ###, end.getMonth(), end.getDate() ),

    // Coded entry lists
    //   - Note: Conditions used a regex match.  Preface codes with '^'!
        conList  = patient.conditions(),
        immList  = patient.immunizations(),
        medList  = patient.medications(),
        resList  = patient.results(),
        vitList  = patient.vitalSigns(),

    // Medical codes
    //   - Immunizations, medications and results use an exact code match
    //   - Conditions use a regex match, so make sure to preface with '^'!
        // http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx
        conCodes ={ "ICD9"      :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // hhttp://www.whocc.no/atc_ddd_index/
        // http://www.snomedbrowser.com -- use 'Concept Type:' Procedure!
        immCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "SNOMED-CT" :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        medCodes ={ "whoATC"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ],   // TERMS
                    "HC-DIN"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        resCodes ={ "pCLOCD"    :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS

        // http://search.loinc.org
        vitCodes ={ "LOINC"     :[ "#####",     // TERMS
                                   "#####",     // TERMS
                                   "#####" ]},  // TERMS
    // Filters
    //   - start/end and min/max may be used in either paired order
    //   - values may be ommitted (from right ) as necessary
    conditions    = filter_general( conList, conCodes, conStart, conEnd ),
    immunizations = filter_general( immList, immCodes, immStart, immEnd ),
    medications   = filter_general( medList, medCodes, medStart, medEnd, medMin, medMax ),
    results       = filter_general( resList, resCodes, resStart, resEnd, resMin, resMax ),
    vitalSigns    = filter_general( vitList, vitCodes, vitStart, vitEnd, vitMin, vitMax );

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

  emit( "denominator" + physicianID, +denominator );
  emit( "numerator"   + physicianID, +numerator   );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a coded entry list:
*   - parameters 1 & 2: list, codes
*     - conditions(), immunizations(), medications(), results() or vitalSigns()
*     - LOINC, pCLOCD, whoATC, SNOMED-CT, whoATC
*   - parameters 3 - 6: dates or values, keep low/high pairs together
*     - minimum and maximum values
*     - start and end dates
*     --> inclusive ranges, boundary cases are counted
*     - null/undefined/unsubmitted values are ignored
*/
function filter_general( list, codes, p3, p4, p5, p6 ){
  // Default variables = undefined
  var min, max, start, end, filteredList;

  // Check parameters, which can be dates or number values (scalars)
  if(( p3 instanceof Date )&&( p4 instanceof Date )){
    start = p3;
    end   = p4;
    min   = p5;
    max   = p6;
  }
  else if(( p3 instanceof Date )&&(! p4 )){
    start = p3;
  }
  else if(( p3 instanceof Date )&&( typeof p4 === 'number' )){
    start = p3;
    min   = p4;
    max   = p5;
  }
  else if(( typeof p3 === 'number' )&&( typeof p4 === 'number' )){
    min   = p3;
    max   = p4;
    start = p5;
    end   = p6;
  }
  else if(( typeof p3 === 'number' )&&(! p4 )){
    min   = p3;
  }
  else if(( typeof p3 === 'number' )&&( p4 instanceof Date )){
    min   = p3;
    start = p4;
    end   = p5;
  }

  // Use API's match functions to filter based on codes and dates
  //   - Immunizations, medications and results use an exact code match
  //   - Conditions use a regex match, so make sure to preface with '^'!
  //   - undefined / null values are ignored
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


/**
* Used by filter_general() and filter_general()
*   - inclusive range, boundary cases are counted
*/
function filter_values( list, min, max ){
  // Default value
  max = max || 1000000000;

  var toReturn = new hQuery.CodedEntryList();
  for( var i = 0, L = list.length; i < L; i++ ){
    // Try-catch for missing value field in lab results
    try {
      var entry  = list[ i ],
          scalar = entry.values()[ 0 ].scalar();
      if( min <= scalar && scalar <= max )
        toReturn.push( entry );
    }
    catch( err ){
      emit( "Values key is missing! " + err, 1 );
    }
  }
  return toReturn;
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
*   - inclusive range, boundary cases are counted
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
