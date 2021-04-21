const prettierConfig = require('./config');
const { json, packageJson, install } = require('mrm-core');

function task(config) {
    const packages = [
        'prettier',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
    ];

    // Create or load .prettierrc
    json('.prettierrc')
        .merge(prettierConfig.js)
        .save();

    // Eslint
    // --------------------------------

    // Create or load .eslintrc
    const eslintrc = json('.eslintrc');
    const eslintrcExtended = json('.eslintrc-extended');

    eslintrc.merge({
        extends: [
            'prettier',
        ],
        plugins: [
            'prettier',
        ],
        rules: {
            'prettier/prettier': 2,
        },
    });

    eslintrcExtended.merge({
        extends: [
            'prettier',
        ],
    });

    eslintrc.save();
    eslintrcExtended.save();

    // Stylelint
    // --------------------------------

    if (config.styles === 'css' || config.styles === 'scss') {
        // Add stylelint-prettier packages
        packages.push([
            'stylelint-prettier',
            'stylelint-config-prettier',
        ]);

        // Create or load .stylelintrc
        const stylelintConfig = {
            extends: [
                'stylelint-prettier/recommended',
            ],
            plugins: [
                'stylelint-prettier',
            ],
            rules: {
                'prettier/prettier': [
                    true,
                    prettierConfig.css,
                ],
            },
        };

        json('.stylelintrc')
            .merge(stylelintConfig)
            .save();

        json('.stylelintrc-extended')
            .merge(stylelintConfig)
            .save();
    }

    // Install npm dependencies
    install(packages);
}

module.exports.description = 'Adds prettier';

module.exports = task;
