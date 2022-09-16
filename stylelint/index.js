const { json, packageJson, lines, install } = require('mrm-core');

const getConfig = require('./utils/getConfig');

const task = () => {
    const { styleSystem } = json('.mrm.config.json').get();

    const packages = {
        CSS: ['stylelint', 'stylelint-order', 'stylelint-config-standard'],
        SCSS: [
            'stylelint',
            'stylelint-order',
            'stylelint-scss',
            'stylelint-config-standard',
            'stylelint-config-recommended-scss',
        ],
    };

    // TODO: Add CSS-in-JS (Styled Components, JSS, Emotion)
    if (styleSystem === 'CSS-in-JS') {
        return;
    }

    // Add rules to .gitignore
    lines('.gitignore').add(['.stylelintcache']).save();

    // Create or load package.json
    const stylelintPattern =
        styleSystem === 'SCSS' ? 'src/**/*.{css,scss}' : 'src/**/*.css';

    packageJson()
        .appendScript('lint', 'npm run lint:css')
        .appendScript('lint:fix', 'npm run lint:css:fix')
        .setScript(
            'lint:css',
            `stylelint --quiet --cache --allow-empty-input \"${stylelintPattern}\"`,
        )
        .setScript(
            'lint:css:fix',
            `stylelint --quiet --cache --allow-empty-input --fix --config .stylelintrc-extended \"${stylelintPattern}\"`,
        )
        .save();

    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add(['/node_modules', '/build', '**/vendor/*', '**/*.vendor.*'])
        .save();

    // Create or load .stylelintrc
    json('.stylelintrc').merge(getConfig(styleSystem)).save();

    json('.stylelintrc-extended').merge(getConfig(styleSystem, true)).save();

    // Install packages
    install(packages[styleSystem]);
};

task.description = 'Adds stylelint';

module.exports = task;
