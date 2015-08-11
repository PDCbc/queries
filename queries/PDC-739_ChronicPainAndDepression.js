/**
 * Query Title: DC-739_ChronicPainAndDepression
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var hc = hasChronicPain( patient ) && hasDepression( patient );
    var ap = activePatient( patient );

    var denominator = ap;

    var numerator   =  ap && hc;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
