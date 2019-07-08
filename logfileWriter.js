/**
* Javacript Logfile Writer
* Version 0.0.1
*/

// Imports
const fs = require('fs');
const os = require('os');

const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2
}

const OS = {
    WIN: 0,
    LINUX: 1,
    DARWIN: 2,
    FREEBSD: 3,
    SUNOS: 4 
}

/**
 * Logfile Writer module  
 * @author oinasjo
 */
let Logger = {

    _logFileLocation: "",
    _logFileName: "",
    _defaultLocation: "./logs/",
    _defaultName: "default.log",
    _debugMode: false,
    _default: true,

    /**
     * Initializes the logger. If init is not called, the Logger uses project's ./logs/ folder to store a .log file named 'default.log'
     * @param {String} logFileLocation
     * @param {String} logFileName
     */
    INIT: function (logFileLocation, logFileName) {
        try {
            Utils.validateString(logFileLocation, logFileName);
        } catch (err) {
            throw err;
        }

        if (logFileLocation.slice(-1) !== "/") {
            this._logFileLocation = logFileLocation + "/";
        } else {
            this._logFileLocation = logFileLocation;
        }

        if (logFileName.includes(".log") || logFileName.includes(".txt") || logFileName.includes(".xml")) {
            this._logFileName = logFileName;
        } else {
            this._logFileName = logFileName + ".log";
        }
        this._setDefault(false);
    },
    DEBUG: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.DEBUG }
        );
    },
    INFO: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.INFO }
        );
    },
    ERROR: function (str) {
        this._writeLog(
            str,
            { logLevel: LogLevel.ERROR }
        );
    },
    _checkPackageJSON: function (operatingSystem) {
        if (operatingSystem === OS.WIN) {
            console.log("win32");
        } else {
            console.log("not windows");
        }
    },
    _runInDebugMode: function (flag) {
        this._debugMode = flag;
    },
    _setDefault: function (bool) {
        this._default = bool;
    },
    _useDefaultLocation: function () {
        return this._default;
    },
    _writeLog: function (debugString, config) {
        let stream;
        let logURL;
        let defaultURL;
        if (this._useDefaultLocation()) {
            defaultURL = this._defaultLocation + this._defaultName;
            stream = fs.createWriteStream(defaultURL, { flags: 'a' });
        } else {
            logURL = this._logFileLocation + this._logFileName;
            stream = fs.createWriteStream(logURL, { flags: 'a' });
        }

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
                msg = "[" + this._getTimeStamp() + "] DEBUG: " + str + "\n"; 
                break;
            case LogLevel.INFO:
                msg = "[" + this._getTimeStamp() + "] INFO: " + str + "\n"; 
                break;
            case LogLevel.ERROR:
                msg = "[" + this._getTimeStamp() + "] ERROR: " + str + "\n"; 
                break;
        }
        return msg;
    },
    _getTimeStamp: function () {
        let date = new Date();

        let hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        let min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        let sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        let day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
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
