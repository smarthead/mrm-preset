const { packageJson } = require('mrm-core');

function task(config) {
    const pkg = packageJson();
    const {
        name: currentName,
        version: currentVersion,
        description: currentDescription,
        author: currentAuthor,
        private: currentPrivate,
        license: currentLicense,
        engines: currentEngines,
        scripts: currentScripts = {},
        dependencies: currentDependencies,
        devDependencies: currentDevDependencies,
        ...otherCurrentValues
    } = pkg.get();

    pkg.set({
        name: currentName || 'project-name',
        version: currentVersion || '0.1.0',
        description: currentDescription || '',
        author: currentAuthor || `${config.name} (${config.url})`,
        private: currentPrivate || true,
        license: currentLicense || config.license,
        engines: currentEngines || { node: `>=${config.minNode}` },
        scripts: {
            start: currentScripts.start || '',
            build: currentScripts.build || '',
            'build:prod': currentScripts['build:prod'] || '',
            'build:stage': currentScripts['build:stage'] || '',
            ...currentScripts,
        },
        dependencies: currentDependencies || {},
        devDependencies: currentDevDependencies || {},
        ...otherCurrentValues,
    });

    pkg.save();
}

task.description = 'Adds package.json';

module.exports = task;
