const { lines } = require('mrm-core');
const detectReact = require('../utils/detectReact.js');

function task() {
    const hasReact = detectReact();
    const browserslistrc = lines('.browserslistrc');

    if (browserslistrc.exists() || hasReact) {
        return;
    }

    browserslistrc.set([
        '[production]',
        '>0.2%',
        'not dead',
        'not op_mini all',
        'not ie 11',
        'not chrome < 83',
        'not iOS < 12',
        'not Safari < 13',
        '',
        '[development]',
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
    ]);

    browserslistrc.save();
}

module.exports.description = 'Adds browserslist';

module.exports = task;
