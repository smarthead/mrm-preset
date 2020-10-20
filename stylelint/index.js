const {
    json,
    packageJson,
    lines,
    install
} = require('mrm-core');

function task() {
    const packages = [
        'stylelint',
        'stylelint-order',
        'stylelint-scss',
        'git+https://git@gitlab.smarthead.ru/frontend-public/stylelint-config-sh.git'
    ];

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '.stylelintcache'
        ])
        .save();

    // Create or load package.json
    packageJson()
        .appendScript('lint', 'npm run lint:css')
        .appendScript('lint:fix', 'npm run lint:css:fix')
        .setScript('lint:css', 'stylelint --quiet --cache \"src/**/*.{css,scss}\"')
        .setScript('lint:css:fix', 'stylelint --quiet --cache --fix --config .stylelintrc-extended \"src/**/*.{css,scss}\"')
        .save();

    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add([
            '/node_modules',
            '/build',
            '**/*.js',
            '**/vendor/*',
            '**/*.vendor*'
        ])
        .save();

    // Create or load .stylelint
    json('.stylelintrc')
        .merge({
            extends: 'stylelint-config-sh',
            plugins: ['stylelint-scss'],
            rules: {}
        })
        .save();

    // Create or load .stylelint-extended
    json('.stylelintrc-extended')
        .merge({
            extends: 'stylelint-config-sh/extended',
            plugins: [
                'stylelint-scss',
                'stylelint-order'
            ],
            rules: {}
        })
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds stylelint';

module.exports = task;
