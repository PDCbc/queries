/**
 * Query Title: PDC-602_DQ-Obesity-Adult
 * Query Type:  Ratio
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var ia = isAge( patient, 65 );

    var ap = activePatient( patient );

    var hi = hasPneumococcalVax( patient );

    var denominator = ia && ap;

    var numerator = ia && ap && hi;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
