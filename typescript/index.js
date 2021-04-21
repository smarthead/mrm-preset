const config = require('./config');
const { json, install } = require('mrm-core');
const detectReact = require('../utils/detectReact.js');

function task() {
    const hasReact = detectReact();
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
    if (!hasReact) {
        json('tsconfig.json')
            .merge(config)
            .save();
    }

    // Create or load .eslintrc
    const eslintrcFilename = (hasReact) ? '.eslintrc-project' : '.eslintrc';
    const eslintrc = json(eslintrcFilename);

    eslintrc
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
        });

    eslintrc.save();

    // Install npm dependencies
    if (!hasReact) {
        install(packages.dependencies, { dev: false });
        install(packages.devDependencies);
    }
}

module.exports.description = 'Adds eslint';

module.exports = task;
