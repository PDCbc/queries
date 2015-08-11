function countCodedMedications(pt)
{
  if(!pt || !pt.json || !pt.json.medications)
  {
    return null;
  }

  var medications = pt.json.medications;
  var coded = 0;

  medications = medications.filter(
    function(m)
    {
      return Object.keys(m.codes).length > 0;
    }
  );

  return medications.length;
}
