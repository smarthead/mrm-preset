const { lines, packageJson } = require('mrm-core');

function task() {
    const browserslistrc = lines('.browserslistrc');
    const pkg = packageJson();
    const isReact = !!pkg.get('dependencies.react-scripts');

    if (browserslistrc.exists() || isReact) {
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
