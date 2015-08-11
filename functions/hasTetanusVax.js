/**
 * hasTenanusVax
 *
 * Determines if the patient has had a tenanus vaccination. Returns true if they have, false otherwise.
 */
function hasTenanusVax ( pt ){

    var system = "whoATC";
    var condition = "^J07AM.*$";

    return hasImmunization(pt, system, condition);

}