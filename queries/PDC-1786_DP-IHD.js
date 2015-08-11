/**
 * Query Title: PDC-1786_DP-IHD
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var hc = hasIHD( patient );
    var ap = activePatient( patient );

    var denominator = ap;

    var numerator   =  ap && hc;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
