const { packageJson } = require('mrm-core');

function task({
    projectName,
    version,
    description,
    private,
    minNode,
    minNpm
}) {
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
        engines: currentEngines || { node: `>=${minNode}`, npm: `>=${minNpm}` },
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

task.parameters = {
    projectName: {
        type: 'input',
        message: 'Project name (one lowercase word, may contain hyphens and underscores)',
    },
    version: {
        type: 'config',
        default: '0.1.0'
    },
    description: {
        type: 'config',
        default: ''
    },
    private: {
        type: 'config',
        default: true,
    },
    minNode: {
        type: 'config',
        default: '16',
    },
    minNpm: {
        type: 'config',
        default: '8',
    },
};

task.description = 'Adds package.json';

module.exports = task;
