function validBirthdate(pt)
{
  if( !pt )
  {
    return null;
  }

  if( !pt.json )
  {
    return null;
  }

  if( pt.json.birthdate === null || pt.json.birthdate === undefined )
  {
    return null;
  }

  var now = new Date();

  var age = pt.age(now);

  return age < 120;
}
