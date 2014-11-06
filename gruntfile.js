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
                command: "jekyll serve"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        },
        
        watch: {
            options: {
                livereload: true
            },
            site: {
                files: ["*.html", "*.md", "_layouts/*.html", "_includes/*.html"],
                tasks: ["shell:jekyllBuild"]
            },
            js: {
                files: ["js/*.js"],
                tasks: ["uglify", "shell:jekyllBuild"]
            },
            css: {
                files: ["sass/*.scss", "sass/partials/*.scss", "sass/modules/*.scss"],
                tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
            }
        },

        
        
        
    });
    
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-shell');
    
    // Default task(s).
    
    grunt.registerTask("serve", ["shell:jekyllServe"]);
    grunt.registerTask("default", ["uglify", "sass", "autoprefixer", "shell:jekyllBuild", "watch"]);
    
};
