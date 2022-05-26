const { packageJson } = require('mrm-core');

function detectReact () {
    const pkg = packageJson();
    const dependencies = pkg.get('dependencies');
    const devDependencies = pkg.get('devDependencies');

    return !!(
        dependencies['react-scripts'] || dependencies['react-dom'] || dependencies['react'] ||
        devDependencies['react-scripts'] || devDependencies['react-dom'] || devDependencies['react']
    );
}

module.exports = detectReact;
