const { packageJson } = require('mrm-core');

function task({
    name,
    url,
    license,
    minNode,
    minNpm
}) {
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
        version: currentVersion || '1.0.0',
        description: currentDescription || '',
        author: currentAuthor || `${name} (${url})`,
        private: currentPrivate || true,
        license: currentLicense || license,
        engines: currentEngines || { node: `>=${minNode}`, npm: `>=${minNpm}` },
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
