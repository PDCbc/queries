/**
 * title : PDC-1155
 * description : Percentage of patients over the age of 25 with tetanus vaccination administered in the last 10 years.
 */

function map(patient){

    if (!filterProviders(patient.json.primary_care_provider_id, "PopulationHealth")) {
        return;
    }

    var denominator = activePatient( patient ) && isAge(patient, 25);

    var numerator = denominator && hasTenanusVax(patient);

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );

}