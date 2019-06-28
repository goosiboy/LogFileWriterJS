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

    _logFileLocation: "",
    _logFileName: "",
    _defaultURL: "./logs/logFileWriter.log",
    _debugMode: false,

    /**
     * Initializes the logger. If init is not called, the Logger uses ./logs/
     * { String } _logFileLocation, { String } _logFileName
     */
    INIT: function (_logFileLocation, _logFileName) {
        try {
            Utils.validateString(_logFileLocation, _logFileName);
        } catch (err) {
            throw err;
        }
        this._logFileLocation = _logFileLocation;
        this._logFileName = _logFileName;
    },
    DEBUGLOG: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.DEBUG }
        );
    },
    INFOLOG: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.INFO }
        );
    },
    ERRORLOG: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.ERROR }
        );
    },
    _runInDebugMode: function (flag) {
        this._debugMode = flag;
    },
    _writeLog: function (debugString, config) {
        let stream = fs.createWriteStream(this._defaultURL, { flags: 'a' });
        let logLevel = config.logLevel;

        if (this._debugMode) {
            stream.on('finish', function () {
                console.log("Log file has been updated");
            });
        }

        stream.write(this._buildString(debugString, logLevel));
        stream.end();
    },
    _buildString: function (str, logLevel) {
        let timeStamp = new Date().toISOString();
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
