module.exports = function(grunt) {
  var hostname = 'localhost';

  grunt.initConfig({
    connect: {
      devserver: {
        options: {
          hostname: hostname,
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);
};