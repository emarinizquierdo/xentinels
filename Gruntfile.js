// Generated on 2015-03-06 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Define the configuration for all the tasks
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['app/**/*.js', 'app/**/*.css', 'app/**/*.html'],
                tasks: ['injector'],
                options: {
                    spawn: false,
                },
            },
        },
        injector: {
            options: {
                addRootSlash: false,
                relative: true
            },
            local_dependencies: {
                files: {
                    'app/index.html': ['app/app/**/*.js', 'app/css/**/*.css', 'app/app/**/*.css'],
                }
            }
        }
    })


    grunt.registerTask('default', [
        'watch'
    ]);
};
