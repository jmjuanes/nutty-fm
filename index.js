//Project manager
var project = {};

//Path template
project.template = function(str, obj)
{
  //Check the template object
  if(typeof obj !== 'object'){ return str; }

  //Read all the keys in the object
  for(var key in obj)
  {
    //Get the regular expression
    var reg = new RegExp('{' + key + '}', 'gi');

    //Replace in the string
    str = str.replace(reg, obj[key]);
  }

  //Return the formated path
  return str;
};

//Add the file manager
project.file = require('./lib/file.js');

//Add the directory manager
project.directory = require('./lib/directory.js');

//Exports to node
module.exports = project;
