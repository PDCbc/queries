/**
 * T/F: is this patient an end of life patient as per EoL blueprint?
 *  - 55 and over
 *  - Is palliative: V66.7
 *  - Or has a clinical indicator of one or more advanced conditions (conditions are derived from SPICT)
 * @param pt
 * @returns {boolean}
 */

function isEol(pt) {
    console.log(pt);
    var system = "ICD9";
    var condition = "^V66.7"; //Encounter for palliative care

    if (isAge(pt, 55) && (activePatient(pt))) {

        if((hasCondition(pt, system, condition)))
            return true;
    }

    return false;

}