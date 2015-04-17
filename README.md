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
    ├── functions/   # Contains helper functions that are injected into the query when it is run. 
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

## Test Utility

The test utility allows one to do the following: 

* Run a single query 
* Run several queries from within the queries/ directory whose names match a regular expression.

Run all of the tests within the `queries/` directory with: `js test`

Before running tests install dependencies using: `npm install minimist mock-reduce mongoose fs bson`

See the help message for more options:  

Correct Usage:

    js test --query <path to query> --data <path to data> --verify <path to verify>

    OR:
    js test --run <query name>

    OR:
    js test --all <regex>


Arguments:

    -q (--query)        Specify the path to the query you want to execute.
    -d (--data)         Specify the path to the test data
    -v (--verify)       Specify the path to the verifier function for this query.
                            This must be relative to the test/ directory!
    -r (--run)          Specify the name of a query, will cause the test framework to look
                            in PROJECT_HOME/queries for a query to run.
    -a (--all) [regex]  Runs all the queries that are in the queries/ directory and match the regex patrern.
                            If the [regex] argument is not specified it will run all queries in queries/

### Dependencies

The test utility relies on several node packages (installed via [node package manager](https://www.npmjs.com/)): 

Before running tests install dependencies using: `npm install minimist mock-reduce mongoose fs bson`

* MockReduce 
    - Used to manage spoof the MapReduce
    - https://github.com/djungowski/MockReduce
    - https://www.npmjs.com/package/mock-reduce
* Minimist 
    - used to parsing command line args
    - https://github.com/substack/minimist
    - https://www.npmjs.com/package/minimist
* Mongoose
    - Required by MockReduce
* BSON 
    - Required by Mongoose for managing binary version of json. 
    - Installing this will likey throw errors however they can be ignored. The errors are about being unable to build a binary (from C++) of the BSON library. Instead, it will run using a pure JavaScript version. This would matter if we were creating a large scale web app, but this is a test framework...so a bit of performance loss is OK.   

### Notes
