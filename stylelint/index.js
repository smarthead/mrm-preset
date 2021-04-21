const config = require('./config');
const {
    json,
    packageJson,
    lines,
    install,
} = require('mrm-core');

function task(config) {
    const packages = [
        'stylelint',
        'stylelint-order',
        'stylelint-scss',
        'stylelint-config-standard',
        'stylelint-config-recommended-scss',
    ];

    // Only for CSS or SCSS
    if (config.styles !== 'css' && config.styles !== 'scss') {
        return;
    }

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '.stylelintcache',
        ])
        .save();

    // Create or load package.json
    packageJson()
        .appendScript('lint', 'npm run lint:css')
        .appendScript('lint:fix', 'npm run lint:css:fix')
        .setScript(
            'lint:css',
            'stylelint --quiet --cache --allow-empty-input \"src/**/*.{css,scss}\"',
        )
        .setScript(
            'lint:css:fix',
            'stylelint --quiet --cache --allow-empty-input --fix --config .stylelintrc-extended \"src/**/*.{css,scss}\"',
        )
        .save();

    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add([
            '/node_modules',
            '/build',
            '**/*.js',
            '**/vendor/*',
            '**/*.vendor*',
        ])
        .save();

    // Create or load .stylelintrc
    json('.stylelintrc')
        .merge({
            extends: [
                'stylelint-config-standard',
                'stylelint-config-recommended-scss',
            ],
            plugins: [
                'stylelint-scss',
            ],
            rules: config.rules.basic,
        })
        .save();

    // Create or load .stylelint-extended
    json('.stylelintrc-extended')
        .merge({
            extends: [
                'stylelint-config-standard',
                'stylelint-config-recommended-scss',
            ],
            plugins: [
                'stylelint-scss',
                'stylelint-order',
            ],
            rules: {
                ...config.rules.basic,
                ...config.rules.extended,
            },
        })
        .save();

    // Install npm dependencies
    install(packages);
}

module.exports.description = 'Adds stylelint';

module.exports = task;
