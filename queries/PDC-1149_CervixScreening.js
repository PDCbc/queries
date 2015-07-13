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

    var f = patient.gender() === 'F';

    var ia = isAge( patient, 21, 69 );

    var minDate = new Date();
    minDate.setFullYear( minDate.getFullYear()-3 );

    var hm = hasCervicalScreen( patient, minDate );

    var denominator = ap && ia && f;

    var numerator = ap && hm && ia && f;//still need to cut hystorectomy patients

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
