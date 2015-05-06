module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            build: {
                src: 'js/*.js',
                dest: 'js/build/global.min.js'
            }
        },
        
        sass: {
            options: {
                outputStyle: 'compressed',
            },
            dist: {
                files: {    
                    'css/unprefixed/full.css': 'sass/full.scss',
                    'css/unprefixed/gallery.css': 'sass/gallery.scss',
                    'css/unprefixed/index.css': 'sass/index.scss',
                    'css/unprefixed/sidebar.css': 'sass/sidebar.scss',
                }
            }
        },
                
        autoprefixer: {
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/unprefixed/*.css',
                dest: 'css/'
            },
        },
        
        shell: {
            jekyllServe: {
                command: "jekyll serve --no-watch"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        },
        
        open : {
            build: {
                path: 'http://localhost:4000'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            site: {
                files: ["*.html", "**/*.html", "*.md", "**/*.md", "**/*.yml", "*.yml", "!_site/*.*", "!_site/**/*.*"],
                tasks: ["shell:jekyllBuild"]
            },
            js: {
                files: ["js/*.js"],
                tasks: ["uglify", "shell:jekyllBuild"]
            },
            css: {
                files: ["sass/*.scss", "sass/**/*.scss", "sass/**/**/*.scss"],
                tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
            }
        }
    });
    
    require('load-grunt-tasks')(grunt);
    
    // Default task(s).
    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask("default", ["sass", "autoprefixer", "shell:jekyllBuild", "open", "watch"]);
};
