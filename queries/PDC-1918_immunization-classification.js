/**
 * title : PDC-1918
 * description : Classification of immunizations delivered
 */

function map(patient) {

    var providerId = patient.json.primary_care_provider_id;

    var initiative = "PopulationHealth";

    if (!filterProviders(providerId, initiative)) {

        return;

    }

    if (!activePatient(patient)) {

        return;

    }

    var imm = patient.immunizations();


    if (imm) {

        emit_medications(imm, providerId);

    }

}

/**
 * Emits a list of medication codes and code types
 *   - proper names handled by DCLAPI module
 */
function emit_medications(codedEntryList, provider) {

    var atcCutoff = 3;

    if (!provider || !codedEntryList || !codedEntryList.length) {
        return;
    }


    for (var i = 0, L = codedEntryList.length; i < L; i++) {

        var med = codedEntryList[i].medicationInformation().codedProduct();

        for (var j = 0; M = med.length, j < M; j++) {

            var m    = med[j],
                type = m.codeSystemName(),
                code = m.code();

            if (!type || !code || !type.toLowerCase()) {

                break;

            }

            emit(code + '_' + type + "_" + provider, 1);

        }

    }

}