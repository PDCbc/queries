
function setUp ()
{
    var obj = {
                "_id": "1",
                "emr_demographics_primary_key": "1",
                "gender":"M",
                "primary_care_provider_id": "cpsid",
                "birthdate": -923616000,
                "results":
                    [
                        {
                            "codes":
                            {
                                "LOINC":
                                [
                                    "4548-4"
                                ]
                            },
                            "start_time": 1380153600,
                            "description": "HGBA1C",
                            "values":
                            [
                                {
                                    "scalar": "8.0",
                                    "units": "%",
                                    "_type": "PhysicalQuantityResultValue"
                                }
                            ]
                        }
                    ]
                };

    return obj;
}

module.exports = {

    testNullPatient : function(){

        var result = hasInRangeLab(null);

        if ( result === false)
        {
            return {result : true, message : "test passed"};
        }
        else
        {
            return {result : false, message : "expected false for a null patient"};
        }
    },

    testUndefinedPatient : function(){

        var result = hasInRangeLab();

        if ( result === false)
        {
            return {result : true, message : "test passed"};
        }
        else
        {
            return {result : false, message : "expected false for a undefined patient"};
        }

    },

    testPatientWithLabOutsideOfRange: function(){
        var patient = new hQuery.Patient( setUp() );

        var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

        if(result === false)
        {
            return {result : true, message: "test passed"};
        }
        else
        {
            return {result : false, message: "test failed: expected a negative result with an out of range value"};
        }
    },

    testPatientWithLabInsideOfRange: function(){
        var patient = new hQuery.Patient( setUp() );

        patient.json.results[0].values[0].scalar = 5;//put patients result in Range

        var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

        if(result === true)
        {
            return {result : true, message: "test passed"};
        }
        else
        {
            return {result : false, message: "test failed: expected a negative result with an out of range value"};
        }
    },

    testPatientWithTwoLabReadingsOnDifferentDatesBadOneLate: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "4548-4"
              ]
          },
          "start_time": 1280153600,
          "description": "HGBA1C",
          "values":
          [
              {
                  "scalar": "6",
                  "units": "%",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient = new hQuery.Patient( setUp() );

      patient.json.results.push(newReading);

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithTwoResultsOnDifferentDatesBadOneEarly: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "4548-4"
              ]
          },
          "start_time": 1480153600,
          "description": "HGBA1C",
          "values":
          [
              {
                  "scalar": "6",
                  "units": "%",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient = new hQuery.Patient( setUp() );

      patient.json.results.push(newReading);

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === true)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithNullResults: function(){

      var patient = new hQuery.Patient( setUp() );

      patient.json.results = null;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithUndefinedResults: function(){

      var patient = new hQuery.Patient( setUp() );

      patient.json.results = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithUndefinedStartTimesForResults: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "4548-4"
              ]
          },
          "start_time": 1480153600,
          "description": "HGBA1C",
          "values":
          [
              {
                  "scalar": "9",
                  "units": "%",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient;

      patient = new hQuery.Patient( setUp() );

      patient.json.results.push(newReading);

      patient.json.results[0].start_time = undefined;
      patient.json.results[1].start_time = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithNullStartTimesForResults: function(){

      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "4548-4"
              ]
          },
          "start_time": 1480153600,
          "description": "HGBA1C",
          "values":
          [
              {
                  "scalar": "6",
                  "units": "%",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient;

      patient = new hQuery.Patient( setUp() );

      patient.json.results.push(newReading);

      patient.json.results[0].start_time = null;
      patient.json.results[1].start_time = null;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', false, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with a lab that has no start time"};
      }
    },

    testPatientWithResultWithNullCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.results[0].codes = null;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNUndefinedCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.results[0].codes = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNWrongCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.results[0].codes = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNNoCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.results[0].codes = {};

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithWrongUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;

      var result = hasInRangeLab( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 7, 'm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithWrongUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].units = 'm';

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNullUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, null);

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNullUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;
      patient.json.results[0].values[0].units = null;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithUndefinedUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;
      patient.json.results[0].values[0].units = '%';

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, undefined);

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithUndefinedUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;
      patient.json.results[0].values[0].units = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithUndefinedScalarRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = undefined;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 6, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithUndefinedScalarSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, undefined, '%');

      if(result === true)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNullScalarRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = null;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, 7, '%');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithResultWithNullScalarSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.results[0].values[0].scalar = 6;

      var result = hasInRangeLab( patient, 'LOINC', '^4548-4$', true, Number.NEGATIVE_INFINITY, null, '%');

      if(result === true)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },
};
