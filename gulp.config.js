"use strict";

module.exports = function () {
    var config = {
        appRoot: "app",
        appScripts: "app/**/*.ts",
        css: {
            files: [
                "node_modules/bootstrap/**/*.min.css",
                "node_modules/dc/*.min.css",
                "dist/**/adap-charts.css"
            ]
        },
        js: {
            files: [
                "node_modules/*/release/*.min.js",
                "node_modules/*/build/*.min.js",
                "node_modules/angular-nvd3/dist/*.min.js",
                "node_modules/bootstrap/dist/*.min.js",
                "node_modules/jquery/dist/*.min.js",
                "dist/*.js"
            ]
        },
        html: {
            sourceFiles: "lib/**/*.html",
            index: "index.html",
            templates: "lib/**/*.html",
            minifyConfig: {
                quotes: true,
                spare: true,
                empty: true,
                cdata: true
            },
            destPath: "dist"
        },
        // sourceFiles for tslint
        lintFiles: ["lib/**/*.ts", "app/**/*.ts", "test/**/*Spec.ts"],
        testFiles: ["typings/globals/**/index.d.ts", "test/**/*.ts"],
        paths: {
            appRoot: "app",
            html: "lib/**/*.html",
            index: "index.html",
            less: "lib/**/*.less",
            ts: "lib/**/*.ts",
            dest: "dist",
            test: "test",
            typings: "dist/typings"
        },
        ts: {
            moduleFile: "app.module.ts",
            definitionFiles: "dist/typings/*.d.ts",
            sourceFiles: "dist/*.ts"
        },
        watchDelay: 1000
    };
    return config;
}
