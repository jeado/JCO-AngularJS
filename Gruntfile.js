module.exports = function(grunt) {
  var address = '192.168.0.36';

  grunt.initConfig({
    connect: {
      devserver: {
        options: {
          hostname: 'localhost',
          keepalive: true
        }
      },
      testserver: {
        options: {
          hostname: address,
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('testserver', ['connect:testserver']);
  grunt.registerTask('default', ['connect']);
};