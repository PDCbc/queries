/**
 * @param pt {Patient} - the hquery patient object that contains the hQuery patient API.
 *
 * @return {Boolean} true if the patient has a influzena vaccine documented in the last year.
 */
function hasRecentInfluenzaVaccine(pt) {

    var system    = "whoATC";
    var condition = "^J07BB.*";

    var lowerBound = new Date();

    //set the date to be a year ago.
    lowerBound.setFullYear(lowerBound.getFullYear() - 1);

    return hasImmunization(pt, system, condition, lowerBound.getTime(), (new Date()).getTime());

}