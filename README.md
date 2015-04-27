#Queries for the PDC Network
=======

These are queries used by the Physicians Data Collaborative.  Many of the initial set are intended to duplicate queries in AMCARE.

Queries are stored on the [hQuery Hub](https://github.com/PhysiciansDataCollaborative/hub) and delegated to the [hQuery Endpoints](https://github.com/PhysiciansDataCollaborative/endpoint). Queries are then run using Map/Reduce on a MongoDB instance containing patient data. 

To run the queries locally, for either running unit tests or for running during development. 

This repository does not execute queries on endpoints! At most it is able to execute queries locally using mock data. 

**This repository should NOT ever contain real patient data!.** 

The structure of the repository is as follows: 

    queries/
    ├── README.md
    ├── Research/    # Contains queries related to various research projects. 
    ├── Resources/   # A few templates and samples to help direct writing queries. 
    ├── functions/   # Contains helper functions that are injected into the query when it is run. 
    ├── queries/     # Unless otherwise specified, put queries in here. Follow naming "PDC-XXX_name-of-this-query.js"
        ├── PDC-001_population-map.js
    |-- directives/  # contains directives for each query
        |-- PDC-001_population.json 
    └── test/        # Contains the test framework for unit testing queries.
	|-- data_processor # contains functions to be used by the test framework to pre-process the data, useful for managing date offsets.
        ├── data/    # Contains test data (json) for a unit test, names of test files should match query name.  
        │   ├── PDC-001_population-1.json
        ├── exception.js
        ├── index.js # The main test framework. 
        ├── node_modules/ # Contains dependancies for test framework
        ├── resources/    # Useful things/templates for test framework. 
        └── verify/       # Contains verify function query unit tests, name should match query name.
            ├── PDC-001_population-1.js

##Query Structure

### Creating a Query

From an hQuery/PDC hub, use the following query.  It will return a list of keys for people records.  At the moment all queries use the same reduce function.

#### Directives

Each query **must** have a *directive* (found in the directives/ directory) that indicates its dependancies and how it should be tested. Without a directive other tooling (tests, importers etc..) will not know how to handle the query. The directive must be a single JSON file (preferably name with the name of query: `PDC-XXX_some-interesting-name`). Inside of the directive, a JSON object of the following structure must exist: 

```JSON
{
    "name" : "QUERY NAME",
    "description" : "SOME DESCRIPTION", 
    "map": "PATH TO MAP FUNCTION", 
    "reduce" : "PATH TO REDUCE FUNCTION",
    "functions" : ["PATH TO HELPER FUNCTION 1", ...],  
    "qualified_by":["PATH TO QUALITY PROBE 1", ... ],
    "tests" : [
        {
            "name" : "TEST CASE NAME",
            "data" : "PATH TO TEST DATA",
            "verifier" : "PATH TO VERIFIER FUNCTION", 
	         "data_processor" : "PATH TO DATA PROCESSOR FUNCTION"
        },
        ...
    ]
}
```

**NOTE:** All paths in the directive must be with respect to the root of queries repo (queries/), *EXCEPT FOR THE VERIFIER AND DATA_PROCESSOR PATHS IN TEST CASE DIRECTIVES*....these must be with respect to the queries/test/ directory. This is a consequence of JavaScript's `require()` behavior being w.r.t the location of the file rather than the location of execution...this is a bug that needs to be fixed at some point.

#### Code
Queries are executed as Map/Reduce tasks by the MongoDB on the endpoint. To this end, a map function `map(patient)` and reduce function `reduce(key, values)` is required.

##### Map:

```Javascript
// Reference Number: PDC-???                        // Varies by request
// Query Title: List of keys in people              // Varies by request
function map(patient) {
var keys = Object.keys(patient.json);           // For each patient (JSON)
                                                // ...find keys (an object)
emit("Keys used: " + keys, 1);                  // Emit keys, labeled "Keys used:"
}
```

##### Reduce:

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

The test utility allows one to run a set of queries who's directives (in the directives/ directory) match the input regex pattern. See the directive section of this README for details on how to create a directive. 

Run all queries and their tests by running `js test` (null pattern). 

Tests must be executed from the queries/ directory, not the test directory. 

Before running tests install dependencies using: `npm install minimist mock-reduce mongoose fs bson`

#### Usage: 
    js test [-q] [PATTERN] 

#### Example Usage:
    js test

    OR:
    js test -q  //for suppressing output. 

    OR:
    js test <regex>  //matches against directive file names and only run those. 


#### Arguments:
     
    -q      Suppress output, useful if running this as part of a build process.

#### Notes:
    - If you are receving error messages about JavaScript not being
        able to open files try changing paths to:  './<path>'
    - Ignore errors regarding bson import, these are related to a C++ binary version of BSON being unavailable, the JS version is sufficient for this test utility. 


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
