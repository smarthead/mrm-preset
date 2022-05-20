const { lines } = require('mrm-core');

function task() {
    lines('.gitignore')
        .add([
            '#',
            '/node_modules',
            '/build',
            '/.idea',
            '/.vscode',
            '*.local',
            '*.log',
            '*.log*',
            '.eslintcache',
        ])
        .save();
}

task.description = 'Adds .gitignore';

module.exports = task;
