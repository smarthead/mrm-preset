const { lines } = require('mrm-core');

function task() {
    lines('.gitignore')
        .add([
            '#',
            '/node_modules',
            '/build',
            '/.idea',
            '*.local',
            '*.log',
            '*.log*',
            '/.sass-cache',
        ])
        .save();
}

task.description = 'Adds .gitignore';

module.exports = task;
