/**
 * Query Title: PDC-1907_BloodPressure-Diabetes
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

    minDate.setFullYear( minDate.getFullYear()-1 );

    var maxDate;//undefined

    var hl = hasBloodPressure( patient, false, Number.NEGATIVE_INFINITY, 130, Number.NEGATIVE_INFINITY, 180, minDate, maxDate, false );

    var denominator = ap && hc;

    var numerator   =  ap && hc && hl;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
