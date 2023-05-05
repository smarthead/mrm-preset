const { lines, packageJson } = require('mrm-core');

const task = () => {
    const browserslistrc = lines('.browserslistrc');
    const pkg = packageJson();

    const { browserslist: pkgBrowserslist } = pkg.get();

    if (browserslistrc.exists() || pkgBrowserslist) {
        return;
    }

    pkg.set('browserslist', [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'not iOS < 14',
        'not Safari < 14',
    ]);

    pkg.save();

    // browserslistrc.set([
    //     '[production]',
    //     '>0.2%',
    //     'not dead',
    //     'not iOS < 14',
    //     'not op_mini all',
    //     '',
    //     '[development]',
    //     'last 2 chrome version',
    //     'last 2 firefox version',
    //     'last 2 safari version',
    // ]);

    // browserslistrc.save();
};

task.description = 'Adds browserslist';

module.exports = task;
