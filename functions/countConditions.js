function countConditions(pt)
{
  if(!pt || !pt.json || !pt.json.conditions)
  {
    return null;
  }

  var conditions = pt.json.conditions;

  return conditions.length;
}
