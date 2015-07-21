/*
* Determines whether a particular condition is part of those defined by the SPICT document as an indicator of Eol
* 
* A patient is assumed to be Eol( or a physician would not be surprised if they passed in the next 6 months to a year)
* if they have one or more of the SPICT clinical indicators listed below as ICD 9 codes.
*
* The exact SPICT indicators and the ICD9 codes/explanations can be found in the EoL Patient Definition doc
*
* @param pt - the patient api object
 *
 * @returns true if the patient has any of the conditions, false otherwise.
*/

function hasFrailtyCondition( pt ){
    //check if the pt api is correctly set up.
    if( pt === undefined || pt === null || pt.json === undefined || pt.json === null ){

        return false;

    }

    var conditions = pt.json.conditions;

    //check that we actually have conditions.
    if( conditions === undefined || conditions === null || conditions.length === 0 ){

        return false;

    }

    for( var c = 0; c < conditions.length; c ++ ){

        //check to see that we have an ICD9 code system for the condition.
        if( conditions[c] &&
            conditions[c].codes &&
            conditions[c].codes["ICD9"] &&
            conditions[c].codes["ICD9"].length > 0
        ){

            //loop through the codes for this condition and check if any of them match the SPICT ones
            for( var s = 0; s < conditions[c].codes["ICD9"].length; s++ ){

                if(
                    //**GENERAL COMPLAINTS**
                    //A01 Pain general/multiple sites
                    conditions[c].codes["ICD9"][s].match("^780.96")||
                    //A04 Weakness/tiredness general
                    conditions[c].codes["ICD9"][s].match("^780.7+")||conditions[c].codes["ICD9"][s].match("^799.3")||
                    //A28 Limited function/disability (NOS) (also covers R28 [V46.11 & V46.12])
                    conditions[c].codes["ICD9"][s].match("^V46\..*")||
                    //A28, B28, B82, D28, F28, H28, K28, L28, N28, P28, R28, S28, T28, U28, X28, Z28
                    conditions[c].codes["ICD9"][s].match("^V62.89")||
                    //B80 Iron deficiency anaemia
                    conditions[c].codes["ICD9"][s].match("^280.0")|| conditions[c].codes["ICD9"][s].match("^280.9")||
                    //B81 Anaemia, Vitamin B12/folate def.
                    conditions[c].codes["ICD9"][s].match("^281.0")|| conditions[c].codes["ICD9"][s].match("^281.2")||
                    //B82 Anaemia other/unspecified
                    conditions[c].codes["ICD9"][s].match("^238.75")||conditions[c].codes["ICD9"][s].match("^281.8")||
                    conditions[c].codes["ICD9"][s].match("^281.9")|| conditions[c].codes["ICD9"][s].match("^282.2")||
                    conditions[c].codes["ICD9"][s].match("^282.3")|| conditions[c].codes["ICD9"][s].match("^283.0")||
                    conditions[c].codes["ICD9"][s].match("^283.11")||conditions[c].codes["ICD9"][s].match("^283.9")||
                    conditions[c].codes["ICD9"][s].match("^284.81")||conditions[c].codes["ICD9"][s].match("^284.9")||
                    conditions[c].codes["ICD9"][s].match("^285.1")|| conditions[c].codes["ICD9"][s].match("^285.0")||
                    conditions[c].codes["ICD9"][s].match("^285.8")|| conditions[c].codes["ICD9"][s].match("^285.9")||
                    //D28 Limited function/disability (digestive) (also covers U28 [V45.11])
                    conditions[c].codes["ICD9"][s].match("^V44.1")|| conditions[c].codes["ICD9"][s].match("^V44.2")||
                    conditions[c].codes["ICD9"][s].match("^V44.3")|| conditions[c].codes["ICD9"][s].match("^V45")||
                    //F28 Limited function/disability (eye)
                    conditions[c].codes["ICD9"][s].match("^369.6+")||conditions[c].codes["ICD9"][s].match("^369.7+")||
                    conditions[c].codes["ICD9"][s].match("^369.8+")||
                    //Z28 Limited function/disability (social)
                    conditions[c].codes["ICD9"][s].match("^V62.4")||

                    //**NEOPLASM - OTHER**
                    //A79 Malignancy NOS
                    conditions[c].codes["ICD9"][s].match("^164.9")|| conditions[c].codes["ICD9"][s].match("^176.9")||
                    conditions[c].codes["ICD9"][s].match("^197.0")|| conditions[c].codes["ICD9"][s].match("^197.7")||
                    conditions[c].codes["ICD9"][s].match("^198.3")|| conditions[c].codes["ICD9"][s].match("^198.4")||
                    conditions[c].codes["ICD9"][s].match("^198.5")|| conditions[c].codes["ICD9"][s].match("^198.81")||
                    conditions[c].codes["ICD9"][s].match("^198.82")||conditions[c].codes["ICD9"][s].match("^198.89")||
                    conditions[c].codes["ICD9"][s].match("^199\..*")||
                    //B72 Hodgkin’s disease
                    conditions[c].codes["ICD9"][s].match("^200.1+")|| conditions[c].codes["ICD9"][s].match("^200.2+")||
                    conditions[c].codes["ICD9"][s].match("^200.8+")|| conditions[c].codes["ICD9"][s].match("^201.9+")||
                    conditions[c].codes["ICD9"][s].match("^202.0+")|| conditions[c].codes["ICD9"][s].match("^202.1+")||
                    conditions[c].codes["ICD9"][s].match("^202.2+")|| conditions[c].codes["ICD9"][s].match("^202.7+")||
                    conditions[c].codes["ICD9"][s].match("^202.8+")||
                    //B73 Leukaemia
                    conditions[c].codes["ICD9"][s].match("^202.4+")|| conditions[c].codes["ICD9"][s].match("^204.0+")||
                    conditions[c].codes["ICD9"][s].match("^204.1+")|| conditions[c].codes["ICD9"][s].match("^204.9+")||
                    conditions[c].codes["ICD9"][s].match("^205.0+")|| conditions[c].codes["ICD9"][s].match("^205.9+")||
                    conditions[c].codes["ICD9"][s].match("^206.0+")|| conditions[c].codes["ICD9"][s].match("^206.1+")||
                    conditions[c].codes["ICD9"][s].match("^206.2+")|| conditions[c].codes["ICD9"][s].match("^206.9+")||
                    conditions[c].codes["ICD9"][s].match("^208\..*")||
                    //B74 Malignant neoplasm blood other
                    conditions[c].codes["ICD9"][s].match("^164.0")|| conditions[c].codes["ICD9"][s].match("^196.9")||
                    conditions[c].codes["ICD9"][s].match("^202.37")||conditions[c].codes["ICD9"][s].match("^202.5+")||
                    conditions[c].codes["ICD9"][s].match("^202.6+")||conditions[c].codes["ICD9"][s].match("^203.0+")||
                    conditions[c].codes["ICD9"][s].match("^203.1+")||conditions[c].codes["ICD9"][s].match("^203.80")||
                    //D74 Malignant neoplasm stomach
                    conditions[c].codes["ICD9"][s].match("^151.9")||
                    //D76 Malignant neoplasm pancreas
                    conditions[c].codes["ICD9"][s].match("^157.0")|| conditions[c].codes["ICD9"][s].match("^157.1")||
                    conditions[c].codes["ICD9"][s].match("^157.2")|| conditions[c].codes["ICD9"][s].match("^157.4")||
                    conditions[c].codes["ICD9"][s].match("^157.9")||
                    //D77 Malignant neoplasm digest other/NOS
                    conditions[c].codes["ICD9"][s].match("^140.9")|| conditions[c].codes["ICD9"][s].match("^141.0")||
                    conditions[c].codes["ICD9"][s].match("^141.9")|| conditions[c].codes["ICD9"][s].match("^143.8")||
                    conditions[c].codes["ICD9"][s].match("^143.9")|| conditions[c].codes["ICD9"][s].match("^144.9")||
                    conditions[c].codes["ICD9"][s].match("^145.5")|| conditions[c].codes["ICD9"][s].match("^145.9")||
                    conditions[c].codes["ICD9"][s].match("^142.0")|| conditions[c].codes["ICD9"][s].match("^142.8")||
                    conditions[c].codes["ICD9"][s].match("^150.9")|| conditions[c].codes["ICD9"][s].match("^152.0")||
                    conditions[c].codes["ICD9"][s].match("^152.9")|| conditions[c].codes["ICD9"][s].match("^155\..*")||
                    conditions[c].codes["ICD9"][s].match("^156.0")|| conditions[c].codes["ICD9"][s].match("^156.1")||
                    conditions[c].codes["ICD9"][s].match("^156.2")|| conditions[c].codes["ICD9"][s].match("^156.9")||
                    conditions[c].codes["ICD9"][s].match("^159.8")|| conditions[c].codes["ICD9"][s].match("^159.9")||
                    conditions[c].codes["ICD9"][s].match("^158\..*")||
                    //F74 Neoplasm of eye/adnexa
                    conditions[c].codes["ICD9"][s].match("^190.3")|| conditions[c].codes["ICD9"][s].match("^190.5")||
                    conditions[c].codes["ICD9"][s].match("^190.9")|| conditions[c].codes["ICD9"][s].match("^224.1")||
                    conditions[c].codes["ICD9"][s].match("^224.3")|| conditions[c].codes["ICD9"][s].match("^224.8")||
                    conditions[c].codes["ICD9"][s].match("^224.9")|| conditions[c].codes["ICD9"][s].match("^238.8")||
                    //H75 Neoplasm of ear
                    conditions[c].codes["ICD9"][s].match("^160.1")||
                    //K72 Neoplasm cardiovascular
                    conditions[c].codes["ICD9"][s].match("^164.1")|| conditions[c].codes["ICD9"][s].match("^171.9")||
                    conditions[c].codes["ICD9"][s].match("^212.7")|| conditions[c].codes["ICD9"][s].match("^215.4")||
                    conditions[c].codes["ICD9"][s].match("^238.8")||
                    //L71 Malignant neoplasm musculoskeletal (171.9 addresses a code in N74 as well)
                    conditions[c].codes["ICD9"][s].match("^170.9")|| conditions[c].codes["ICD9"][s].match("^171.9")||
                    //N74 Malignant neoplasm nervous system
                    conditions[c].codes["ICD9"][s].match("^191.1")|| conditions[c].codes["ICD9"][s].match("^191.2")||
                    conditions[c].codes["ICD9"][s].match("^191.3")|| conditions[c].codes["ICD9"][s].match("^191.4")||
                    conditions[c].codes["ICD9"][s].match("^191.5")|| conditions[c].codes["ICD9"][s].match("^191.6")||
                    conditions[c].codes["ICD9"][s].match("^191.7")|| conditions[c].codes["ICD9"][s].match("^191.9")||
                    conditions[c].codes["ICD9"][s].match("^192.1")|| conditions[c].codes["ICD9"][s].match("^192.8")||
                    conditions[c].codes["ICD9"][s].match("^192.9")||
                    //R84 Malignant neoplasm bronchus/lung
                    conditions[c].codes["ICD9"][s].match("^162.0")|| conditions[c].codes["ICD9"][s].match("^162.9")||
                    //S77 Malignant neoplasm of skin
                    conditions[c].codes["ICD9"][s].match("^172.9")|| conditions[c].codes["ICD9"][s].match("^173.99")||
                    //T71 Malignant neoplasm thyroid
                    conditions[c].codes["ICD9"][s].match("^193")||
                    //U75 Malignant neoplasm of kidney
                    conditions[c].codes["ICD9"][s].match("^189.0")|| conditions[c].codes["ICD9"][s].match("^189.1")||
                    //U76 Malignant neoplasm of bladder
                    conditions[c].codes["ICD9"][s].match("^188.9")||
                    //U77 Malignant neoplasm urinary other
                    conditions[c].codes["ICD9"][s].match("^189.2")|| conditions[c].codes["ICD9"][s].match("^189.3")||
                    conditions[c].codes["ICD9"][s].match("^189.9")||
                    //X75 Malignant neoplasm cervix
                    conditions[c].codes["ICD9"][s].match("^180.9")||
                    //X76 Malignant neoplasm breast female
                    conditions[c].codes["ICD9"][s].match("^174.9")|| conditions[c].codes["ICD9"][s].match("^175.9")||
                    //X77 Malignant neoplasm genital other
                    conditions[c].codes["ICD9"][s].match("^184.0")|| conditions[c].codes["ICD9"][s].match("^184.4")||
                    conditions[c].codes["ICD9"][s].match("^184.9")|| conditions[c].codes["ICD9"][s].match("^182.0")||
                    conditions[c].codes["ICD9"][s].match("^179")|| conditions[c].codes["ICD9"][s].match("^183.0")||
                    //Y78 Malignant neoplasm male genital / mammae
                    conditions[c].codes["ICD9"][s].match("^175.9")||
                    conditions[c].codes["ICD9"][s].match("^187.4")||
                    conditions[c].codes["ICD9"][s].match("^187.9")||
                    conditions[c].codes["ICD9"][s].match("^186.9")||

                      // **start with incontinence
                    conditions[c].codes["ICD9"][s].match("^158.8")||
                    conditions[c].codes["ICD9"][s].match("^158.9")||
                    conditions[c].codes["ICD9"][s].match("^198.5")

                ){

                    return true;

                }
            }
        }
    }

    return false;
}
