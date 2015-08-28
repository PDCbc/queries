/**
 * hasLowerBackPain
 */
function hasLowerBackPain ( pt ){

    if(!pt){
        return false;
    }

    var system = "ICD9";
    var condition = "^724.*";
    return hasCondition(pt, system, condition);

    return true;

}