const { packageJson } = require('mrm-core');

function task(config) {
    const pkg = packageJson();
    const values = pkg.get();

    // Add rules
    if (!values.name) {
        // TODO: Get the folder name
        pkg.set('name', 'project-name');
    }

    if (!values.version) {
        pkg.set('version', '0.1.0');
    }

    if (!values.description) {
        pkg.set('description', '');
    }

    if (!values.author) {
        pkg.set('author', `${config.name} (${config.url})`);
    }

    if (values.private === undefined) {
        pkg.set('private', true);
    }

    if (!values.license) {
        pkg.set('license', config.license);
    }

    if (!values.engines) {
        pkg.set('engines', {
            node: `>=${config.minNode}`
        });
    }

    // Add scripts
    pkg.appendScript('start', '');
    pkg.appendScript('build', '');
    pkg.appendScript('build:prod', '');
    pkg.appendScript('build:stage', '');

    // Add dependencies
    // The string type is a hack for save an order of properties
    if (!values.dependencies) {
        pkg.set('dependencies', "");
    }

    if (!values.devDependencies) {
        pkg.set('devDependencies', "");
    }

    pkg.save();
}

task.description = 'Adds package.json';

module.exports = task;
