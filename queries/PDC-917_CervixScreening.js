/**
 * Query Title: PDC-1149_CervixScreening
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

    var ia = isAge( patient, 18, 70 );

    var minDate = new Date();
    minDate.setFullYear( minDate.getFullYear()-2 );

    var hm = hasCervicalScreen( patient, minDate );

    var denominator = ap && ia;

    var numerator = ap && hm && ia;//still need to add hystorectomy patients

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
