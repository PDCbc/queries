/**
 * Query Title: PDC-959_DP-Depression
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var ia = isAge( patient, 20, 100 );

    var hc = hasDepression( patient );

    var ap = activePatient( patient );

    var numerator = ap && ia && hc;

    var denominator = ap && ia;



    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
