var pg = require('pg');

var connString = 'postgres://richards@cs326:7326/richards';

// You can also configure the connection like this:
var connConfig = {
  user     : 'richards',
  database : 'richards',
  port     : 7326,
  host     : 'cs326'
};

var conn = connString;