const { json, packageJson, install } = require('mrm-core');

function task() {
    const pkg = packageJson();
    const isReact = !!pkg.get('dependencies.react-scripts');
    const packages = [
        'prettier',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
        'stylelint-prettier',
        'stylelint-config-prettier',
    ];

    // Create or load .eslintrc
    const eslintrc = json('.eslintrc');

    eslintrc.merge({
        extends: [
            'prettier',
            'prettier/@typescript-eslint',
        ],
        plugins: [
            'prettier',
        ],
        rules: {
            'prettier/prettier': 2,
        }
    });

    if (isReact) {
        eslintrc.merge({
            extends: [
                'prettier/react',
            ],
        });
    }

    eslintrc.save();

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
                true, {
                    tabWidth: 4,
                    singleQuote: false,
                }
            ]
        }
    };

    json('.stylelintrc')
        .merge(stylelintConfig)
        .save();

    json('.stylelintrc-extended')
        .merge(stylelintConfig)
        .save();

    // Create or load .prettierrc
    json('.prettierrc')
        .merge({
            tabWidth: 4,
            singleQuote: true,
        })
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds prettier';

module.exports = task;
