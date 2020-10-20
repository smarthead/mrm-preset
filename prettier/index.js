const { json, install } = require('mrm-core');

function task() {
    const packages = [
        'prettier',
        'eslint-config-prettier',
        'eslint-plugin-prettier'
    ];

    // Create or load .eslintrc
    json('.eslintrc')
        .merge({
            extends: [
                'prettier'
            ],
            plugins: [
                'prettier'
            ],
            rules: {
                'prettier/prettier': 2
            }
        })
        .save();

    // Create or load .prettierrc
    json('.prettierrc')
        .merge({
            tabWidth: 4,
            singleQuote: true
        })
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds prettier';

module.exports = task;
