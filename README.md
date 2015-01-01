queries
=======

These are queries used by the Physicians Data Collaborative.  Many of the initial set are intended to duplicate queries in AMCARE.

## Record Structure

Queries are written in JavaScript with the keys below.

people:

* _id
* emr_demographics_primary_key
* primary_care_provider_id
* effective_time
* first
* last
* birthdate
* gender
* medical_record_number
* hash_id
* allergies
* conditions
* encounters
* immunizations
* medications
* results
* vital_signs
* hQuery
* Specifics:


## Creating a Query

From an hQuery/PDC hub, use the following query.  It will return a list of keys for people records.  At the moment all queries use the same reduce function.

Map:

```bash
// Reference Number: PDC-???                        // Varies by request
// Query Title: List of keys in people              // Varies by request
function map(patient) {

    var keys = Object.keys(patient.json);           // For each patient (in JSON) find keys (an object)
    emit("Keys used: " + keys, 1);                  // Emit keys, putting "Keys used" in front
}
```


Reduce:

```bash
function reduce(key, values) {
  return Array.sum(values);                         // Tally up whatever value we queried
}
```
