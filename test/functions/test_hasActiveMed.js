function setUpStatin() {
    var obj = {
        "_id": "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id": "cpsid",
        "birthdate": 0,
        "medications" : [{
            "_id" : { "$oid" : "551cce86c58406644d0000c4" },
            "_type" : "Medication",
            "time" : -1,
            "start_time" : new Date(), "end_time" : new Date(),
            "statusOfMedication" : { "value" : "active" },
            "codes" : {},
            "freeTextSig" : ""
        }]
    };

    return obj;
}

module.exports = {

    /*
    * Test behavior when no patient is provided, i.e. undefined condition.
    *
    * Expected: false.
    */
    testUndefinedPatient : function(){

        var result;

        try{

            result = hasActiveMed();

        }catch(e){
            console.log(e);
        }

        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for input undefined"};

        }
    },

    /*
    * Test behavior when null patient is provided.
    *
    * Expected: false.
    */
    testNullPatient : function(){

        var result = hasActiveMed(null);

        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for input null"};

        }

    },

    /*
    * Test normal behavior with whoATC: C10AA
    *
    * Expected: true.
    */
    testNormal : function(){

        var pt = setUpStatin();

        pt.medications[0].codes.whoATC = ["C10AA"];

        pt = new hQuery.Patient(pt);

        //pt, med, doseLimit, minDose, maxDose
        var result = hasActiveMed(pt, "^C10AA$", false);


        if (result === true ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected true for patient with two active statins"};

        }

    },

    /*
    * Test behavior with empty medications list
    *
    * Expected: false.
    */
    testEmptyMedicationList : function(){

        var c = setUpStatin();

        c.medications = [];

        c = new hQuery.Patient(c);

        //pt, med, doseLimit, minDose, maxDose
        var result = hasActiveStatin(c);


        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for patient with empty medication list"};

        }

    },

    /*
    * Test behavior with undefined medication list
    *
    * Expected: false.
    */
    testUndefinedMedicationList : function(){

        var c = setUpStatin();

        delete c.medications;

        c = new hQuery.Patient(c);

        var result = hasActiveStatin(c);


        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for patient with undefined medication list"};

        }

    },

    /*
    * Test behavior with null medication list
    *
    * Expected: false.
    */
    testNullMedicationList : function(){

        var c = setUpStatin();

        c.medications = null;

        c = new hQuery.Patient(c);

        var result = hasActiveStatin(c);


        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for patient with null medication list"};

        }

    },

    /*
    * Test behavior with completed medication that is a statin
    *
    * Expected: false.
    */
    testInactiveStatinInList : function(){

        var pt = setUpStatin();

        pt.medications[0].codes.whoATC = ["C10AA"];
        pt.medications[0].statusOfMedication = "completed";
        pt.medications[0].start_time = 0; //some time around Jan 1st 1970
        pt.medications[0].end_time = 1000;


        pt = new hQuery.Patient(pt);

        ////pt, med, doseLimit, minDose, maxDose
        var result = hasActiveMed(pt, "^C10AA$", false);


        if (result === false ){

            return {result : true, message:"test passed!"};

        }else{

            return {result:false, message:"expected false for patient with inactive statin"};

        }
    }

};
