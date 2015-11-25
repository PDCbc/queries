/**
 * Function: hasOpioid
 *
 * @param pt {Patient} - hQuery patient API patient object
 */
function hasOpioid(pt) {

    if (!pt) {

        return false;

    }

    var x = hasActiveMed(pt, "^N02A.*$");

    return x;

}