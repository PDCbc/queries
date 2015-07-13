function setUpTest()
{

  var json = { "primary_care_provider_id" : "PROVIDER1",
    "birthdate": (new Date().getTime())/1000 - 3600*24*365*130
  };//make them approximately 130 years old

  return new hQuery.Patient(json);
}

module.exports = {

  testNull : function()
  {
    var pt = null;
    var result = validBirthdate(pt);
    var expected = null;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "};
    }
  },
  testUndefined: function()
  {
    var pt;
    var result = validBirthdate(pt);
    var expected = null;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "};
    }
  },
  testUndefinedBirthdate : function()
  {
    var pt = setUpTest();

    pt.json.birthdate = undefined;

    var result = validBirthdate(pt);
    var expected = null;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "};
    }
  },
  testNullBirthdate : function()
  {
    var pt = setUpTest();
    pt.json.birthdate = null;

    var result = validBirthdate(pt);
    var expected = null;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "};
    }
  },
  testInvalidBirthdate : function()
  {
    var pt = setUpTest();

    var result = validBirthdate(pt);
    var expected = false;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: " + result + " not " + expected + " as expected. "};
    }
  }
};
