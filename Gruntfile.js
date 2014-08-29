'use strict';

module.exports = function(grunt) {

  // https://www.npmjs.org/package/matchdep
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // https://www.npmjs.org/package/time-grunt
  require('time-grunt')(grunt);

  grunt.initConfig({

    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
      begin: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      end: {
        files: [{
          dot: true,
          src: [
            'dist/css/main.css', 'dist/css/main.scss', 'dist/css/normalize.css', 'dist/js/main.js', 'dist/js/secondary.js'
          ]
        }]
      }
    },
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      dist: {
        src: [
          'dist/js/main.js',
          'dist/js/secondary.js'
        ],
        dest: 'dist/js/final.js'
      }
    },
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function(connect, options) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['**', '!**/node_modules/**', '!**/dist/**', '!Gruntfile.js', '!README.md'],
          dest: 'dist/'
        }, ]
      }
    },
    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      combine: {
        files: {
          'dist/css/final.css': ['dist/css/final.css']
        }
      }
    },
    // https://github.com/blai/grunt-express
    express: {
      all: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['dist'],
          livereload: true
        }
      }
    },
    // https://github.com/gruntjs/grunt-contrib-htmlmin
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          minifyJS: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    // https://github.com/jsoverson/grunt-open
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },
    // https://www.npmjs.org/package/grunt-processhtml
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['index.html']
        }
      }
    },
    // https://www.npmjs.org/package/grunt-regarde
    regarde: {
      all: {
        files: ['index.html', 'css/**/*.css', 'css/**/*.scss', 'js/**/*.js'],
        tasks: ['livereload', 'sass']
      }
    },
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dist: {
        files: {
          'css/main.css': 'css/main.scss'
        }
      }
    },
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      dist: {
        files: {
          'dist/js/final.js': ['dist/js/final.js']
        }
      }
    },
    // https://github.com/addyosmani/grunt-uncss
    uncss: {
      dist: {
        files: {
          'dist/css/final.css': ['dist/index.html']
        }
      }
    },
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      all: {
        files: 'index.html',
        options: {
          livereload: true
        }
      }
    }
  });

  // register all the tasks
  grunt.registerTask('serve', [
    'livereload-start',
    'sass',
    'connect',
    'open',
    'regarde'
  ]);
  grunt.registerTask('dist', [
    'express',
    'open',
    'watch'
  ]);
  // GRUNT BUILD REDUCES THE LOAD FROM 25.5KB/719MS to 1.1KB/398MS
  grunt.registerTask('build', [
    // Sass, clean, and copy tasks
    'sass',
    'clean:begin',
    'copy',
    // JS focused tasks
    'concat',
    'uglify',
    // CSS focused tasks (grunt sass already executed)
    'uncss',
    'cssmin',
    // Image focused tasks
    'imagemin',
    // HTML focused tasks
    'processhtml',
    'htmlmin',
    // Final cleanup tasks
    'clean:end'
  ]);
  grunt.registerTask('test', [

  ]);

};