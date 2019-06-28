/**
* Javacript Logfile Writer
* Version 0.0.1
*/

// Imports
const fs = require('fs');

const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2
}

/**
 * Logfile Writer module  
 * @author oinasjo
 */
let Logger = {

    logFileLocation: "",
    logFileName: "",
    defaultURL: "./logs/logFileWriter.log",

    /**
     * Initializes the logger. If init is not called, the Logger uses ./logs/
     * { String } logFileLocation, { String } logFileName
     */
    init: function (logFileLocation, logFileName) {
        try {
            Utils.validateString(logFileLocation, logFileName);
        } catch (err) {
            throw err;
        }
        this.logFileLocation = logFileLocation;
        this.logFileName = logFileName;
    },
    debugLog: function (str) {
        let config = { logLevel: LogLevel.DEBUG };
        this.writeLog(str, config);
    },
    infoLog: function (str) {
        let config = { logLevel: LogLevel.INFO };
        this.writeLog(str, config);
    },
    errorLog: function (str) {
        let config = { logLevel: LogLevel.ERROR };
        this.writeLog(str, config);
    },
    writeLog: function (debugString, config) {
        let stream = fs.createWriteStream(this.defaultURL, { flags: 'a' });
        stream.on('finish', function () {
            console.log("Log file has been updated");
        });
        stream.write(this.buildString(debugString, config));
        stream.end();
    },
    buildString: function (str, config) {
        let timeStamp = new Date().toISOString();
        let logLevel = config.logLevel;
        let msg = "";
        switch (logLevel) {
            case LogLevel.DEBUG:
                msg = "[" + timeStamp + "] DEBUG: " + str + "\n"; 
                break;
            case LogLevel.INFO:
                msg = "[" + timeStamp + "] INFO: " + str + "\n"; 
                break;
            case LogLevel.ERROR:
                msg = "[" + timeStamp + "] ERROR: " + str + "\n"; 
                break;
        }
        return msg;
    }
};

let Utils = {
    validateString: function () {
        let args = Array.from(arguments);
        if (this.arrayNotNullOrEmpty(args)) {
            [].forEach.call(arguments, function (element) {
                if (typeof element !== 'string') {
                    throw "Illegal parameter value: Expected the parameter to be typeof 'string'";
                }
            });
        }
    },
    arrayNotNullOrEmpty: function (array) {
        if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
            return true;
        }
    },

    isInt: function (value) {
        return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
    }
};

// Exports
module.exports = Logger;
