const config = require('./config');
const { json, install } = require('mrm-core');
const detectReact = require('../utils/detectReact.js');

function task(presetConfig) {
    const hasReact = detectReact();
    const packages = [
        'prettier',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
    ];

    // Create or load .prettierrc
    json('.prettierrc')
        .merge(config.js)
        .save();

    // Eslint
    // --------------------------------

    // Create or load .eslintrc
    const eslintrcFilename = (hasReact) ? '.eslintrc-project' : '.eslintrc';
    const eslintrc = json(eslintrcFilename);

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

    eslintrc.save();

    // Stylelint
    // --------------------------------

    if (presetConfig.styles === 'css' || presetConfig.styles === 'scss') {
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
                    config.css,
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
