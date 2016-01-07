# BUILTVISIBLE HOUSE STYLES #

### Overview ###

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

tbc

## Coding standards ##

The BV house styles have been written using the following coding standards, which should be used for all projects. These guidelines will likely evolve over time.

### General ###

* be consistent
* code should be clean, commented and readable
* use graceful degradation
* leave your code tidy, delete commented sections of code prior to completion
* assume someone else will need to work on your code after you do
* indent code logically
* use a tab width of 4
* don't repeat yourself

### HTML ###

* lowercase everything
* new tag, new line
* ensure HTML is valid
* no inline styles

### CSS ###

* use lowercase and hyphens for class names
* newline for each style property and classname
* don't use IDs for class names
* don't use !important
* use names based on structure, not presentation e.g. btn-primary not btn-green
* don't qualify class names with attribute types e.g. .well, not div.well 
* include a comment where a selector is included for a specific, not immediately obvious reason
* write CSS in a modular way if possible, assume that any element could be included anywhere on the site
* try to avoid excessive class hierarchy such as .basket .summary .details .product .description .price {color:#FF000;}
* don't use page specific classes
* apply styles using a class name rather than an element name (except for base styles)
* styles for a specific purpose should be grouped together, not scattered e.g. media queries, browser specific styles

### JavaScript ###

* scripts should only be inline where necessary
* JS should interact with the DOM using either element IDs, data* attributes or class names that have no styles associated with them, and use the naming convention js-classname, to make it really obvious that they are used only by the JavaScript
* use braces with all multiline blocks
* every function should have a comment that briefly explains what it does
* name functions and variables descriptively
* camelcase for objects, functions and instances

### Remember SEO ###

* page meta tags including og and any related extra stuff
* image alt tags
* correct heading structure
* semantic markup
* CSS, JS etc. should be minified
* image sizes should be optimised

### Repo structure ###

 .
├── gulpfile.js
├── gulp-configs
├── assets
│   ├── dist
│   │   ├── css
│   │   ├── img
│   │   │   └── icons
│   │   └── js
│   ├── src
│   │   ├── img
│   │   │   └── icons
│   │   ├── js
│   │   └── less
│   └── temp
│       └── icons
├── [files ...]
└── styleguide

* always have a README, include minimum information
	* dev URL
	* live URL
	* developer responsible
	* location of any relevant documents

