/**
 * Query Title: PDC-058
 * Query Type:  Ratio
 * Desctiption: Statin: Secondary prevention, age >= 65.
 */
function map( patient ){

    try{
        if ( filterProviders(patient.json.primary_care_provider_id, "PPhRR") ){
            var denominator = isAge( patient, 65 ) && activePatient( patient ) && hasActiveStatin( patient ); 

            var numerator   = denominator && hasCardiacEvent( patient ); 

            emit( "denominator_"+patient.json.primary_care_provider_id, +denominator );
            emit( "numerator_"+patient.json.primary_care_provider_id, +numerator );
        }
    }catch(e){

        emit("FAILURE_"+e); 

    }

  
}
