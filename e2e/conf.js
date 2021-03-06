var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/*.js'],
  capabilities: {
    browserName: 'chrome'
  },

  onPrepare: function() {
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './e2e/reports/',
      screenshotsFolder: 'images'
    }));
  }
}