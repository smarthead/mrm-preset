const config = require('./config');
const {
    json,
    packageJson,
    install,
} = require('mrm-core');

function task() {
    const pkg = packageJson();
    const isReact = !!pkg.get('dependencies.react-scripts');
    const packages = {
        dependencies: [
            'typescript',
        ],
        devDependencies: [
            '@typescript-eslint/eslint-plugin',
            '@typescript-eslint/parser',
        ],
    };

    // Create or load tsconfig.json
    if (!isReact) {
        json('tsconfig.json')
            .merge(config)
            .save();
    }

    // Create or load .eslintrc
    json('.eslintrc')
        .merge({
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: '.',
            },
            plugins: [
                '@typescript-eslint',
            ],
        })
        .save();

    // Install npm dependencies
    if (!isReact) {
        install(packages.dependencies, { dev: false });
        install(packages.devDependencies);
    }
}

module.exports.description = 'Adds eslint';

module.exports = task;
