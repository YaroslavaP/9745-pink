"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    uglify: {
      minjs: {
        files: {
          "source/js/scripts-min.js": ["source/js/scripts.js"]
        }
      }
    },
    clean: {
      build: ["build"]
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
          "fonts/**/*.{woff,woff2}",
          "img/**",
          "js/*.js"
          ],
          dest: "build"
        }]
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["build/img/*.{png,jpg,gif}"]
        }]
      }
    },
    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["build/img/*.{png,jpg}"]
        }]
      }
    },
    svgstore: {
      options: {
        includeTitleElement: false,
      },
      sprite: {
        files: {
          "build/img/svg-icon/svg-sprite.svg": ["build/img/svg-icon/**/*.svg"]
        }
      }
    },
    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source/",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },
    postcss: {
      options: {
        processors: [
        require("autoprefixer")({browsers:["last 2 versions"]}),
        require("css-mqpacker")({
          sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style-min.css": ["build/css/style.css"]
        }
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true
        }
      }
    },
    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      stylejs: {
        files: ["source/js/*.js"],
        tasks: ["uglify", "clean", "copy", "imagemin", "cwebp", "svgstore", "posthtml", "less", "postcss", "csso"]
      },
      styleimg: {
        files: ["source/img/**"],
        tasks: ["uglify", "clean", "copy", "imagemin", "cwebp", "svgstore", "posthtml", "less", "postcss", "csso"]
      },
      stylefonts: {
        files: ["source/fonts/**"],
        tasks: ["uglify", "clean", "copy", "imagemin", "cwebp", "svgstore", "posthtml", "less", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", [
    "uglify",
    "clean",
    "copy",
    "imagemin",
    "cwebp",
    "svgstore", 
    "posthtml",
    "less",
    "postcss",
    "csso",
    "browserSync",
    "watch"
  ]);

  grunt.registerTask("build", [
    "uglify",
    "clean",
    "copy",
    "imagemin",
    "cwebp",
    "svgstore", 
    "posthtml",
    "less",
    "postcss",
    "csso"
  ]);
};
