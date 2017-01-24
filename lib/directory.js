//Import dependencies
var rmr = require('rmr');
var mkdirp = require('mkdirp');
var pstat = require('pstat');

//Manage a directory
var directory = function(path)
{
  //Save the directory path
  this.path = path;

  //Return this
  return this;
};

//Check if directory exists
directory.prototype.exists = function(cb)
{
  //Check if directory exists
  pstat.isFile(this.path, function(exists){ return cb(exists); });
};

//Remove the directory recursive
directory.prototype.remove = function(cb)
{
  //Remove the directory recursive
  return rmr(this.path, { parent: true }, cb);
};

//Empty the directory recursive
directory.prototype.empty = function(cb)
{
  //Remove all the content of the directory
  return rmr(this.path, { parent: false }, cb);
};

//Create the directory
directory.prototype.create = function(cb)
{
  //Create the directory
  return mkdirp(self.path, '0777', cb);
};

//Exports to node
module.exports = directory;
