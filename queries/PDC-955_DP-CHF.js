/**
 * Query Title: PDC-955_DP-CHF
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var ia = isAge( patient, 20, 120 );
    var ap = activePatient( patient );
    var hc = hasCHF(patient);

    var denominator = ia && ap;

    var numerator   =  ia && ap && hc;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
