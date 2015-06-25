
function setUp ()
{
    var obj = {
                "_id": "1",
                "emr_demographics_primary_key": "1",
                "gender":"M",
                "primary_care_provider_id": "cpsid",
                "birthdate": -923616000,
                "vital_signs":
                    [
                        {
                            "codes":
                            {
                                "LOINC":
                                [
                                    "8480-6"
                                ]
                            },
                            "start_time": 1380153600,
                            "description": "WC",
                            "values":
                            [
                                {
                                    "scalar": "105",
                                    "units": "cm",
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


        var result = hasInRangeCMO(null);

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

        var result = hasInRangeCMO();

        if ( result === false)
        {
            return {result : true, message : "test passed"};
        }
        else
        {
            return {result : false, message : "expected false for a undefined patient"};
        }

    },

    testPatientWithWCOutsideOfRange: function(){
        var patient = new hQuery.Patient( setUp() );

        var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

        if(result === false)
        {
            return {result : true, message: "test passed"};
        }
        else
        {
            return {result : false, message: "test failed: expected a negative result with an out of range value"};
        }
    },

    testPatientWithWCInsideOfRange: function(){
        var patient = new hQuery.Patient( setUp() );

        patient.json.vital_signs[0].values[0].scalar = 100;//put patients CMO in Range

        var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

        if(result === true)
        {
            return {result : true, message: "test passed"};
        }
        else
        {
            return {result : false, message: "test failed: expected a negative result with an out of range value"};
        }
    },

    testPatientWithTwoVitalSignReadingsOnDifferentDatesBadOneLate: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "8480-6"
              ]
          },
          "start_time": 1280153600,
          "description": "WC",
          "values":
          [
              {
                  "scalar": "80",
                  "units": "cm",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient = new hQuery.Patient( setUp() );

      try
      {
        patient.json.vital_signs.push(newReading);
      }
      catch(e)
      {
        console.log('error: ' + e);
      }

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithTwoVitalSignReadingsOnDifferentDatesBadOneEarly: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "8480-6"
              ]
          },
          "start_time": 1480153600,
          "description": "WC",
          "values":
          [
              {
                  "scalar": "80",
                  "units": "cm",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient = new hQuery.Patient( setUp() );

      patient.json.vital_signs.push(newReading);

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === true)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithNullVitalSigns: function(){

      var patient = new hQuery.Patient( setUp() );

      patient.json.vital_signs = null;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithUndefinedVitalSigns: function(){

      var patient = new hQuery.Patient( setUp() );

      patient.json.vital_signs = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithUndefinedStartTimesForCMOs: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "8480-6"
              ]
          },
          "start_time": 1480153600,
          "description": "WC",
          "values":
          [
              {
                  "scalar": "80",
                  "units": "cm",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient;

      patient = new hQuery.Patient( setUp() );

      patient.json.vital_signs.push(newReading);

      patient.json.vital_signs[0].start_time = undefined;
      patient.json.vital_signs[1].start_time = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithNullStartTimesForCMOs: function(){
      var newReading = {
          "codes":
          {
              "LOINC":
              [
                  "8480-6"
              ]
          },
          "start_time": 1480153600,
          "description": "WC",
          "values":
          [
              {
                  "scalar": "80",
                  "units": "cm",
                  "_type": "PhysicalQuantityResultValue"
              }
          ]
      };

      var patient;

      patient = new hQuery.Patient( setUp() );

      patient.json.vital_signs.push(newReading);

      patient.json.vital_signs[0].start_time = null;
      patient.json.vital_signs[1].start_time = null;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNullCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.vital_signs[0].codes = null;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNUndefinedCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.vital_signs[0].codes = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNWrongCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.vital_signs[0].codes = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-8$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNNoCodes: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );


      patient.json.vital_signs[0].codes = {};

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithWrongUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithWrongUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].units = 'm';

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNullUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, null);

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNullUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;
      patient.json.vital_signs[0].values[0].units = null;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithUndefinedUnitsSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;
      patient.json.vital_signs[0].values[0].units = 'cm';

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, undefined);

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithUndefinedUnitsRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;
      patient.json.vital_signs[0].values[0].units = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithUndefinedScalarRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = undefined;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithUndefinedScalarSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, undefined, 'cm');

      if(result === true)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNullScalarRecorded: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = null;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, 102, 'cm');

      if(result === false)
      {
          return {result : true, message: "test passed"};
      }
      else
      {
          return {result : false, message: "test failed: expected a negative result with an out of range value"};
      }
    },

    testPatientWithMeasurementWithNullScalarSpecified: function(){

      var patient;

      patient = new hQuery.Patient( setUp() );
      patient.json.vital_signs[0].values[0].scalar = 80;

      var result = hasInRangeCMO( patient, 'LOINC', '^8480-6$', true, Number.NEGATIVE_INFINITY, null, 'cm');

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
