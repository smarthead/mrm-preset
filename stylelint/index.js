const {
    json,
    packageJson,
    lines,
    install,
} = require('mrm-core');

const getPackages = require('./utils/getPackages');
const getConfig = require('./utils/getConfig');

const task = ({ styleSystem }) => {
    const packages = getPackages(styleSystem);

    console.log(styleSystem);

    // TODO: Add CSS-in-JS (Styled Components, JSS, Emotion)
    if (styleSystem === 'CSS-in-JS') {
        return;
    }

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '.stylelintcache',
        ])
        .save();

    // Create or load package.json
    const extensions = styleSystem === 'CSS' ? 'css' : '{css,scss}';

    packageJson()
        .appendScript('lint', 'npm run lint:css')
        .appendScript('lint:fix', 'npm run lint:css:fix')
        .setScript(
            'lint:css',
            `stylelint --quiet --cache --allow-empty-input \"src/**/*.${extensions}\"`,
        )
        .setScript(
            'lint:css:fix',
            `stylelint --quiet --cache --allow-empty-input --fix --config .stylelintrc-extended \"src/**/*.${extensions}\"`,
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
        .merge(getConfig(styleSystem))
        .save();

    json('.stylelintrc-extended')
        .merge(getConfig(styleSystem, true))
        .save();

    // Install packages
    install(packages);
}

task.parameters = {
    styleSystem: {
        type: 'list',
        message: 'Which style system will you be using?',
        choices: ['CSS', 'SCSS', 'CSS-in-JS'],
        default: 'CSS',
    },
};

task.description = 'Adds stylelint';

module.exports = task;
