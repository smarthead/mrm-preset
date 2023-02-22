const { json, packageJson, lines, install } = require('mrm-core');

const getConfig = require('./utils/getConfig');

const task = () => {
    const { styleSystem } = json('.mrm.config.json').get();

    const core = ['stylelint'];

    const extensions = {
        CSS: ['stylelint-config-standard'],
        SCSS: ['stylelint-config-standard-scss'],
    };

    // TODO: Could we switch stylelint-order to stylelint-config-idiomatic-order ?
    const plugins = {
        CSS: ['stylelint-order'],
        SCSS: ['stylelint-order'],
    };

    // TODO: Add CSS-in-JS (Styled Components, JSS, Emotion)
    if (styleSystem === 'CSS-in-JS') {
        return;
    }

    // Add rules to .gitignore
    lines('.gitignore').add(['.stylelintcache']).save();

    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add(['/node_modules', '/build', '**/vendor/*', '**/*.vendor.*'])
        .save();

    // Add scripts to package.json
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

    // Create or load .stylelintrc
    json('.stylelintrc')
        .merge(getConfig(extensions[styleSystem]))
        .save();

    json('.stylelintrc-extended')
        .merge(getConfig(extensions[styleSystem], plugins[styleSystem], true))
        .save();

    // Install packages
    install(core);
    install(extensions[styleSystem]);
    install(plugins[styleSystem]);
};

task.description = 'Adds stylelint';

module.exports = task;
