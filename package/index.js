const { json, packageJson } = require('mrm-core');

const task = () => {
    const {
        projectName,
        version,
        description,
        private,
        minNode,
        minNpm,
    } = json('.mrm.config.json').get();

    const pkg = packageJson();

    const {
        name: currentName,
        version: currentVersion,
        description: currentDescription,
        private: currentPrivate,
        engines: currentEngines,
        scripts: currentScripts = {},
        dependencies: currentDependencies,
        devDependencies: currentDevDependencies,
        ...otherCurrentProps
    } = pkg.get();

    pkg.set({
        name: projectName || currentName || 'new-project',
        version: currentVersion || version,
        description: currentDescription || description,
        private: currentPrivate || private,
        engines: currentEngines || { node: `^${minNode}`, npm: `^${minNpm}` },
        scripts: {
            start: currentScripts.start || '',
            build: currentScripts.build || '',
            'build:development': '',
            'build:stage': '',
            'build:production': '',
            ...currentScripts,
        },
        dependencies: currentDependencies || {},
        devDependencies: currentDevDependencies || {},
        ...otherCurrentProps,
    });

    pkg.save();
}

task.description = 'Adds package.json';

module.exports = task;
