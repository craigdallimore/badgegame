module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-jst'

  grunt.initConfig
    dirs:
      base: 'static/'
      js:   'static/js/'
      app:  'static/js/App/'
      css:  'static/css/'
      scss: 'static/scss/'
      jade: 'static/jade/'
      jst:  'static/templates/'
      dist: 'static/dist/'

    # Styling
    compass:
      dist:
        options:
          config:  '<%= dirs.base %>config.rb'
          sassDir: '<%= dirs.scss %>'
          cssDir:  '<%= dirs.css %>'

    concat:
      css:
        src: [
          '<%= dirs.css %>base/reset.css'
          '<%= dirs.css %>base/common.css'
          '<%= dirs.css %>base/typography.css'
          '<%= dirs.css %>base/sprites.css'
          '<%= dirs.css %>layout/canvas.css'
          '<%= dirs.css %>layout/header.css'
          '<%= dirs.css %>layout/form.css'
          '<%= dirs.css %>modules/error.css'
          '<%= dirs.css %>modules/splash.css'
          '<%= dirs.css %>modules/splashbadge.css'
          '<%= dirs.css %>modules/score.css'
          '<%= dirs.css %>modules/horizon.css'
          '<%= dirs.css %>modules/navlist.css'
        ]
        dest: '<%= dirs.dist %>app.concat.css'

    cssmin:
      files:
        src: '<%= concat.css.dest %>'
        dest: '<%= dirs.dist %>app.min.css'

    #jade:
      #compile:
        #options:
          #pretty: true
        #files:
          #'404.html':           '<%= dirs.jade %>404.jade'
          #'index.html':         '<%= dirs.jade %>index.jade'
          #'getpoints.html':     '<%= dirs.jade %>getpoints.jade'
          #'login.html':         '<%= dirs.jade %>login.jade'
          #'register.html':      '<%= dirs.jade %>register.jade'
          #'resetpassword.html': '<%= dirs.jade %>resetpassword.jade'
          #'profile.html':       '<%= dirs.jade %>profile.jade'
          #'badges.html':        '<%= dirs.jade %>badges.jade'
          #'tests.html':         '<%= dirs.jade %>tests.jade'

    # JavaScript
    uglify:
      dev:
        options:
          sourceMap:        '<%= dirs.dist %>app.min.js.map'
          sourceMappingURL: '/<%= dirs.dist %>app.min.js.map'
          sourceMapRoot:    '/'
          mangle:           false
        files:
          '<%= dirs.dist %>app.min.js': [
            '<%= dirs.js %>mixin.js'
            '<%= dirs.app %>App.js'
            '<%= dirs.app %>Mixin/ValidationModel.js'
            '<%= dirs.app %>Mixin/ValidationView.js'
            '<%= dirs.app %>Mixin/RequestView.js'
            '<%= dirs.app %>Model/User.js'
            '<%= dirs.app %>Model/LoginUser.js'
            '<%= dirs.app %>Model/RegisterUser.js'
            '<%= dirs.app %>Model/ResetPasswordUser.js'
            '<%= dirs.app %>View/Header.js'
            '<%= dirs.app %>View/Login.js'
            '<%= dirs.app %>View/Register.js'
            '<%= dirs.app %>View/ResetPassword.js'
            '<%= dirs.app %>View/GetPoints.js'
            '<%= dirs.app %>Controller/Route.js'
            '<%= dirs.app %>App.Router.js'
            '<%= dirs.app %>App.Tmpl.js'
          ]

    jst:
      compile:
        options:
          processName: (path) ->
            path.replace('<% dirs.jst %>', '').replace('.html', '')

          templateSettings:
            interpolate: /\{\{(.+?)\}\}/g

          namespace: 'App.Tmpl'
          prettify:  true
        files:
          '<%= dirs.app %>App.Tmpl.js': ['<%= dirs.jst %>*.html']

    watch:
      scripts:
        files: '<%= dirs.js %>**/*.js'
        tasks: 'js'
      styles:
        files: '<%= concat.css.src %>'
        tasks: 'css'
      sass:
        files: '<%= dirs.scss %>**/*.scss'
        tasks: 'sass'
      templates:
        files: '<%= dirs.jst %>*.html'
        tasks: 'tmpl'

  grunt.registerTask 'dev',  ['js', 'css']
  grunt.registerTask 'js',   ['uglify']
  grunt.registerTask 'css',  ['concat:css', 'cssmin']
  grunt.registerTask 'sass', ['compass', 'css']
  grunt.registerTask 'tmpl', ['jst', 'js']
