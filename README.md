#Queries for the PDC Network
=======

These are queries used by the Physicians Data Collaborative.  Many of the initial set are intended to duplicate queries in AMCARE.

Queries are stored on the [hQuery Hub](https://github.com/PhysiciansDataCollaborative/hub) and delegated to the [hQuery Endpoints](https://github.com/PhysiciansDataCollaborative/endpoint). Queries are then run using Map/Reduce on a MongoDB instance containing patient data. 

To run the queries locally, for either running unit tests or for running during development. 

This repository does not execute queries on endpoints! At most it is able to execute queries locally using mock data. 

This repository should NOT ever contain real patient data!. 

The structure of the repository is as follows: 

    queries/
    ├── README.md
    ├── Research/    # Contains queries related to various research projects. 
    ├── Resources/   # A few templates and samples to help direct writing queries. 
    ├── queries/     # Unless otherwise specified, put queries in here. Follow naming "PDC-XXX_name-of-this-query.js"
    │   ├── PDC-001_population-map.js
    └── test/        # Contains the test framework for unit testing queries.
        ├── data/    # Contains test data (json) for a unit test, names of test files should match query name.  
        │   ├── PDC-001_population-map.json
        ├── exception.js
        ├── index.js # The main test framework. 
        ├── node_modules/ # Contains dependancies for test framework
        ├── resources/    # Useful things/templates for test framework. 
        └── verify/       # Contains verify function query unit tests, name should match query name.
            ├── PDC-001_population-map.js

##Query Structure

### Creating a Query

From an hQuery/PDC hub, use the following query.  It will return a list of keys for people records.  At the moment all queries use the same reduce function.

Map:

```Javascript
// Reference Number: PDC-???                        // Varies by request
// Query Title: List of keys in people              // Varies by request
function map(patient) {

    var keys = Object.keys(patient.json);           // For each patient (JSON)
                                                    // ...find keys (an object)
    emit("Keys used: " + keys, 1);                  // Emit keys, labeled "Keys used:"
}
```

Reduce:

```Javascript
function reduce(key, values) {
  return Array.sum(values);                         // Tally up results
}
```


### Record Structure

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

## Test Framework

TODO: Finish me. 


