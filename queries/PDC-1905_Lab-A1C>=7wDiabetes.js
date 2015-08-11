/**
 * Query Title: PDC-1905_Lab-A1C>=7wDiabetes
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

    var hc = hasDiabetes( patient );

    var minDate = new Date();

    minDate.setMonth( minDate.getMonth()-6 );

    var maxDate;//undefined

    var hl = hasInRangeLab( patient, 'LOINC', '4548-4', false, Number.NEGATIVE_INFINITY, 7, '%', minDate, maxDate, true );

    var denominator = ap && hc;

    var numerator   =  ap && hc && hl;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
