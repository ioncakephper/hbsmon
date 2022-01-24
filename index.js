#!/usr/bin/env node

const { exec }  = require('child_process')
const program   = require('commander')
const fileEasy  = require('file-easy')
const fs        = require('fs')
const path      = require('path')

program
    .description('Monitor .hbs file changes and run .js script when changes occur.')
    .name('hbsmon')
    .version(require('./package.json').version)

program
    .arguments('<hbsfile> [jsToRun]')
    .action((hbsfile, jsToRun, options, commander) => {
        hbsfile = fileEasy.setDefaultExtension(hbsfile, '.hbs')
        jsToRun = (!jsToRun) ? path.basename(hbsFile, path.extname(hbsfile)) : jsToRun;
        jsToRun = fileEasy.setDefaultExtension(jsToRun, '.js')
    
        fs.watch(hbsfile, (event, filename) => {
            if(filename) {
                console.log(`${hbsfile} changed...`)
                exec(`node ${jsToRun}`, (error, stdout, stderr) => {
                })
            }
        })
    })

program.parse()