/**
 * Function: hasOpioid
 *
 * @param pt {Patient} - hQuery patient API patient object
 */
function hasOpioid(pt) {

    if (!pt) {

        return false;

    }

    return hasActiveMed(pt, "^N02A.*$", Number.POSITIVE_INFINITY);

}