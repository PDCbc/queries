/**
 * Created by sdiemert on 2015-06-25.
 *
 * Guides the process of creating a new query or function.
 * Generates files in all of the correct directories.
 */

var parseArgs = require('minimist');
var readline  = require('readline-sync');
var fs        = require('fs');
var logger    = require("./logger.js").Logger(1);
var util      = require('util');


var UTIL_PATH          = "util/";
var TEST_PATH          = "test/";
var DIRECTIVE_PATH     = "directives/";
var FUNCTION_PATH      = "functions/";
var QUERY_PATH         = "queries/";
var FUNCTION_TEST_PATH = "functions/";
var TEMPLATE_PATH      = UTIL_PATH + 'templates/';

var query_directive_template    = TEMPLATE_PATH + "query_directive.json";
var function_directive_template = TEMPLATE_PATH + "function_directive.json";
var query_code_template         = TEMPLATE_PATH + "query_template.js";
var function_code_template      = TEMPLATE_PATH + "function_template.js";
var function_test_template      = TEMPLATE_PATH + "function_test_template.js";

function exitProgram(code) {

    code = code || 0;

    logger.warn("\nProgram Exiting....");
    process.exit(code);
}

function checkEnv() {

    if (!fs.existsSync(TEST_PATH)) {

        logger.error("ERROR: No " + TEST_PATH + " directory found.");
        exitProgram(1);
    }

    if (!fs.existsSync(DIRECTIVE_PATH)) {

        logger.error("ERROR: No " + DIRECTIVE_PATH + " directory found.");
        exitProgram(1);
    }

    if (!fs.existsSync(QUERY_PATH)) {

        logger.error("ERROR: No " + QUERY_PATH + " directory found.");
        exitProgram(1);
    }

    if (!fs.existsSync(FUNCTION_PATH)) {

        logger.error("ERROR: No " + FUNCTION_PATH + " directory found.");
        exitProgram(1);
    }

    if (!fs.existsSync(FUNCTION_TEST_PATH)) {

        logger.error("ERROR: No " + FUNCTION_PATH + " directory found.");
        exitProgram(1);
    }

    if (!fs.existsSync(TEMPLATE_PATH)) {

        logger.error("ERROR: No " + TEMPLATE_PATH + " directory found.");
        exitProgram(1);

    }

}

function askInput(question) {

    var val = null;

    while (!val) {

        val = readline.question(question);

        if (val === "exit" || val === "quit") {

            exitProgram(0);

        }

    }

    return val;

}

function writeQueryFiles(title, shortName, desc) {

    var directive = JSON.parse(fs.readFileSync(query_directive_template));
    var code      = fs.readFileSync(query_code_template).toString();
    var map_path  = QUERY_PATH + title + "_" + shortName + ".js";

    directive.type        = "QUERY";
    directive.title       = title;
    directive.name        = title + "_" + shortName;
    directive.description = desc;
    directive.map         = map_path;


    code = code.replace("$$TITLE$$", title);
    code = code.replace("$$DESCRIPTION$$", desc);

    directive    = JSON.stringify(directive, null, '\t');
    var dir_path = DIRECTIVE_PATH + title + "_" + shortName + ".json";


    if (!fs.existsSync(map_path) && !fs.existsSync(dir_path)) {

        fs.writeFileSync(map_path, code);
        fs.writeFileSync(dir_path, directive);
        logger.success("Files successfully created!");
        exitProgram(0);

    } else {

        var s = "Failed to create new files. One or more queries already exist at paths:";
        s += dir_path + " OR ";
        s += map_path;
        logger.error(s);
        exitProgram(1);

    }

}

function writeFunctionFiles(name, desc) {

    var directive = JSON.parse(fs.readFileSync(function_directive_template));
    var code      = fs.readFileSync(function_code_template).toString();
    var test      = fs.readFileSync(function_test_template).toString();
    var fun_path  = FUNCTION_PATH + name + ".js";
    var test_path = FUNCTION_TEST_PATH +"test_"+ name + ".js";
    var dir_path  = DIRECTIVE_PATH + name + ".json";


    directive.type        = "FUNCTION";
    directive.name        = name;
    directive.path        = fun_path;
    directive.description = desc;
    directive.test        = test_path;


    test = test.replace("$$FUNCTIONNAME$$", name);
    code = code.replace("$$FUNCTIONNAME$$", name);
    code = code.replace("$$FUNCTIONNAME$$", name);

    if (
        !fs.existsSync(fun_path) && !fs.existsSync(dir_path) && !fs.existsSync(test_path)
    ){

        fs.writeFileSync(fun_path, code);
        fs.writeFileSync(TEST_PATH+test_path, test);
        fs.writeFileSync(dir_path, JSON.stringify(directive, null, "\t"));
        logger.success("Files successfully created!");
        exitProgram(0);

    }else{

        var s = "Failed to create new files. One or more queries already exist at paths:";
        s += dir_path + " OR ";
        s += test_path;
        s += fun_path;
        logger.error(s);
        exitProgram(1);

    }


}

function newQuery() {

    var title = askInput("Enter the title of query (e.g. PDC-001) : ");

    var shortName = askInput("Enter a name for the query (no spaces) (e.g. most-common-meds : ");

    var description = askInput("Enter a *short* description (type skip to skip) : ");

    //TODO: Add dependancies, reduce, and qualified_by fields.

    writeQueryFiles(title, shortName, description);

}

function newFunction() {

    var name = askInput("Enter a name for the function (no spaces) (e.g. fooBar) : ");
    var desc = askInput("Enter a *short* description for the function : ");

    writeFunctionFiles(name, desc);

}

function newQueryTest() {

    //TODO: implement me.

}

function main() {

    logger.info("Welcome to the PDC Query Framework");
    logger.info("This is a development and test environment for queries to run in the hQuery system.");

    logger.info("This utility will guide you through the process of creating a new query or function.");
    logger.info("\n\n");

    //check the envirnoment we are in to make sure it has
    // all of the required directories.
    checkEnv();

    var action = null;

    var fOrQ = null;
    while (!action) {

        fOrQ = readline.question("New query or function?  ([q]uery/query[t]est/[f]unction/[e]xit) : ").toLowerCase();

        if (fOrQ === 'q' || fOrQ === "query") {

            action = "query";

        } else if (fOrQ === 'f' || fOrQ === 'function') {

            action = "function";

        } else if (fOrQ === 'e' || fOrQ === 'exit') {

            action = 'exit';

        } else if (fOrQ === 't' || fOrQ === 'test' || fOrQ === 'querytest') {

            action = 'querytest';

        } else {

            action = null;
        }

    }

    switch (action) {

        case 'function':

            newFunction();

            break;
        case 'query':

            newQuery();

            break;

        case 'querytest':

            newQueryTest();

        case "exit":
            exitProgram();
            break;
        default:
            logger.warn("Unknown option: " + action);
            exitProgram();
            break;

    }

}

main();


