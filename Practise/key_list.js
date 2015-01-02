// Reference Number: PDC-???                      // Varies by request
// Query Title: List of keys in people            // Varies by request
function map(patient) {

  var keys = Object.keys(patient.json);           // For each patient (JSON)
                                                  // ...find keys (an object)
  emit("Keys used: " + keys, 1);                  // Emit keys, labeled "Keys used:"
}
