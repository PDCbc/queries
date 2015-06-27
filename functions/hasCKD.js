/**
* @param pt - the patient object that contains the hQuery patient API.
*
* @return - true if the patient has the condition documented, false otherwise.
*/

function hasCKD( pt ) {
  var system = "ICD9";
  var condition = "^58[1-3].*|^585.*|^58[7-8].*";

  return hasCondition(pt, system, condition);
}
