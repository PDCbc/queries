/**
 * Query Title:EOL-001
 * Query Type:  Count
 * Description: Number of patients per provider who are end of life
 */
function map( patient ){

    try{

        if (filterProviders(patient.json.primary_care_provider_id, "PracticeReflection")){

            emit("denominator_"+patient.json.primary_care_provider_id, +activePatient(patient));
            emit( "numerator_"+patient.json.primary_care_provider_id, +(activePatient(patient) && isEol(patient)) );
        }

    }catch(e){
        emit("FAILURE_"+e, 1);
    }


}
