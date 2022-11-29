const { lines } = require('mrm-core');

const task = () => {
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
        ])
        .save();
};

task.description = 'Adds .gitignore';

module.exports = task;
