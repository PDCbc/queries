/**
 * title : PDC-943
 * description : Percentage of active patients aged 65 or older who have a documentented influenza vaccination.
 *
 * @param patient {Patient}
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PopulationHealth")) {
        return;
    }

    var denominator = activePatient( patient ) && isAge(patient, 65);

    var numerator = denominator && hasRecentInfluenzaVaccine(patient);

    emit( "denominator_" + patient.json.primary_care_provider_id,  + denominator );

    emit( "numerator_" + patient.json.primary_care_provider_id, + numerator   );

}