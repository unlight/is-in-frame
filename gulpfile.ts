/* eslint-disable */
/// <reference path="node_modules/typescript/lib/lib.esnext.d.ts" />
import * as gulp from 'gulp';
import { resolve } from 'path';
const g = require('gulp-load-plugins')();

gulp.task('remark', function() {
    return gulp.src('README.md')
        .pipe(
            g.remark()
                .use(require('remark-toc'))
                .use(require('remark-license'))
        );
});

gulp.task('remark:update', function(done) {
    const remark: any = gulp.task('remark');
    return remark().pipe(gulp.dest('.'));
});

gulp.task('eslint', () => {
    const specRules = {
        'no-unused-vars': 0,
        'no-underscore-dangle': 0,
        'max-nested-callbacks': 0,
        'function-paren-newline': 0,
        'jasmine/no-spec-dupes': 0,
        'lodash/import-scope': 0,
        'prefer-const': 0,
        'prefer-destructuring': 0,
        'import/no-duplicates': 0,
        'import/max-dependencies': 0,
        '@typescript-eslint/tslint/config': 0,
    };
    return gulp.src('src/**/*.ts', { since: g.memoryCache.lastMtime('source') })
        .pipe(g.memoryCache('source'))
        .pipe(g.ignore.exclude('*.d.ts'))
        .pipe(g.if('*.spec.ts', g.eslint({ rules: specRules }), g.eslint()))
        .pipe(g.eslint.format());
});

gulp.task('eslint:w', (done) => {
    const w = gulp.watch('src/**/*.ts', { ignoreInitial: false }, gulp.series('eslint'));
    w.on('change', g.memoryCache.update('source'));
    w.on('unlink', file => g.memoryCache.forget('source', file, file => resolve(file)));
    process.on('SIGINT', () => {
        w.close();
        done();
    });
});
