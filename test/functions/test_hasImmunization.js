function setUp() {

    var obj = {
        "_id"                         : "1",
        "emr_demographics_primary_key": "1",
        "primary_care_provider_id"    : "cpsid",
        "birthdate"                   : -923616000,
        "immunizations"               : [
            {"codes": {"whoATC": ["J07AL02"]}, "start_time": 1346457600}]
    };

    return obj;
}

module.exports = {

    testNullPatient: function () {


        var result = hasImmunization(null);

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false for a null patient"};
        }

    },

    testUndefinedPatient: function () {

        var result = hasImmunization();

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false for a undefined patient"};
        }

    },

    testRegularPatient: function () {

        var p = setUp();

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected true for patient"};

        }

    },

    testRegularWithoutImmunizationPatient: function () {

        var p = setUp();

        p.immunizations[0].codes['whoATC'][0] = "K07AL09";

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false for patient without immunization"};

        }
    },

    testMultipleCodes: function () {

        var p = setUp();

        p.immunizations[0].codes['whoATC'][0] = "500.0";
        p.immunizations[0].codes['whoATC'][1] = "400.0";
        p.immunizations[0].codes['whoATC'][2] = "J07AL02";


        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected true for patient with immunization"};
        }
    },

    testPatientWithUndefinedImmunizations: function () {

        var p = setUp();

        delete p.immunizations;

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false for patient with undefined Immunizations"};

        }

    },

    testPatientWithNullImmunizations: function () {

        var p = setUp();

        p.immunizations = null;

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false for patient with null Immunizations"};

        }

    },

    testPatientMultipleImmunizations: function () {

        var p = setUp();

        p.immunizations    = [];
        p.immunizations[0] = {"codes": {"ICD9": ["429.0"]}, "time": 1263167138, "description": "not immunization"};
        p.immunizations[1] = {"codes": {"ICD9": ["430.0"]}, "time": 1263167138, "description": "not immunization"};
        p.immunizations[2] = {"codes": {"whoATC": ["J07AL02"]}, "time": 1263167138, "description": "immunization"};

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected true for patient with the immunization in immunization list."};

        }

    },

    testPatientWithCombinedCodeSystems: function () {

        var p = setUp();

        p.immunizations    = [];
        p.immunizations[0] = {
            "codes"      : {"SNOMED-CT": ["123455"], "whoATC": ["J07AL02"]},
            "time"       : 1263167138,
            "description": "not immunization"
        };

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected true given the correct immunization code"};

        }

    },

    testPatientWithUndefinedCodes: function () {

        var p = setUp();

        delete p.immunizations[0].codes

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "ICD9", "");

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false given a patient with Immunizations but no codes"};

        }

    },

    testPatientEmptyCodes: function () {

        var p = setUp();

        p.immunizations    = [];
        p.immunizations[0] = {"codes": {}, "time": 1263167138, "description": "not immunization"};

        p = new hQuery.Patient(p);

        var result = hasImmunization(p, "whoATC", "^J07AL02$");

        if (result === false) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "expected false since no codes were given "};

        }

    },

    testMinDate: function () {

        var p = setUp();

        var d = new Date();

        d.setFullYear(d.getFullYear() - 1);

        p.immunizations[0].start_time = Math.floor(d.getTime()/1000);

        p = new hQuery.Patient(p);

        d.setFullYear(d.getFullYear() - 1);
        var result = hasImmunization(p, "whoATC", "^J07AL02$", d.getTime(), (new Date()).getTime());


        if (result === true) {

            return {result: true, message: "test passed"};

        } else {

            return {result: false, message: "Expected true for immunization with valid time range."};

        }

    }
};
