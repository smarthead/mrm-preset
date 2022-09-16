const { json, lines } = require('mrm-core');

const task = () => {
    const { jsFramework } = json('.mrm.config.json').get();
    const browserslistrc = lines('.browserslistrc');

    if (jsFramework === 'Create React App' || browserslistrc.exists()) {
        return;
    }

    browserslistrc.set([
        '[production]',
        '>0.2%',
        'not dead',
        'not op_mini all',
        'not ie 11',
        'not chrome < 90',
        'not iOS < 12',
        'not Safari < 13',
        '',
        '[development]',
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
    ]);

    browserslistrc.save();
};

task.description = 'Adds browserslist';

module.exports = task;
