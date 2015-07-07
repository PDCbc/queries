/**
 * Test how encounter time stamps behave in the patient API.
*/

function testEncounterTimes( pt ){


    if( !pt ){

        return false; 

    }

    var es = pt.encounters()

    if( es.length === 0 ){

        return true;
    }

    return false; 
}
