const { packageJson } = require('mrm-core');

const task = () => {
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
        name: currentName,
        version: currentVersion,
        description: currentDescription,
        private: currentPrivate,
        engines: currentEngines,
        scripts: currentScripts,
        dependencies: currentDependencies,
        devDependencies: currentDevDependencies,
        ...otherCurrentProps,
    });

    pkg.save();
}

task.description = 'Sorts package.json';

module.exports = task;
