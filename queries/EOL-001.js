/**
 * Query Title:EOL-001
 * Query Type:  Count
 * Description: Percentage of active patients, 55 years or older, per provider who are end of life either documented as palliative or one or more advanced conditions.
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
