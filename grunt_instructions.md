###Grunt Instructions
Grunt is a javascript task runner, you can use it to do things like minification, compilation, unit testing, linting, etc. For this project, we're only using it to compile sass into css.

Change to the root directory (LoungeWeb directory)

Install grunt and the command line interface globally on your computer 
```
npm install -g grunt
npm install -g grunt-cli
```
Install the dev dependencies (run these from the LoungeWeb directory)

```
npm install
```
Open a new terminal (from the LoungeWeb directory)

Run grunt watch and keep it running. (It will listen for whenever a change has been made to the .scss files and compile them into application.css)
