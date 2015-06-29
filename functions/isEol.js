/**
 * T/F: is this patient an end of life patient as per EoL blueprint?
 *  - 55 and over
 *  - Any of the following bill codes used: G14063, G14069, 00127
 *  - ICD 9: V66.7 (will add more as I go to address clinical indicators & frailty)
 * @param pt
 * @returns {boolean}
 */

function isEol(pt) {
    var system = "ICD9";
    var condition = "^V66.7";

    if (isAge(pt, 55) && (isActive(pt))) {
        if(hasCondition(pt, system, condition))
            return true;
    }

    return false;

}