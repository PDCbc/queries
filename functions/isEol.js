/**
 * T/F: is this patient an end of life patient as per EoL blueprint?
 *  - 55 and over
 *  - Is palliative: V66.7
 *  - Or has a clinical indicator of one or more advanced conditions (conditions are derived from SPICT)
 * @param pt
 * @returns {boolean}
 */

function isEol(pt) {
    console.log(pt); //***remove me before merge***
    var system = "ICD9";
    var condition = "^V66.7"; //Encounter for palliative care

    if (isAge(pt, 55) && (activePatient(pt))) {

        // Does the patient have a code for palliative care or any of the SPICT clinical indicators
        if((hasCondition(pt, system, condition)) || hasEoLCondition(pt))
            return true;
    }

    return false;

}