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
        '@smarthead/stylelint-config'
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
            extends: [
                '@smarthead/stylelint-config',
            ],
            plugins: ['stylelint-scss'],
            rules: {}
        })
        .save();

    // Create or load .stylelint-extended
    json('.stylelintrc-extended')
        .merge({
            extends: [
                '@smarthead/stylelint-config/extended',
            ],
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
