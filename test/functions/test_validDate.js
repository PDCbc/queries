function setUpTest()
{
  return null;
}

module.exports = {

  testNull : function()
  {
    var d = setUpTest();
    var result = validDate(d);
    var expected = false;

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
    var d;
    var result = validDate(d);
    var expected = false;

    if(result === expected)
    {
        return {result : true, message : "test passed!"};
    }
    else
    {
        return {result : false, message : "Result was: "+result+" not "+expected+" as expected. "};
    }
  },
  testDefined : function()
  {
    var d = new Date();
    var result = validDate(d);
    var expected = true;

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
