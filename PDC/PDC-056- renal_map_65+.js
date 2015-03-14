/**
* Query Title: PDC-056
* Query Type:  Ratio
* Description: 65+ w/ impaired renal: digoxin > 125/day?
*/
function map( patient ){
  /**
  * Denominator:
  *   - 65+ years old
  *   - impaired renal function
  *   --> eGFR < 50 ml/min OR creatine > 150 μmol/l
  */
  var d_ageMin         = 0,
      d_valMax_GFR     = 49.9,
      d_valMin_Cre     = 150.1;

  // List of lab test results, codes for eGFR and creatine
  var d_resList        = patient.results(),
      d_resCodes_GFR   ={ "pCLOCD" :[ "33914-3" ]},
      d_resCodes_Cre   ={ "pCLOCD" :[ "45066-8", "14682-9", "2160-0", "33914-3",
                                      "50044-7", "48642-3", "48643-1" ]};

  function checkDenominator(){
    var d_final_GFR = filter_general( d_resList, d_resCodes_GFR, 0, d_valMax_GFR ),
        d_final_Cre = filter_general( d_resList, d_resCodes_Cre, d_valMin_Cre );

    return isAge( d_ageMin )&&( isMatch( d_final_GFR )|| isMatch( d_final_Cre ));
  }


  /**
  * Numerator:
  *   - in denominator
  *   - digoxin (medication) > 125 mcg/day (using 0.125 mg/day)
  *   - medication is active
  */
  // List of medications, codes for digoxin
  var n_medMin   = 0.1251;

  var n_medList  = patient.medications(),
      n_medCodes ={ "whoATC":[ "C01AA*" ],
                    "HC-DIN":[ "02281236", "02281228", "02281201", "02245428",
                               "02245427", "02245426", "02048264", "02048272",
                               "0021415",  "00698296", "00647470" ]};

  function checkNumerator(){
    var n_final = filter_general( n_medList, n_medCodes, n_medMin );
    n_final = filter_activeMeds( n_final );

    return isMatch( n_final );
  }


  /**
  * Emit Numerator and Denominator
  */
  var denominator = checkDenominator(),
      numerator   = denominator && checkNumerator(),
      pid = "_" + patient.json.primary_care_provider_id;

  emit( "denominator" + pid, denominator );
  emit( "numerator"   + pid, numerator   );
}
