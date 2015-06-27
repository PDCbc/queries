/**
 * getAgeRange()
 *
 * Determines which age range the patient is in.
 *
 * Takes a patient object, returns a string that represents the age
 * range they fall within
 *
 * Ranges are on of: '0-9','10-19','20-29', ... '80-89', '90+' as defined
 * in the PDC data dictionary.
 *
 * @param pt {Object} The hQuery patient object.
 *
 * @param ranges {Object} contains the age ranges to work with.
 *      defaults to ranges defined in the PDC dictionary if not provided or null.
 *      Has structure like: { RANGE_STRING : {lower : Number, upper: Number }, ... }
 *
 * @return {String} - The age range string the patient falls within. e.g. '10-19',
 *      returns null if no age range could be found or there was an error.
 */

function getAgeRange(pt, ranges) {


    ageRanges = ranges || {

            '0-9'  : {lower: 0, upper: 9},
            '10-19': {lower: 10, upper: 19},
            '20-29': {lower: 20, upper: 29},
            '30-39': {lower: 30, upper: 39},
            '40-49': {lower: 40, upper: 49},
            '50-59': {lower: 50, upper: 59},
            '60-69': {lower: 60, upper: 69},
            '70-79': {lower: 70, upper: 79},
            '80-89': {lower: 80, upper: 89},
            '90+'  : {lower: 90, upper: null}

        };


    //JS hack to remove things in prototype chain.
    JSON.parse(JSON.stringify(ageRanges));

    for(var k in ageRanges){

        if( isAge(pt, ageRanges[k].lower, ageRanges[k].upper)){

            return k;

        }

    }

    return null;

}