/**
 * Query Title: PDC-962_DP-Hypertension
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var ap = activePatient( patient );

    var ia = isAge( patient, 20, 120 );

    var hc = hasHypertension(patient);

    var denominator = ia && ap;

    var numerator   =  ap && ia && hc;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
