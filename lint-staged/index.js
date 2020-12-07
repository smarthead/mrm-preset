const {
    packageJson,
    lines,
    install,
} = require('mrm-core');

function task({ eslintPreset }) {
    // Define packages to install
    const packages = [
        'lint-staged',
        'husky@next'
    ];

    // Create or load package.json
    const pkg = packageJson();

    pkg.merge({
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
    });

    pkg.appendScript('lint-staged', 'lint-staged');

    pkg.save();

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '/.husky'
        ])
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds lint-staged and husky';

module.exports = task;
