// Karma configuration
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './app',

    // list of files / patterns to load in the browser
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      // '**/*.module.js',
      // '*!(.module|.spec).js',
      // '!(lib)/**/*!(.module|.spec).js',
      // '**/*.spec.js',
      'todo-list/todo-list.component.spec.js',
      'todo-list/todo-list.module.js',
      'todo-list/todo-list.component.js',
      'todo-list/todo-list.filter.js'
    ],

    // enable / disable watching file and executing tests whenever any file changes (WebStorm disables autoWatch in Karma configuration)
    autoWatch: false,

    // frameworks to use
    frameworks: ['jasmine'],

    // start these browsers
    browsers: ['Chrome', 'Firefox'],

    // list of plugins to load. By default, Karma loads all sibling NPM modules which have a name starting with `karma-*`.

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
