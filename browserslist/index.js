const { lines, packageJson } = require('mrm-core');

const task = () => {
    const browserslistrc = lines('.browserslistrc');
    const pkg = packageJson();

    const { browserslist: pkgBrowserslist } = pkg.get();

    if (browserslistrc.exists() || pkgBrowserslist) {
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
