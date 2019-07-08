# LogFileWriterJS
A simple and lightweight log4j - inspired logger for nodeJS - projects

# Methods
Three log levels:
- DEBUG
- INFO
- ERROR

Example:

const Logger = require('./logfileWriter.js');

Logger.INIT("./logs", "example");
Logger.DEBUG("INDEX debug");
Logger.ERROR("INDEX debug");
Logger.INFO("INDEX debug");

This will create an example.log - file to the project's ./logs - folder


# External links:
https://www.npmjs.com/package/logfile-writer
