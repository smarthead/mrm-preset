const { json } = require('mrm-core');

const task = ({ styleSystem }) => {
    json('.mrm.temporary.json')
        .merge({
            styleSystem,
        })
        .save();
}

task.description = 'Init mrm preset';

task.parameters = {
    styleSystem: {
        type: 'list',
        message: 'Which style system will you be using?',
        choices: ['CSS', 'SCSS', 'CSS-in-JS'],
        default: 'CSS',
    },
};

module.exports = task;
