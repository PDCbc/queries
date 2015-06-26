/**
 * Query Title: PDC-1004
 * Query Type:  Ratio
 * Description: BMI-WC Check
 */
function map( patient ){

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if(!filterProviders(providerId, initiative))
    {
        return;
    }

    var ia = isAge( patient, 19, 1000 );

    console.log('patient: ' + JSON.stringify(patient));
    console.log('ia:' + ia);

    var ap = activePatient( patient );

    console.log('ia:' + ia);
    console.log('ap:' + ap);

    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear()-2);

    var hm = hasWC( patient, minDate ) || hasBMI( patient, minDate ) || ( hasWeight( patient, minDate ) && hasHeight( patient, minDate ) );

    console.log('hm:' + hm);
    
    var denominator = ia && ap;

    var numerator   =  ia && ap && hm;

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );
}
