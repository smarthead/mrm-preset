const { lines } = require('mrm-core');

function task() {
    lines('.gitattributes')
        .add(['* text=auto eol=lf'])
        .save();
}

task.description = 'Adds .gitattributes';

module.exports = task;
