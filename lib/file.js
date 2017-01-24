//Import dependencies
var fs = require('fs');
var pstat = require('pstat');

//File manager object
var file = function(path, opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the file path
  this.path = path;

  //Check for json
  this._json = (typeof opt.json === 'boolean') ? opt.json : false;

  //Default encoding
  this._encoding = (typeof opt.encoding === 'string') ? opt.encoding : 'utf8';

  //Return this
  return this;
};

//Check if file exists
file.prototype.exists = function(cb){ return pstat.isFile(this.path, cb); };

//Get the file content
file.prototype.read = function(cb)
{
  //Save this
  var self = this;

  //Read the file
  return fs.readFile(this.path, this._encoding, function(error, data)
  {
    //Check for error
    if(error){ return cb(error); }

    //Check for json data
    if(self._json === true){ data = JSON.parse(data); }

    //Do the callback with the data
    return cb(null, data);
  });
};

//Save a json file
file.prototype.write = function(data, cb)
{
  //Check for json data
  if(this._json === true){ data = JSON.stringify(data); }

  //Write the json file
  return fs.writeFile(this.path, data, this._encoding, cb);
};

//Update the file content
file.prototype.map = function(fn, cb)
{
  //Check the function
  if(typeof fn !== 'function'){ throw new Error('Expected function on file'); }

  //Save this
  var self = this;

  //Open the json file
  return self.read(function(error, data)
  {
    //Check the error
    if(error){ return cb(error); }

    //Update the data object
    data = fn(data);

    //Save the data
    return self.write(data, cb);
  });
};

//Append to the file
file.prototype.append = function(data, cb)
{
  //Append to the file
  return fs.appendFile(this.path, data, this._encoding, cb);
};

//Delete the file
file.prototype.delete = function(cb)
{
  //Save this
  var self = this;

  //Check if file exists
  this.exists(function(exists)
  {
    //Check if file exists
    if(exists === false){ return cb(null); }

    //Delete the file
    return fs.unlink(self._path, cb);
  });
};

//Exports to node
module.exports = file;
