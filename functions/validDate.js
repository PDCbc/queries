function validDate(d)
{

  var defined = !(d === null || d === undefined);

  if(!defined)
  {
    return false;
  }

  return !Number.isNaN( d.getTime() );
}
