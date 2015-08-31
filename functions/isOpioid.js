/**
 * isOpioid
 *
 * @param med {Object} hQuery medication object.
 */
function isOpioid(med) {

    if (!med || !med.codes) {
        return false;
    }

    for (var k in med.codes) {

        if (k === 'whoATC') {

            for (var c = 0; c < med.codes[k].length; c++) {

                if (med.codes[k][c].match("^N02A.*$")) {

                    return true;

                }

            }

        }

    }

    return false;

}