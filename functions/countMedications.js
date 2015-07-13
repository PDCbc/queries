function countMedications(pt)
{
  if(!pt || !pt.json || !pt.json.medications)
  {
    return null;
  }

  var medications = pt.json.medications;

  return medications.length;
}
