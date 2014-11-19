/*
 * gulp-stubby
 * https://github.com/felixzapata/gulp-stubby
 *
 * Copyright (c) 2014 Felix Zapata
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stubby = require('./index.js'),
    clean = require('gulp-clean'),
    nodeunit = require('gulp-nodeunit');


gulp.task('jshint', function () {
    var options = {
        jshintrc: '.jshintrc'
    };
    return gulp.src([
        'gulpfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
    ])
        .pipe(jshint(options));
});

gulp.task('stubby', function (cb) {
    var options = {
        stubs: 8000,
        tls: 8443,
        admin: 8001,
        persistent: false,
        files: [
            'test/fixtures/*.{json,yaml,js}'
        ]
    };
    return stubby(options, cb);
});


gulp.task('nodeunit', ['stubby'], function () {
    return gulp.src('test/test.js').pipe(nodeunit()).on('end', function () {
        process.nextTick(function () {
            process.exit(0);
        });
    });
});

gulp.task('default', ['stubby', 'jshint']);
