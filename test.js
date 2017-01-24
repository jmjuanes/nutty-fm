//Import dependencies
var keue = require('keue');

//Import project manager
var project = require('./index.js');

//Get the new keue object
var k = new keue();

//File and directory variables
var file = null, directory = null;

//Test the templating
k.then(function(next)
{
  //Get the path
  var path = '/hello/this/{var1}/a/{var2}';

  //Replace elements
  var elements = { var1: 'is', var2: 'test' };

  //Build the template
  var build = project.template(path, elements);

  //Display in console
  console.log('Expected:  /hello/this/is/a/test ');
  console.log('Generated: ' + build);

  //Next test
  return next();
});

//Test files
k.then(function(next)
{
  //Get the new file
  file = new project.file('./test.json', { json: true });

  //Display in console
  console.log('New file: ' + file.path);

  //Check if file exists
  file.exists(function(exists)
  {
    //Display if exists
    console.log('File exists?: ' + exists);

    //Continue
    return next();
  });
});

//Write the file
k.then(function(next)
{
  //Write some content to the file
  file.write({ value: 'This is a test' }, function(error)
  {
    //Check the error
    if(error){ throw error; }

    //Read the file content
    file.read(function(error, data)
    {
      //Check the error
      if(error){ throw error; }

      //Display the content
      console.log('File content: ' + JSON.stringify(data));

      //Continue
      return next();
    });
  });
});

//Test update the file content
k.then(function(next)
{
  //Function to update the content
  var fn = function(data){ data['value'] = 'Ups...'; return data; };

  //Update the file content
  file.map(fn, function(error)
  {
    //Check error
    if(error){ throw error; }

    //Read the file
    file.read(function(error, data)
    {
      //Check the error
      if(error){ throw error; }

      //Display the file content
      console.log('File content: ' + JSON.stringify(data));

      //Continue
      return next();
    });
  });
});

//Delete the file
k.then(function(next)
{
  //Delete the file
  file.delete(function(error)
  {
    //Check the error
    if(error){ throw error; }

    //Display in console
    console.log('File deleted: ' + file.path);

    //Continue
    return next();
  });
});

//Create the directory
k.then(function(next)
{
  //Get the new directory
  directory = new project.directory('./my-dir/');

  //Display the directory path in console
  console.log('Directory path: ' + directory.path);

  //Check if directory exists
  directory.exists(function(exists)
  {
    //Check if exists
    console.log('Directory exists: ' + exists);

    //Create the directory
    directory.create(function(error)
    {
      //Check the error
      if(error){ throw error; }

      //Display in console
      console.log('Directory ' + directory.path + ' created');

      //Delete the directory
      directory.delete(function(error)
      {
        //Check the error
        if(error){ throw error; }

        //Display in console
        console.log('Directory ' + directory.path + ' deleted');
      });
    });
  });
});

//Run the keue
k.run();
