const { packageJson } = require('mrm-core');

function defineReact () {
    const pkg = packageJson();

    return !!(
        pkg.get('dependencies.react-scripts') || pkg.get('dependencies.react-dom') || pkg.get('dependencies.react') ||
        pkg.get('devDependencies.react-scripts') || pkg.get('devDependencies.react-dom') || pkg.get('devDependencies.react')
    );
}

module.exports = defineReact;
