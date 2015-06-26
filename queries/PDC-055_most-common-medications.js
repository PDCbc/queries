/**
 * Query Title: PDC-055
 * Query Type:  Ratio Set
 * Description: Rx: Top Med Classes
 */
function map( patient ){

  try{

    if( filterProviders(patient.json.primary_care_provider_id, "PPhRR") ){

      if( activePatient( patient ) ){

        // Coded entry lists
        var medList  = patient.medications(),

        // Filter for active meds
        medications = filter_activeMeds( medList );

        // Emit results, top will be handled by Visualizer
        emit_medications( medications );

      }

    }
    
  }catch(e){

    emit("FAILURE"+e); 

  }

}

/**
 * Emits a list of medication codes and code types
 *   - proper names handled by DCLAPI module
 */
function emit_medications( codedEntryList ){

    // Physician ID, for emit
    var physicianID = "_" + patient.json.primary_care_provider_id,

    // How many characters to use in ATC codes
    atcCutoff = 3;

    for( var i = 0, L = codedEntryList.length; i < L; i++ ){

        var med = codedEntryList[ i ].medicationInformation().codedProduct();

        for( var j = 0; M = med.length, j < M; j++ ){

            var m = med[ j ],
            type = m.codeSystemName(),
            code = m.code();

            if( !type || !code || !type.toLowerCase() ){

                break;

            }

            if( type.toLowerCase() === 'whoatc'){

                code = code.substring( 0, atcCutoff );

            }

            emit( code + '_' + type + physicianID, 1 );

        }

    }

}
