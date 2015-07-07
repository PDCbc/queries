/**
 * Patient API test for medication values: 
 *  - volume
 *  - units
 *  - frequency
 */
function testMedicationValues( pt ){


    if( !pt ){

        return false; 

    }

    var ms = pt.medications()

    return{

        d : ms[0].dose(),
        timing : ms[0].administrationTiming(),
        values : ms[0].values() 

    }
}
