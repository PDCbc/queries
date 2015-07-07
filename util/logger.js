/**
 * Created by sdiemert on 2015-06-25.
 */

'use strict';
var colors = require('cli-color');


/*
 * Logger levels are:
 *   2 : DEBUG (log)
 *   1 : INFO, SUCCESS, WARN, ERROR
 *
 * Path is a string to display that is a module name
 */

function Logger(level) {


    var that = {};

    var info = function (text, line) {

        console.log(colors.white(text));

    };

    var log = function (text, line) {

        if (level > 1) {

            console.log(colors.white(text));

        }

    };

    var debug = function (text, line) {

        if (level > 1) {

            console.log(colors.white(text));

        }

    };

    var warn = function (text, line) {

        console.log(colors.yellow(text));

    };

    var error = function (text, line) {

        console.log(colors.red(text));

    };

    var success = function (text, line) {

        console.log(colors.green(text));

    };


    that.info    = info;
    that.log     = log;
    that.debug   = debug;
    that.warn    = warn;
    that.error   = error;
    that.success = success;
    return that;

}


/**
 * A simple wrapper around `console` that uses colors.
 * @type {Object}
 */
module.exports = {Logger: Logger, DEBUG: 0, INFO: 1};

