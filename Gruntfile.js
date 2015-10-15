module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  //update broken bootstrap bower.json
  grunt.registerMultiTask("updatebootstrap", "Fixes bootstrap's bower.json", function() {
    var bootBower = "bower_components/bootstrap/bower.json";
    if (!grunt.file.exists(bootBower)) {
      grunt.log.error("file " + bootBower + " not found");
      return true;
    }

    var bower = grunt.file.readJSON(bootBower);
    bower["main"] = ["dist/css/bootstrap.css", "dist/js/bootstrap.js"]
    grunt.file.write(bootBower, JSON.stringify(bower, null, 2));
  });

  grunt.initConfig({
    bower: {
      install: {
         options: {
           targetDir: "bower_components/",
           install: true
         }
      }
    },
    updatebootstrap: {
      target: {}
    },
    wiredep: {
      target: {
        src: ['index.html'],
      }
    },
    coffee: {
      compile: {
        files: {
          'js/services.js': 'js/coffee/services.coffee',
          'js/controllers.js': 'js/coffee/controllers.coffee',
          'js/directives/pickDirective.js': 'js/coffee/directives/pickDirective.coffee',
          'js/directives/yesListDirective.js': 'js/coffee/directives/yesListDirective.coffee',
          'js/directives/noListDirective.js': 'js/coffee/directives/noListDirective.coffee',
          'js/directives/outputList.js': 'js/coffee/directives/outputList.coffee'
        }
      }
    }
  });



  grunt.registerTask('default', ['bower', 'updatebootstrap', 'wiredep', 'coffee']);
}
