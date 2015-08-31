/**
 * title : PDC-1932
 * description : The percentage of patients that have a diagnosis of chronic pain and have active opioid prescriptions totaling more than 200 mg/day.
 */

function map(patient) {

    if (!filterProviders(patient.json.primary_care_provider_id, "PracticeReflection|Polypharmacy|PopulationHealth|DataQuality|...")) {
        return;
    }




}