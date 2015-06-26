/**
 * Query Title: PDC-955
 * Query Type:  Ratio
 *                (population is 20 - 120 years of age)
 */
function map( patient ){
    
    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";   
 
    if(!filterProviders(providerId, initiative))
    {   
        return;
    }

    var denominator = isAge( patient, 20, 120 ); 

    var numerator   =  denominator &&  hasCHF(patient); 

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
