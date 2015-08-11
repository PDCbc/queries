function countCodedConditions(pt)
{
  if(!pt || !pt.json || !pt.json.conditions)
  {
    return null;
  }

  var conditions = pt.json.conditions;
  var coded = 0;

  conditions = conditions.filter(
    function(c)
    {
      return Object.keys(c.codes).length > 0;
    }
  );

  return conditions.length;
}
