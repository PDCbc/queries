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
                    conditions[c].codes["ICD9"][s].match("^179")||   conditions[c].codes["ICD9"][s].match("^183.0")||
                    //Y78 Malignant neoplasm male genital / mammae
                    conditions[c].codes["ICD9"][s].match("^175.9")||
                    conditions[c].codes["ICD9"][s].match("^187.4")||
                    conditions[c].codes["ICD9"][s].match("^187.9")||
                    conditions[c].codes["ICD9"][s].match("^186.9")||

                    //**INCONTINENCE**
                    //D17 Incontinence of bowel
                    conditions[c].codes["ICD9"][s].match("^787.6")||
                    //U04 Incontinence urine
                    conditions[c].codes["ICD9"][s].match("^625.6")||  conditions[c].codes["ICD9"][s].match("^788.3+")||
                    //X87 Uterovaginal prolapse
                    conditions[c].codes["ICD9"][s].match("^618.00")|| conditions[c].codes["ICD9"][s].match("^618.01")||
                    conditions[c].codes["ICD9"][s].match("^618.02")|| conditions[c].codes["ICD9"][s].match("^618.03")||
                    conditions[c].codes["ICD9"][s].match("^618.04")|| conditions[c].codes["ICD9"][s].match("^618.2")||
                    conditions[c].codes["ICD9"][s].match("^618.3")||  conditions[c].codes["ICD9"][s].match("^618.4")||
                    conditions[c].codes["ICD9"][s].match("^618.84")|| conditions[c].codes["ICD9"][s].match("^618.9")||

                    //**GI/LIVER DISEASE**
                    //D72 Viral hepatitis
                    conditions[c].codes["ICD9"][s].match("^070.1")||  conditions[c].codes["ICD9"][s].match("^070.3+")||
                    conditions[c].codes["ICD9"][s].match("^070.41")|| conditions[c].codes["ICD9"][s].match("^070.49")||
                    conditions[c].codes["ICD9"][s].match("^070.51")|| conditions[c].codes["ICD9"][s].match("^070.53")||
                    conditions[c].codes["ICD9"][s].match("^070.54")|| conditions[c].codes["ICD9"][s].match("^070.59")||
                    conditions[c].codes["ICD9"][s].match("^070.9")||
                    //D97 Cirrhosis / liver disease
                    conditions[c].codes["ICD9"][s].match("^139.8")|| conditions[c].codes["ICD9"][s].match("^571.0")||
                    conditions[c].codes["ICD9"][s].match("^571.1")|| conditions[c].codes["ICD9"][s].match("^571.2")||
                    conditions[c].codes["ICD9"][s].match("^571.3")|| conditions[c].codes["ICD9"][s].match("^571.40")||
                    conditions[c].codes["ICD9"][s].match("^571.41")||conditions[c].codes["ICD9"][s].match("^571.49")||
                    conditions[c].codes["ICD9"][s].match("^571.5")|| conditions[c].codes["ICD9"][s].match("^571.6")||
                    conditions[c].codes["ICD9"][s].match("^571.8")|| conditions[c].codes["ICD9"][s].match("^571.9")||
                    conditions[c].codes["ICD9"][s].match("^572.0")|| conditions[c].codes["ICD9"][s].match("^572.2")||
                    conditions[c].codes["ICD9"][s].match("^572.8")|| conditions[c].codes["ICD9"][s].match("^573.3")||
                    conditions[c].codes["ICD9"][s].match("^573.4")|| conditions[c].codes["ICD9"][s].match("^573.9")||
                    conditions[c].codes["ICD9"][s].match("^572.4")||
                    //D75 Malignant neoplasm colon/rectum
                    conditions[c].codes["ICD9"][s].match("^153.1")|| conditions[c].codes["ICD9"][s].match("^153.3")||
                    conditions[c].codes["ICD9"][s].match("^153.4")|| conditions[c].codes["ICD9"][s].match("^153.7")||
                    conditions[c].codes["ICD9"][s].match("^153.9")|| conditions[c].codes["ICD9"][s].match("^154.0")||
                    conditions[c].codes["ICD9"][s].match("^154.1")|| conditions[c].codes["ICD9"][s].match("^154.3")||
                    //D85 Duodenal ulcer
                    conditions[c].codes["ICD9"][s].match("^532.10")|| conditions[c].codes["ICD9"][s].match("^532.90")||
                    //D86 Peptic ulcer other
                    conditions[c].codes["ICD9"][s].match("^251.8")|| conditions[c].codes["ICD9"][s].match("^531.10")||
                    conditions[c].codes["ICD9"][s].match("^531.90")||conditions[c].codes["ICD9"][s].match("^533.90")||
                    conditions[c].codes["ICD9"][s].match("^534.90")||
                    //D94 Chronic enteritis/ulcerative colitis
                    conditions[c].codes["ICD9"][s].match("^555.0")|| conditions[c].codes["ICD9"][s].match("^555.9")||
                    conditions[c].codes["ICD9"][s].match("^556.5")|| conditions[c].codes["ICD9"][s].match("^556.6")||
                    conditions[c].codes["ICD9"][s].match("^556.9")|| conditions[c].codes["ICD9"][s].match("^558.1")||

                    //**OESOPHAGUS DISEASE**
                    //D84 Oesophagus disease
                    conditions[c].codes["ICD9"][s].match("^530.0")|| conditions[c].codes["ICD9"][s].match("^530.11")||
                    conditions[c].codes["ICD9"][s].match("^530.20")||conditions[c].codes["ICD9"][s].match("^530.21")||
                    conditions[c].codes["ICD9"][s].match("^530.3")|| conditions[c].codes["ICD9"][s].match("^530.5")||
                    conditions[c].codes["ICD9"][s].match("^530.6")|| conditions[c].codes["ICD9"][s].match("^530.7")||
                    conditions[c].codes["ICD9"][s].match("^530.9")||

                    //**VISUAL IMPAIRMENT**
                    //F83 Retinopathy
                    conditions[c].codes["ICD9"][s].match("^362.0")|| conditions[c].codes["ICD9"][s].match("^362.1")||
                    conditions[c].codes["ICD9"][s].match("^362.20")||conditions[c].codes["ICD9"][s].match("^362.29")||
                    conditions[c].codes["ICD9"][s].match("^362.6")|| conditions[c].codes["ICD9"][s].match("^362.89")||
                    //F94 Blindness
                    conditions[c].codes["ICD9"][s].match("^369.00")||conditions[c].codes["ICD9"][s].match("^369.20")||
                    conditions[c].codes["ICD9"][s].match("^369.3")||
                    //F84 Macular degeneration
                    conditions[c].codes["ICD9"][s].match("^362.5")||
                    //F93 Glaucoma
                    conditions[c].codes["ICD9"][s].match("^365.0")|| conditions[c].codes["ICD9"][s].match("^365.1+")||
                    conditions[c].codes["ICD9"][s].match("^365.2+")||conditions[c].codes["ICD9"][s].match("^365.59")||
                    conditions[c].codes["ICD9"][s].match("^365.60")||conditions[c].codes["ICD9"][s].match("^365.61")||
                    conditions[c].codes["ICD9"][s].match("^365.62")||conditions[c].codes["ICD9"][s].match("^365.64")||
                    conditions[c].codes["ICD9"][s].match("^365.65")||

                    //**CATARACT**
                    //F92 Cataract
                    conditions[c].codes["ICD9"][s].match("^366.00")||conditions[c].codes["ICD9"][s].match("^366.10")||
                    conditions[c].codes["ICD9"][s].match("^366.16")||conditions[c].codes["ICD9"][s].match("^366.18")||
                    conditions[c].codes["ICD9"][s].match("^366.20")||conditions[c].codes["ICD9"][s].match("^366.3")||
                    conditions[c].codes["ICD9"][s].match("^366.41")||conditions[c].codes["ICD9"][s].match("^366.45")||
                    conditions[c].codes["ICD9"][s].match("^366.46")||conditions[c].codes["ICD9"][s].match("^366.5")||
                    conditions[c].codes["ICD9"][s].match("^366.8")|| conditions[c].codes["ICD9"][s].match("^366.9")||

                    //**HEARING IMPAIRMENT**
                    //H84 Presbyacusis
                    conditions[c].codes["ICD9"][s].match("^388.01")||
                    //H85 Acoustic trauma
                    conditions[c].codes["ICD9"][s].match("^388.10")||
                    conditions[c].codes["ICD9"][s].match("^388.12")||
                    //H86 Deafness
                    conditions[c].codes["ICD9"][s].match("^388.2")|| conditions[c].codes["ICD9"][s].match("^389.00")||
                    conditions[c].codes["ICD9"][s].match("^389.10")|| conditions[c].codes["ICD9"][s].match("^389.14")||
                    conditions[c].codes["ICD9"][s].match("^389.16")|| conditions[c].codes["ICD9"][s].match("^389.20")||
                    conditions[c].codes["ICD9"][s].match("^389.7")|| conditions[c].codes["ICD9"][s].match("^389.8")||
                    conditions[c].codes["ICD9"][s].match("^389.9")||

                    //**RESPIRATORY PROBLEMS**
                    //K02 Pressure/tightness of heart
                    conditions[c].codes["ICD9"][s].match("^786.51")||
                    //R02 Shortness of breath/dyspnoea w/o K02
                    conditions[c].codes["ICD9"][s].match("^786.09")|| conditions[c].codes["ICD9"][s].match("^786.02")||
                    conditions[c].codes["ICD9"][s].match("^786.05")||
                    //R81 Pneumonia
                    conditions[c].codes["ICD9"][s].match("^482.84")||
                    conditions[c].codes["ICD9"][s].match("^488.11")|| conditions[c].codes["ICD9"][s].match("^487.0")||
                    conditions[c].codes["ICD9"][s].match("^480.1")|| conditions[c].codes["ICD9"][s].match("^480.2")||
                    conditions[c].codes["ICD9"][s].match("^480.9")|| conditions[c].codes["ICD9"][s].match("^481")||
                    conditions[c].codes["ICD9"][s].match("^482.2")|| conditions[c].codes["ICD9"][s].match("^482.0")||
                    conditions[c].codes["ICD9"][s].match("^482.1")|| conditions[c].codes["ICD9"][s].match("^482.4")||
                    conditions[c].codes["ICD9"][s].match("^482.32")|| conditions[c].codes["ICD9"][s].match("^482.82")||
                    conditions[c].codes["ICD9"][s].match("^482.83")|| conditions[c].codes["ICD9"][s].match("^483.0")||
                    conditions[c].codes["ICD9"][s].match("^482.9")|| conditions[c].codes["ICD9"][s].match("^483.1")||
                    conditions[c].codes["ICD9"][s].match("^483.8")|| conditions[c].codes["ICD9"][s].match("^485")||
                    conditions[c].codes["ICD9"][s].match("^486")||

                    //**ANGINA PECTORIS**
                    //K74 Angina Pectoris
                    conditions[c].codes["ICD9"][s].match("^411.1")|| conditions[c].codes["ICD9"][s].match("^413.1")||
                    conditions[c].codes["ICD9"][s].match("^413.9")|| conditions[c].codes["ICD9"][s].match("^411.81")||
                    conditions[c].codes["ICD9"][s].match("^411.89")||

                    //**MYOCARDIAL DISEASE**
                    //K75 Acute myocardial infarction
                    conditions[c].codes["ICD9"][s].match("^410.01")|| conditions[c].codes["ICD9"][s].match("^410.11")||
                    conditions[c].codes["ICD9"][s].match("^410.21")|| conditions[c].codes["ICD9"][s].match("^410.31")||
                    conditions[c].codes["ICD9"][s].match("^410.41")|| conditions[c].codes["ICD9"][s].match("^410.51")||
                    conditions[c].codes["ICD9"][s].match("^410.61")|| conditions[c].codes["ICD9"][s].match("^410.81")||
                    conditions[c].codes["ICD9"][s].match("^410.91")|| conditions[c].codes["ICD9"][s].match("^410.71")||
                    conditions[c].codes["ICD9"][s].match("^429.79")|| conditions[c].codes["ICD9"][s].match("^429.5")||
                    conditions[c].codes["ICD9"][s].match("^429.6")|| conditions[c].codes["ICD9"][s].match("^411.0")||
                    //K76 Other/chronic ischaemic heart disease
                    conditions[c].codes["ICD9"][s].match("^414.01")|| conditions[c].codes["ICD9"][s].match("^429.2")||
                    conditions[c].codes["ICD9"][s].match("^412")|| conditions[c].codes["ICD9"][s].match("^414.10")||
                    conditions[c].codes["ICD9"][s].match("^414.19")|| conditions[c].codes["ICD9"][s].match("^414.11")||
                    conditions[c].codes["ICD9"][s].match("^414.12")|| conditions[c].codes["ICD9"][s].match("^414.8")||
                    conditions[c].codes["ICD9"][s].match("^414.9")||

                    //**HEART FAILURE**
                    //K77 Heart failure
                    conditions[c].codes["ICD9"][s].match("^428.1")|| conditions[c].codes["ICD9"][s].match("^428.0")||
                    conditions[c].codes["ICD9"][s].match("^428.9")||

                    //**ATRIAL FIBRILLATION/FLUTTER**
                    //K78 Atrial fibrillation/flutter
                    conditions[c].codes["ICD9"][s].match("^427.3+")||

                    //**HYPERTENSION-UNCOMPLICATED**
                    //K86 Hypertension - uncomplicated
                    conditions[c].codes["ICD9"][s].match("^401*")||

                    //**HYPERTENSION-UNCOMPLICATED**
                    //K87 Hypertension - complicated
                    conditions[c].codes["ICD9"][s].match("^402*")|| conditions[c].codes["ICD9"][s].match("^403*")||
                    conditions[c].codes["ICD9"][s].match("^405*")|| conditions[c].codes["ICD9"][s].match("^437.2")||

                    //**DIZZINESS**
                    //A06 Fainting/syncope
                    conditions[c].codes["ICD9"][s].match("^780.2")||
                    //H82 Vertiginous syndrome / labyrinthitis
                    conditions[c].codes["ICD9"][s].match("^078.81")|| conditions[c].codes["ICD9"][s].match("^386.0")||
                    conditions[c].codes["ICD9"][s].match("^386.11")|| conditions[c].codes["ICD9"][s].match("^386.12")||
                    conditions[c].codes["ICD9"][s].match("^386.19")|| conditions[c].codes["ICD9"][s].match("^386.9")||
                    conditions[c].codes["ICD9"][s].match("^386.3")||
                    //K88 Postural hypotension
                    conditions[c].codes["ICD9"][s].match("^458.1")|| conditions[c].codes["ICD9"][s].match("^458.0")||
                    conditions[c].codes["ICD9"][s].match("^458.9")||
                    //N17 Vertigo/dizziness
                    conditions[c].codes["ICD9"][s].match("^780.4")||

                    //**TIA/CVA
                    //K89 Transient cerebral ischaemia
                    conditions[c].codes["ICD9"][s].match("^435.0")|| conditions[c].codes["ICD9"][s].match("^435.1")||
                    conditions[c].codes["ICD9"][s].match("^435.3")|| conditions[c].codes["ICD9"][s].match("^362.34")||
                    conditions[c].codes["ICD9"][s].match("^437.7")|| conditions[c].codes["ICD9"][s].match("^435.2")||
                    conditions[c].codes["ICD9"][s].match("^435.8")|| conditions[c].codes["ICD9"][s].match("^435.9")||
                    //K90 Stroke/cerebrovascular accident
                    conditions[c].codes["ICD9"][s].match("^430")|| conditions[c].codes["ICD9"][s].match("^431")||
                    conditions[c].codes["ICD9"][s].match("^432*")|| conditions[c].codes["ICD9"][s].match("^433.91")||
                    conditions[c].codes["ICD9"][s].match("^433.01")|| conditions[c].codes["ICD9"][s].match("^433.31")||
                    conditions[c].codes["ICD9"][s].match("^433.81")|| conditions[c].codes["ICD9"][s].match("^434.91")||
                    conditions[c].codes["ICD9"][s].match("^434.01")||

                    //**VASCULAR DISEASE**
                    //K91 Atherosclerosis
                    conditions[c].codes["ICD9"][s].match("^433.20")|| conditions[c].codes["ICD9"][s].match("^433.00")||
                    conditions[c].codes["ICD9"][s].match("^433.10")|| conditions[c].codes["ICD9"][s].match("^433.90")||
                    conditions[c].codes["ICD9"][s].match("^434.00")|| conditions[c].codes["ICD9"][s].match("^434.10")||
                    conditions[c].codes["ICD9"][s].match("^434.90")|| conditions[c].codes["ICD9"][s].match("^443.29")||
                    conditions[c].codes["ICD9"][s].match("^437.3")|| conditions[c].codes["ICD9"][s].match("^437.0")||
                    conditions[c].codes["ICD9"][s].match("^437.9")||
                    //K92 Other PVD
                    conditions[c].codes["ICD9"][s].match("^440.0")|| conditions[c].codes["ICD9"][s].match("^440.1")||
                    conditions[c].codes["ICD9"][s].match("^440.9")|| conditions[c].codes["ICD9"][s].match("^440.4")||
                    conditions[c].codes["ICD9"][s].match("^443.0")|| conditions[c].codes["ICD9"][s].match("^443.1")||
                    conditions[c].codes["ICD9"][s].match("^443.89")|| conditions[c].codes["ICD9"][s].match("^443.9")||
                    conditions[c].codes["ICD9"][s].match("^444.01")|| conditions[c].codes["ICD9"][s].match("^444.09")||
                    conditions[c].codes["ICD9"][s].match("^444.1")|| conditions[c].codes["ICD9"][s].match("^444.22")||
                    //K93 Pulmonary embolism
                    conditions[c].codes["ICD9"][s].match("^415.12")|| conditions[c].codes["ICD9"][s].match("^415.13")||
                    conditions[c].codes["ICD9"][s].match("^415.19")||
                    //K94 Phlebitis/thrombophlebitis
                    conditions[c].codes["ICD9"][s].match("^451.0")|| conditions[c].codes["ICD9"][s].match("^451.19")||
                    conditions[c].codes["ICD9"][s].match("^451.9")|| conditions[c].codes["ICD9"][s].match("^452")||
                    conditions[c].codes["ICD9"][s].match("^453.0")|| conditions[c].codes["ICD9"][s].match("^453.1")||
                    conditions[c].codes["ICD9"][s].match("^459.1")||
                    //K99 Cardiovascular disease other
                    conditions[c].codes["ICD9"][s].match("^530.9")|| conditions[c].codes["ICD9"][s].match("^446.0")||
                    conditions[c].codes["ICD9"][s].match("^446.4")|| conditions[c].codes["ICD9"][s].match("^446.1")||
                    conditions[c].codes["ICD9"][s].match("^446.2")|| conditions[c].codes["ICD9"][s].match("^446.6")||
                    conditions[c].codes["ICD9"][s].match("^446.7")|| conditions[c].codes["ICD9"][s].match("^446.5")||
                    conditions[c].codes["ICD9"][s].match("^447.5")|| conditions[c].codes["ICD9"][s].match("^441.0")||
                    conditions[c].codes["ICD9"][s].match("^441.2")|| conditions[c].codes["ICD9"][s].match("^441.4")||
                    conditions[c].codes["ICD9"][s].match("^441.5")|| conditions[c].codes["ICD9"][s].match("^441.9")||
                    conditions[c].codes["ICD9"][s].match("^442.82")|| conditions[c].codes["ICD9"][s].match("^442.83")||
                    conditions[c].codes["ICD9"][s].match("^442.89")|| conditions[c].codes["ICD9"][s].match("^447.0")||
                    conditions[c].codes["ICD9"][s].match("^447.2")|| conditions[c].codes["ICD9"][s].match("^447.3")||
                    conditions[c].codes["ICD9"][s].match("^447.8")|| conditions[c].codes["ICD9"][s].match("^447.6")||
                    conditions[c].codes["ICD9"][s].match("^447.9")|| conditions[c].codes["ICD9"][s].match("^448.9")||
                    conditions[c].codes["ICD9"][s].match("^456.0")|| conditions[c].codes["ICD9"][s].match("^456.1")||
                    conditions[c].codes["ICD9"][s].match("^456.4")|| conditions[c].codes["ICD9"][s].match("^456.6")||
                    conditions[c].codes["ICD9"][s].match("^459.2")|| conditions[c].codes["ICD9"][s].match("^459.9")||
                    conditions[c].codes["ICD9"][s].match("^459.89")|| conditions[c].codes["ICD9"][s].match("^785.51")||
                    conditions[c].codes["ICD9"][s].match("^785.50")||

                    //**FRACTURE/OSTEOPOROSIS**
                    //A80 Trauma/injury NOS
                    conditions[c].codes["ICD9"][s].match("^874.2")|| conditions[c].codes["ICD9"][s].match("^874.3")||
                    conditions[c].codes["ICD9"][s].match("^900.9")|| conditions[c].codes["ICD9"][s].match("^879.0")||
                    conditions[c].codes["ICD9"][s].match("^879.1")|| conditions[c].codes["ICD9"][s].match("^901.9")||
                    conditions[c].codes["ICD9"][s].match("^861.0*")|| conditions[c].codes["ICD9"][s].match("^862.8")||
                    conditions[c].codes["ICD9"][s].match("^902.9")|| conditions[c].codes["ICD9"][s].match("^867.8")||
                    conditions[c].codes["ICD9"][s].match("^926.11")|| conditions[c].codes["ICD9"][s].match("^903.9")||
                    conditions[c].codes["ICD9"][s].match("^904.8")|| conditions[c].codes["ICD9"][s].match("^959.1*")||
                    conditions[c].codes["ICD9"][s].match("^904.9")|| conditions[c].codes["ICD9"][s].match("^929.9")||
                    conditions[c].codes["ICD9"][s].match("^959.9")||
                    //L72 Fracture: radius/ulna
                    conditions[c].codes["ICD9"][s].match("^813*")||
                    //L73 Fracture: tibia/fibula
                    conditions[c].codes["ICD9"][s].match("^823*")|| conditions[c].codes["ICD9"][s].match("^824*")||
                    //L74 Fracture: hand/foot bone
                    conditions[c].codes["ICD9"][s].match("^814.11")|| conditions[c].codes["ICD9"][s].match("^814.00")||
                    conditions[c].codes["ICD9"][s].match("^816*")|| conditions[c].codes["ICD9"][s].match("^818.1")||
                    conditions[c].codes["ICD9"][s].match("^825.0")|| conditions[c].codes["ICD9"][s].match("^825.1")||
                    conditions[c].codes["ICD9"][s].match("^825.21")|| conditions[c].codes["ICD9"][s].match("^825.29")||
                    conditions[c].codes["ICD9"][s].match("^825.39")|| conditions[c].codes["ICD9"][s].match("^825.25")||
                    conditions[c].codes["ICD9"][s].match("^825.35")|| conditions[c].codes["ICD9"][s].match("^826.0")||
                    conditions[c].codes["ICD9"][s].match("^826.1")|| conditions[c].codes["ICD9"][s].match("^825.20")||
                    conditions[c].codes["ICD9"][s].match("^825.30")||
                    //L75 Fracture: femur
                    conditions[c].codes["ICD9"][s].match("^820*")|| conditions[c].codes["ICD9"][s].match("^821*")||
                    //L76 Fracture: other
                    conditions[c].codes["ICD9"][s].match("^802.0")|| conditions[c].codes["ICD9"][s].match("^802.1")||
                    conditions[c].codes["ICD9"][s].match("^802.4")|| conditions[c].codes["ICD9"][s].match("^802.5")||
                    conditions[c].codes["ICD9"][s].match("^802.2")|| conditions[c].codes["ICD9"][s].match("^802.3")||
                    conditions[c].codes["ICD9"][s].match("^804*")|| conditions[c].codes["ICD9"][s].match("^803*")||
                    conditions[c].codes["ICD9"][s].match("^805.0+")|| conditions[c].codes["ICD9"][s].match("^805.1+")||
                    conditions[c].codes["ICD9"][s].match("^807.5")|| conditions[c].codes["ICD9"][s].match("^805.00")||
                    conditions[c].codes["ICD9"][s].match("^807.2")|| conditions[c].codes["ICD9"][s].match("^807.3")||
                    conditions[c].codes["ICD9"][s].match("^807.0+")|| conditions[c].codes["ICD9"][s].match("^807.1+")||
                    conditions[c].codes["ICD9"][s].match("^807.4")|| conditions[c].codes["ICD9"][s].match("^805.6")||
                    conditions[c].codes["ICD9"][s].match("^805.7")|| conditions[c].codes["ICD9"][s].match("^808*")||
                    conditions[c].codes["ICD9"][s].match("^810*")|| conditions[c].codes["ICD9"][s].match("^811*")||
                    conditions[c].codes["ICD9"][s].match("^812.0+")|| conditions[c].codes["ICD9"][s].match("^812.1+")||
                    conditions[c].codes["ICD9"][s].match("^812.4+")|| conditions[c].codes["ICD9"][s].match("^812.5+")||
                    conditions[c].codes["ICD9"][s].match("^822*")||
                    //L95 Osteoporosis
                    conditions[c].codes["ICD9"][s].match("^733.0")|| conditions[c].codes["ICD9"][s].match("^733.03")||
                    conditions[c].codes["ICD9"][s].match("^579.3")|| conditions[c].codes["ICD9"][s].match("^733.09")||
                    conditions[c].codes["ICD9"][s].match("^733.00")||

                    //**ARTHRITIS/OSTEOARTHROSIS**
                    //L88 Rheumatoid arthritis / related condition
                    conditions[c].codes["ICD9"][s].match("^714.1")|| conditions[c].codes["ICD9"][s].match("^714.2")||
                    conditions[c].codes["ICD9"][s].match("^714.0")|| conditions[c].codes["ICD9"][s].match("^714.30")||
                    conditions[c].codes["ICD9"][s].match("^720.0")||
                    //L89 Osteoarthrosis of hip
                    conditions[c].codes["ICD9"][s].match("^715.25")|| conditions[c].codes["ICD9"][s].match("^715.35")||
                    conditions[c].codes["ICD9"][s].match("^715.95")||
                    //L91 Osteoarthrosis other / related condition
                    conditions[c].codes["ICD9"][s].match("^716.50")|| conditions[c].codes["ICD9"][s].match("^716.6+")||
                    conditions[c].codes["ICD9"][s].match("^716.2+")|| conditions[c].codes["ICD9"][s].match("^715.04")||
                    conditions[c].codes["ICD9"][s].match("^715.00")|| conditions[c].codes["ICD9"][s].match("^715.90")||
                    conditions[c].codes["ICD9"][s].match("^715.34")|| conditions[c].codes["ICD9"][s].match("^715.94")||
                    conditions[c].codes["ICD9"][s].match("^715.11")|| conditions[c].codes["ICD9"][s].match("^715.30")||
                    conditions[c].codes["ICD9"][s].match("^715.90")|| conditions[c].codes["ICD9"][s].match("^715.10")||
                    conditions[c].codes["ICD9"][s].match("^715.20")|| conditions[c].codes["ICD9"][s].match("^715.28")||

                    //**OSTEOARTHROSIS KNEE**
                    //L90 Osteoarthrosis of knee
                    conditions[c].codes["ICD9"][s].match("^715.26")|| conditions[c].codes["ICD9"][s].match("^715.36")||
                    conditions[c].codes["ICD9"][s].match("^715.96")||

                    //**NEUROLOGIC DISEASE**
                    //N86 Multiple sclerosis
                    conditions[c].codes["ICD9"][s].match("^340")||
                    //N99 Neurological disease, other
                    conditions[c].codes["ICD9"][s].match("^333.4")|| conditions[c].codes["ICD9"][s].match("^334.0")||
                    conditions[c].codes["ICD9"][s].match("^334.3")|| conditions[c].codes["ICD9"][s].match("^334.8")||
                    conditions[c].codes["ICD9"][s].match("^334.9")|| conditions[c].codes["ICD9"][s].match("^335.2+")||
                    conditions[c].codes["ICD9"][s].match("^335.9")|| conditions[c].codes["ICD9"][s].match("^335.10")||
                    conditions[c].codes["ICD9"][s].match("^333.0")|| conditions[c].codes["ICD9"][s].match("^333.85")||
                    conditions[c].codes["ICD9"][s].match("^333.72")|| conditions[c].codes["ICD9"][s].match("^333.79")||
                    conditions[c].codes["ICD9"][s].match("^333.83")|| conditions[c].codes["ICD9"][s].match("^333.81")||
                    conditions[c].codes["ICD9"][s].match("^333.89")|| conditions[c].codes["ICD9"][s].match("^331.11")||
                    conditions[c].codes["ICD9"][s].match("^331.19")|| conditions[c].codes["ICD9"][s].match("^330.8")||
                    conditions[c].codes["ICD9"][s].match("^331.82")|| conditions[c].codes["ICD9"][s].match("^331.83")||
                    conditions[c].codes["ICD9"][s].match("^331.6")|| conditions[c].codes["ICD9"][s].match("^331.89")||
                    conditions[c].codes["ICD9"][s].match("^331.9")|| conditions[c].codes["ICD9"][s].match("^330.9")||
                    conditions[c].codes["ICD9"][s].match("^341.9")|| conditions[c].codes["ICD9"][s].match("^336.2")||
                    conditions[c].codes["ICD9"][s].match("^352.9")|| conditions[c].codes["ICD9"][s].match("^358.0+")||
                    conditions[c].codes["ICD9"][s].match("^359.1")|| conditions[c].codes["ICD9"][s].match("^359.2+")||
                    conditions[c].codes["ICD9"][s].match("^359.0")|| conditions[c].codes["ICD9"][s].match("^359.9")||
                    conditions[c].codes["ICD9"][s].match("^359.4")|| conditions[c].codes["ICD9"][s].match("^359.3")||
                    conditions[c].codes["ICD9"][s].match("^333.71")|| conditions[c].codes["ICD9"][s].match("^342.0+")||
                    conditions[c].codes["ICD9"][s].match("^342.1+")|| conditions[c].codes["ICD9"][s].match("^342.8+")||
                    conditions[c].codes["ICD9"][s].match("^342.9+")|| conditions[c].codes["ICD9"][s].match("^344.1")||
                    conditions[c].codes["ICD9"][s].match("^344.0+")|| conditions[c].codes["ICD9"][s].match("^344.6+")||
                    conditions[c].codes["ICD9"][s].match("^344.89")|| conditions[c].codes["ICD9"][s].match("^337.9")||
                    conditions[c].codes["ICD9"][s].match("^742.8")|| conditions[c].codes["ICD9"][s].match("^331.3")||
                    conditions[c].codes["ICD9"][s].match("^331.5")|| conditions[c].codes["ICD9"][s].match("^331.4")||
                    conditions[c].codes["ICD9"][s].match("^323.7+")|| conditions[c].codes["ICD9"][s].match("^349.82")||
                    conditions[c].codes["ICD9"][s].match("^348.0")|| conditions[c].codes["ICD9"][s].match("^348.1")||
                    conditions[c].codes["ICD9"][s].match("^348.2")|| conditions[c].codes["ICD9"][s].match("^348.3+")||
                    conditions[c].codes["ICD9"][s].match("^348.5")|| conditions[c].codes["ICD9"][s].match("^331.81")||
                    conditions[c].codes["ICD9"][s].match("^348.8+")|| conditions[c].codes["ICD9"][s].match("^336.0")||
                    conditions[c].codes["ICD9"][s].match("^336.1")|| conditions[c].codes["ICD9"][s].match("^336.9")||
                    conditions[c].codes["ICD9"][s].match("^349.89")|| conditions[c].codes["ICD9"][s].match("^349.9")||
                    conditions[c].codes["ICD9"][s].match("^727.7")|| conditions[c].codes["ICD9"][s].match("^792.2")||
                    conditions[c].codes["ICD9"][s].match("^V45.2")||
                    //N89 Migraine
                    conditions[c].codes["ICD9"][s].match("^346.1+")|| conditions[c].codes["ICD9"][s].match("^346.0+")||
                    conditions[c].codes["ICD9"][s].match("^346.4+")|| conditions[c].codes["ICD9"][s].match("^346.2+")||
                    conditions[c].codes["ICD9"][s].match("^346.8+")|| conditions[c].codes["ICD9"][s].match("^346.9+")||
                    conditions[c].codes["ICD9"][s].match("^784.0")||
                    //N87 Parkinsonism, Parkinson’s disease
                    conditions[c].codes["ICD9"][s].match("^332.0")|| conditions[c].codes["ICD9"][s].match("^333.92")||
                    conditions[c].codes["ICD9"][s].match("^332.1")||
                    //N88 Epilepsy
                    conditions[c].codes["ICD9"][s].match("^345.5+")|| conditions[c].codes["ICD9"][s].match("^345.7+")||
                    conditions[c].codes["ICD9"][s].match("^345.9+")|| conditions[c].codes["ICD9"][s].match("^345.4+")||
                    conditions[c].codes["ICD9"][s].match("^345.1+")|| conditions[c].codes["ICD9"][s].match("^345.3+")||
                    conditions[c].codes["ICD9"][s].match("^345.80")|| conditions[c].codes["ICD9"][s].match("^345.2")||
                    conditions[c].codes["ICD9"][s].match("^345.91")||
                    //N94 Peripheral neuritis/neuropathy
                    conditions[c].codes["ICD9"][s].match("^353.0")|| conditions[c].codes["ICD9"][s].match("^353.6")||
                    conditions[c].codes["ICD9"][s].match("^353.9")|| conditions[c].codes["ICD9"][s].match("^354.2")||
                    conditions[c].codes["ICD9"][s].match("^354.3")|| conditions[c].codes["ICD9"][s].match("^354.4")||
                    conditions[c].codes["ICD9"][s].match("^355.1")|| conditions[c].codes["ICD9"][s].match("^355.3")||
                    conditions[c].codes["ICD9"][s].match("^355.5")|| conditions[c].codes["ICD9"][s].match("^355.6")||
                    conditions[c].codes["ICD9"][s].match("^355.79")|| conditions[c].codes["ICD9"][s].match("^354.8")||
                    conditions[c].codes["ICD9"][s].match("^354.5")|| conditions[c].codes["ICD9"][s].match("^355.9")||
                    conditions[c].codes["ICD9"][s].match("^356.0")|| conditions[c].codes["ICD9"][s].match("^356.1")||
                    conditions[c].codes["ICD9"][s].match("^356.2")|| conditions[c].codes["ICD9"][s].match("^356.9")||
                    conditions[c].codes["ICD9"][s].match("^357.0")|| conditions[c].codes["ICD9"][s].match("^357.9")||
                    conditions[c].codes["ICD9"][s].match("^357.5")||

                    //**DEPRESSION**
                    //P03 Feeling depressed
                    conditions[c].codes["ICD9"][s].match("^300.9")||
                    conditions[c].codes["ICD9"][s].match("^799.25")||
                    //P76 Depressive disorder
                    conditions[c].codes["ICD9"][s].match("^296.21")|| conditions[c].codes["ICD9"][s].match("^296.22")||
                    conditions[c].codes["ICD9"][s].match("^296.23")|| conditions[c].codes["ICD9"][s].match("^296.24")||
                    conditions[c].codes["ICD9"][s].match("^298.0")|| conditions[c].codes["ICD9"][s].match("^296.20")||
                    conditions[c].codes["ICD9"][s].match("^311")|| conditions[c].codes["ICD9"][s].match("^296.3*")||
                    conditions[c].codes["ICD9"][s].match("^300.4")|| conditions[c].codes["ICD9"][s].match("^301.12")||
                    conditions[c].codes["ICD9"][s].match("^296.99")|| conditions[c].codes["ICD9"][s].match("^296.90")||

                    //**SLEEP DISTURBANCE**
                    //P06 Sleep disturbance
                    conditions[c].codes["ICD9"][s].match("^327.00")|| conditions[c].codes["ICD9"][s].match("^327.01")||
                    conditions[c].codes["ICD9"][s].match("^327.09")|| conditions[c].codes["ICD9"][s].match("^780.52")||
                    conditions[c].codes["ICD9"][s].match("^327.10")|| conditions[c].codes["ICD9"][s].match("^327.11")||
                    conditions[c].codes["ICD9"][s].match("^327.12")|| conditions[c].codes["ICD9"][s].match("^327.13")||
                    conditions[c].codes["ICD9"][s].match("^327.14")|| conditions[c].codes["ICD9"][s].match("^327.19")||
                    conditions[c].codes["ICD9"][s].match("^780.54")|| conditions[c].codes["ICD9"][s].match("^327.3+")||
                    conditions[c].codes["ICD9"][s].match("^327.2+")|| conditions[c].codes["ICD9"][s].match("^780.53")||
                    conditions[c].codes["ICD9"][s].match("^780.57")|| conditions[c].codes["ICD9"][s].match("^347.1+")||
                    conditions[c].codes["ICD9"][s].match("^327.8")|| conditions[c].codes["ICD9"][s].match("^780.50")||
                    conditions[c].codes["ICD9"][s].match("^327.02")|| conditions[c].codes["ICD9"][s].match("^307.41")||
                    conditions[c].codes["ICD9"][s].match("^307.42")|| conditions[c].codes["ICD9"][s].match("^307.44")||
                    conditions[c].codes["ICD9"][s].match("^327.15")|| conditions[c].codes["ICD9"][s].match("^327.19")||
                    conditions[c].codes["ICD9"][s].match("^307.46")|| conditions[c].codes["ICD9"][s].match("^307.47")||
                    conditions[c].codes["ICD9"][s].match("^307.49")||

                    //**COGNITIVE IMPAIRMENT**
                    //P20 Memory / concentration / orientation disturbance
                    conditions[c].codes["ICD9"][s].match("^780.97")|| conditions[c].codes["ICD9"][s].match("^780.93")||
                    conditions[c].codes["ICD9"][s].match("^797")|| conditions[c].codes["ICD9"][s].match("^V62.89")||
                    conditions[c].codes["ICD9"][s].match("^799.51")|| conditions[c].codes["ICD9"][s].match("^799.52")||
                    conditions[c].codes["ICD9"][s].match("^799.53")|| conditions[c].codes["ICD9"][s].match("^799.54")||
                    conditions[c].codes["ICD9"][s].match("^799.59")||
                    //P85 Mental retardation
                    conditions[c].codes["ICD9"][s].match("^317")|| conditions[c].codes["ICD9"][s].match("^318+")||
                    conditions[c].codes["ICD9"][s].match("^319")||
                    //P70 Dementia / Alzheimer’s disease
                    conditions[c].codes["ICD9"][s].match("^290.4+")|| conditions[c].codes["ICD9"][s].match("^294.10")||
                    conditions[c].codes["ICD9"][s].match("^294.20")|| conditions[c].codes["ICD9"][s].match("^294.21")||
                    conditions[c].codes["ICD9"][s].match("^331.0")||

                    //**PSYCHIATRIC PROBLEMS/SUBSTANCE ABUSE**
                    //P71 Organic psychosis other
                    conditions[c].codes["ICD9"][s].match("^293.0")|| conditions[c].codes["ICD9"][s].match("^293.1")||
                    conditions[c].codes["ICD9"][s].match("^293.84")|| conditions[c].codes["ICD9"][s].match("^310.9")||
                    conditions[c].codes["ICD9"][s].match("^310.8")|| conditions[c].codes["ICD9"][s].match("^310.2")||
                    //P72 Schizophrenia
                    conditions[c].codes["ICD9"][s].match("^295.30")|| conditions[c].codes["ICD9"][s].match("^295.10")||
                    conditions[c].codes["ICD9"][s].match("^295.20")|| conditions[c].codes["ICD9"][s].match("^295.90")||
                    conditions[c].codes["ICD9"][s].match("^295.60")|| conditions[c].codes["ICD9"][s].match("^295.00")||
                    conditions[c].codes["ICD9"][s].match("^295.80")|| conditions[c].codes["ICD9"][s].match("^295.40")||
                    conditions[c].codes["ICD9"][s].match("^301.22")|| conditions[c].codes["ICD9"][s].match("^297.1")||
                    //P73 Affective psychosis
                    conditions[c].codes["ICD9"][s].match("^296.00")|| conditions[c].codes["ICD9"][s].match("^296.01")||
                    conditions[c].codes["ICD9"][s].match("^296.02")|| conditions[c].codes["ICD9"][s].match("^296.03")||
                    conditions[c].codes["ICD9"][s].match("^296.04")|| conditions[c].codes["ICD9"][s].match("^296.40")||
                    conditions[c].codes["ICD9"][s].match("^296.41")|| conditions[c].codes["ICD9"][s].match("^296.42")||
                    conditions[c].codes["ICD9"][s].match("^296.43")|| conditions[c].codes["ICD9"][s].match("^296.44")||
                    conditions[c].codes["ICD9"][s].match("^296.50")|| conditions[c].codes["ICD9"][s].match("^296.51")||
                    conditions[c].codes["ICD9"][s].match("^296.52")|| conditions[c].codes["ICD9"][s].match("^296.54")||
                    conditions[c].codes["ICD9"][s].match("^296.60")|| conditions[c].codes["ICD9"][s].match("^296.61")||
                    conditions[c].codes["ICD9"][s].match("^296.62")|| conditions[c].codes["ICD9"][s].match("^296.63")||
                    conditions[c].codes["ICD9"][s].match("^296.4")|| conditions[c].codes["ICD9"][s].match("^296.7")||
                    conditions[c].codes["ICD9"][s].match("^296.80")|| conditions[c].codes["ICD9"][s].match("^301.10")||
                    conditions[c].codes["ICD9"][s].match("^301.13")||
                    //P74 Anxiety disorder/anxiety state
                    conditions[c].codes["ICD9"][s].match("^300.01")|| conditions[c].codes["ICD9"][s].match("^300.02")||
                    conditions[c].codes["ICD9"][s].match("^300.00")||
                    //P15 Chronic alcohol abuse
                    conditions[c].codes["ICD9"][s].match("^305.0+")|| conditions[c].codes["ICD9"][s].match("^291.0")||
                    conditions[c].codes["ICD9"][s].match("^291.3")|| conditions[c].codes["ICD9"][s].match("^291.5")||
                    conditions[c].codes["ICD9"][s].match("^291.82")|| conditions[c].codes["ICD9"][s].match("^291.89")||
                    conditions[c].codes["ICD9"][s].match("^291.9")|| conditions[c].codes["ICD9"][s].match("^303.9+")||
                    conditions[c].codes["ICD9"][s].match("^291.1")|| conditions[c].codes["ICD9"][s].match("^291.2")||
                    conditions[c].codes["ICD9"][s].match("^291.81")|| conditions[c].codes["ICD9"][s].match("^331.7")||
                    //P16 Acute alcohol abuse
                    conditions[c].codes["ICD9"][s].match("^303.0+")||
                    //P17 Tobacco abuse
                    conditions[c].codes["ICD9"][s].match("^305.1+")||
                    //P18 Medication abuse
                    //292.12,292.2,292.81,292.82,292.84,292.85,292.89,292.9 also in P19
                    conditions[c].codes["ICD9"][s].match("^305.4+")|| conditions[c].codes["ICD9"][s].match("^304.1+")||
                    conditions[c].codes["ICD9"][s].match("^292.2")|| conditions[c].codes["ICD9"][s].match("^292.12")||
                    conditions[c].codes["ICD9"][s].match("^292.81")|| conditions[c].codes["ICD9"][s].match("^292.82")||
                    conditions[c].codes["ICD9"][s].match("^292.84")|| conditions[c].codes["ICD9"][s].match("^292.85")||
                    conditions[c].codes["ICD9"][s].match("^292.89")|| conditions[c].codes["ICD9"][s].match("^292.9")||
                    //P19 Drug abuse
                    conditions[c].codes["ICD9"][s].match("^305.5+")|| conditions[c].codes["ICD9"][s].match("^304.0+")||
                    conditions[c].codes["ICD9"][s].match("^292.0")|| conditions[c].codes["ICD9"][s].match("^292.11")||
                    conditions[c].codes["ICD9"][s].match("^305.2+")|| conditions[c].codes["ICD9"][s].match("^304.3+")||
                    conditions[c].codes["ICD9"][s].match("^305.6+")|| conditions[c].codes["ICD9"][s].match("^305.7+")||
                    conditions[c].codes["ICD9"][s].match("^304.4+")|| conditions[c].codes["ICD9"][s].match("^305.3+")||
                    conditions[c].codes["ICD9"][s].match("^304.5+")|| conditions[c].codes["ICD9"][s].match("^305.9+")||
                    conditions[c].codes["ICD9"][s].match("^305.8+")|| conditions[c].codes["ICD9"][s].match("^304.6+")||

                    //**COPD**
                    //R95 Chronic obstructive pulmonary disease
                    conditions[c].codes["ICD9"][s].match("^492.0")|| conditions[c].codes["ICD9"][s].match("^492.8")||
                    conditions[c].codes["ICD9"][s].match("^491.20")|| conditions[c].codes["ICD9"][s].match("^493.20")||
                    conditions[c].codes["ICD9"][s].match("^496")||

                    //**ASTHMA**
                    //R96 Asthma
                    conditions[c].codes["ICD9"][s].match("^493*")||

                    //**SKIN PROBLEMS**
                    //S70 Herpes zoster
                    conditions[c].codes["ICD9"][s].match("^053.1+")|| conditions[c].codes["ICD9"][s].match("^053.2+")||
                    conditions[c].codes["ICD9"][s].match("^053.8")|| conditions[c].codes["ICD9"][s].match("^053.9")||
                    //S91 Psoriasis
                    conditions[c].codes["ICD9"][s].match("^696.1")|| conditions[c].codes["ICD9"][s].match("^696.3")||
                    //S97 Chronic ulcer skin
                    conditions[c].codes["ICD9"][s].match("^454.0")|| conditions[c].codes["ICD9"][s].match("^707.0+")||
                    conditions[c].codes["ICD9"][s].match("^707.10")|| conditions[c].codes["ICD9"][s].match("^707.19")||
                    conditions[c].codes["ICD9"][s].match("^707.8")|| conditions[c].codes["ICD9"][s].match("^707.9")||

                    //**WEIGHT PROBLEMS**
                    //T05 Feeding problem of adult
                    conditions[c].codes["ICD9"][s].match("^783.3")||
                    //T07 Weight gain
                    conditions[c].codes["ICD9"][s].match("^783.1")||
                    //T08 Weight loss
                    conditions[c].codes["ICD9"][s].match("^783.21")|| conditions[c].codes["ICD9"][s].match("^799.4")||
                    //T83 Overweight
                    conditions[c].codes["ICD9"][s].match("^278.00")||
                    //T82 Obesity
                    conditions[c].codes["ICD9"][s].match("^278.03")|| conditions[c].codes["ICD9"][s].match("^278.00")||

                    //**THYROID DISORDERS**
                    //T85 Hyperthyroidism/thyrotoxicosis
                    conditions[c].codes["ICD9"][s].match("^242.0+")|| conditions[c].codes["ICD9"][s].match("^242.1+")||
                    conditions[c].codes["ICD9"][s].match("^242.2+")|| conditions[c].codes["ICD9"][s].match("^242.3+")||
                    conditions[c].codes["ICD9"][s].match("^242.81")|| conditions[c].codes["ICD9"][s].match("^242.41")||
                    conditions[c].codes["ICD9"][s].match("^242.9+")||
                    //T86 Hypothyroidism/myxoedema
                    conditions[c].codes["ICD9"][s].match("^240.9")|| conditions[c].codes["ICD9"][s].match("^244.8")||
                    conditions[c].codes["ICD9"][s].match("^244.2")|| conditions[c].codes["ICD9"][s].match("^244.3")||
                    conditions[c].codes["ICD9"][s].match("^780.01")|| conditions[c].codes["ICD9"][s].match("^244.9")||

                    //**DIABETES MELLITUS**
                    //T90 Diabetes mellitus
                    conditions[c].codes["ICD9"][s].match("^250.00")|| conditions[c].codes["ICD9"][s].match("^250.02")||
                    conditions[c].codes["ICD9"][s].match("^250.80")|| conditions[c].codes["ICD9"][s].match("^250.30")||
                    conditions[c].codes["ICD9"][s].match("^250.12")||

                    //**URINARY DISEASE**
                    //U99 Urinary disease, other
                    conditions[c].codes["ICD9"][s].match("^591")|| conditions[c].codes["ICD9"][s].match("^593.5")||
                    conditions[c].codes["ICD9"][s].match("^593.7+")|| conditions[c].codes["ICD9"][s].match("^599.60")||
                    conditions[c].codes["ICD9"][s].match("^599.69")|| conditions[c].codes["ICD9"][s].match("^584.5")||
                    conditions[c].codes["ICD9"][s].match("^583.6")|| conditions[c].codes["ICD9"][s].match("^584.6")||
                    conditions[c].codes["ICD9"][s].match("^583.7")|| conditions[c].codes["ICD9"][s].match("^584.7")||
                    conditions[c].codes["ICD9"][s].match("^584.9")|| conditions[c].codes["ICD9"][s].match("^585.6")||
                    conditions[c].codes["ICD9"][s].match("^585.9")|| conditions[c].codes["ICD9"][s].match("^586")||
                    conditions[c].codes["ICD9"][s].match("^588.0")|| conditions[c].codes["ICD9"][s].match("^588.1")||
                    conditions[c].codes["ICD9"][s].match("^588.8+")|| conditions[c].codes["ICD9"][s].match("^588.9")||
                    conditions[c].codes["ICD9"][s].match("^587")|| conditions[c].codes["ICD9"][s].match("^405.91")||
                    conditions[c].codes["ICD9"][s].match("^589.9")|| conditions[c].codes["ICD9"][s].match("^593.81")||
                    conditions[c].codes["ICD9"][s].match("^593.2")|| conditions[c].codes["ICD9"][s].match("^593.1")||
                    conditions[c].codes["ICD9"][s].match("^593.89")|| conditions[c].codes["ICD9"][s].match("^590.3")||
                    conditions[c].codes["ICD9"][s].match("^593.82")|| conditions[c].codes["ICD9"][s].match("^593.0")||
                    conditions[c].codes["ICD9"][s].match("^593.9")|| conditions[c].codes["ICD9"][s].match("^596.54")||
                    conditions[c].codes["ICD9"][s].match("^596.4")|| conditions[c].codes["ICD9"][s].match("^596.53")||
                    conditions[c].codes["ICD9"][s].match("^596.59")|| conditions[c].codes["ICD9"][s].match("^596.0")||
                    conditions[c].codes["ICD9"][s].match("^596.1")|| conditions[c].codes["ICD9"][s].match("^596.2")||
                    conditions[c].codes["ICD9"][s].match("^596.3")|| conditions[c].codes["ICD9"][s].match("^596.6")||
                    conditions[c].codes["ICD9"][s].match("^596.9")|| conditions[c].codes["ICD9"][s].match("^598.1")||
                    conditions[c].codes["ICD9"][s].match("^598.00")|| conditions[c].codes["ICD9"][s].match("^598.9")||
                    conditions[c].codes["ICD9"][s].match("^599.1")|| conditions[c].codes["ICD9"][s].match("^599.2")||
                    conditions[c].codes["ICD9"][s].match("^599.3")|| conditions[c].codes["ICD9"][s].match("^599.9")||
                    conditions[c].codes["ICD9"][s].match("^788.99")||

                    //**PROSTRATE PROBLEMS**
                    //Y77 Malignant neoplasm prostate
                    conditions[c].codes["ICD9"][s].match("^233.4")|| conditions[c].codes["ICD9"][s].match("^185")||
                    //Y85 Benign prostatic hypertrophy
                    conditions[c].codes["ICD9"][s].match("^600.0+")|| conditions[c].codes["ICD9"][s].match("^600.1+")||

                    //**SOCIAL PROBLEMS**
                    //Z01 Poverty/financial problem
                    conditions[c].codes["ICD9"][s].match("^V60.2")|| conditions[c].codes["ICD9"][s].match("^V60.89")||
                    conditions[c].codes["ICD9"][s].match("^V60.9")||
                    //Z03 Housing/neighbourhood problem
                    conditions[c].codes["ICD9"][s].match("^V60.0")|| conditions[c].codes["ICD9"][s].match("^V60.1")||
                    conditions[c].codes["ICD9"][s].match("^V60.89")|| conditions[c].codes["ICD9"][s].match("^V60.9")||
                    //Z04 Social cultural problem
                    conditions[c].codes["ICD9"][s].match("^V60.3")|| conditions[c].codes["ICD9"][s].match("^V62.4")||
                    conditions[c].codes["ICD9"][s].match("^V62.89")||
                    //Z29 Social problem NOS
                    //V61.8 also in Z12, Z15 & V61.49 in Z14
                    conditions[c].codes["ICD9"][s].match("^E928.1")|| conditions[c].codes["ICD9"][s].match("^V15.89")||
                    conditions[c].codes["ICD9"][s].match("^E926+")|| conditions[c].codes["ICD9"][s].match("^V61.9")||
                    conditions[c].codes["ICD9"][s].match("^V61.08")|| conditions[c].codes["ICD9"][s].match("^V61.49")||
                    conditions[c].codes["ICD9"][s].match("^V61.09")|| conditions[c].codes["ICD9"][s].match("^V61.8")||
                    conditions[c].codes["ICD9"][s].match("^V62.81")|| conditions[c].codes["ICD9"][s].match("^V62.89")||
                    conditions[c].codes["ICD9"][s].match("^V69.3")|| conditions[c].codes["ICD9"][s].match("^V69.8")||
                    conditions[c].codes["ICD9"][s].match("^V69.9")|| conditions[c].codes["ICD9"][s].match("^V65.2")||
                    //Z12 Relationship problem with partner
                    conditions[c].codes["ICD9"][s].match("^995.82")||
                    //Z14 Partner illness problem
                    //handled above
                    //Z15 Loss/death of partner problem
                    conditions[c].codes["ICD9"][s].match("^V61.07")|| conditions[c].codes["ICD9"][s].match("^V62.82")||
                    conditions[c].codes["ICD9"][s].match("^V61.03")

                ){

                    return true;

                }
            }
        }
    }

    return false;
}
