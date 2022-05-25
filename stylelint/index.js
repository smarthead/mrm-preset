const config = require('./config');
const {
    json,
    packageJson,
    lines,
    install,
} = require('mrm-core');

function task({ styleSystem }) {
    const packages = [
        'stylelint',
        'stylelint-order',
        // 'stylelint-scss',
        'stylelint-config-standard',
        // 'stylelint-config-recommended-scss',
    ];

    // TODO: Add CSS-in-JS (Styled Components, JSS, Emotion)
    if (styleSystem === 'CSS-in-JS') {
        return;
    }

    // This block only for CSS or SCSS

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
            'stylelint --quiet --cache --allow-empty-input \"src/**/*.{css}\"',
        )
        .setScript(
            'lint:css:fix',
            'stylelint --quiet --cache --allow-empty-input --fix --config .stylelintrc-extended \"src/**/*.{css}\"',
        )
        .save();

    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add([
            '/node_modules',
            '/build',
            '**/vendor/*',
            '**/*.vendor*',
        ])
        .save();

    // Create or load .stylelintrc
    json('.stylelintrc')
        .merge({
            extends: [
                'stylelint-config-standard'//,
                // 'stylelint-config-recommended-scss',
            ],
            plugins: [
                // 'stylelint-scss',
            ],
            rules: config.rules.basic,
        })
        .save();

    // Create or load .stylelint-extended
    json('.stylelintrc-extended')
        .merge({
            extends: [
                'stylelint-config-standard'//,
                // 'stylelint-config-recommended-scss',
            ],
            plugins: [
                // 'stylelint-scss',
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

task.parameters = {
    styleSystem: {
        type: 'list',
        message: 'Which style system will you be using?',
        choices: ['CSS', 'SCSS', 'CSS-in-JS'],
        default: 0,
    },
};

task.description = 'Adds stylelint';

module.exports = task;
