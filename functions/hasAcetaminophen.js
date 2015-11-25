/**
 * hasAcetaminophen
 *
 * @param pt {Patient} hQuery patient object.
 *
 * @return {Boolean} true if the patient has a prescription for acetaminophen, false otherwise.
 */
function hasAcetaminophen(pt) {

    var atc = '^N02BE01.*';



    return hasActiveMed(pt, atc);

}