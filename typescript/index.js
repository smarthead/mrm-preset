const config = require('./config');
const {
    json,
    packageJson,
    install,
} = require('mrm-core');

function task() {
    const pkg = packageJson();
    const isReact = !!pkg.get('dependencies.react-scripts');
    const packages = [
        'typescript',
    ];
    const packagesDev = [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
    ];

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

    // Install new npm dependencies
    if (!isReact) {
        install(packages, {dev: false});
        install(packagesDev);
    }
}

module.exports.description = 'Adds eslint';

module.exports = task;
