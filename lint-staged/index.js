const {
    packageJson,
    install
} = require('mrm-core');

function task({ eslintPreset }) {
    // Define packages to install
    const packages = [
        'lint-staged',
        'husky'
    ];

    // Create or load package.json
    packageJson()
        .merge({
            husky: {
                hooks: {
                    'pre-commit': 'lint-staged'
                }
            },
            'lint-staged': {
                '*.{js,jsx,ts,tsx}': [
                    'eslint --quiet --cache --fix --ext .js,.jsx,.ts,.tsx',
                    'git add'
                ],
                '*.{css,scss}': [
                    'stylelint --quiet --cache --fix --config .stylelintrc-extended',
                    'git add'
                ]
            }
        })
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds lint-staged and husky';

module.exports = task;
