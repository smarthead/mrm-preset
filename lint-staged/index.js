const { exec } = require('child_process');
const { packageJson, lines, install, json } = require('mrm-core');

function task() {
    const { styleSystem, jsFramework, typescript } =
        json('.mrm.config.json').get();

    const packages = ['lint-staged', 'husky'];

    const isReactApp =
        jsFramework === 'React' ||
        jsFramework === 'Create React App' ||
        jsFramework === 'Next.js' ||
        jsFramework === 'Gatsby';
    const isTypeScript = typescript === 'Yes';

    const lintStaged = {};

    // ESLint
    const eslintExtensions = ['js'];

    if (isReactApp) {
        eslintExtensions.push('jsx');
    }

    if (isTypeScript) {
        eslintExtensions.push('ts');

        if (isReactApp) {
            eslintExtensions.push('tsx');
        }
    }

    const eslintPattern =
        eslintExtensions.length > 1
            ? '*.{' + eslintExtensions.join() + '}'
            : '*.' + eslintExtensions[0];

    lintStaged[eslintPattern] = [
        'eslint --quiet --cache --fix --ext .' + eslintExtensions.join(',.'),
    ];

    // Stylelint
    if (styleSystem === 'CSS' || styleSystem === 'SCSS') {
        const stylelintPattern =
            styleSystem === 'SCSS' ? '*.{css,scss}' : '*.css';

        lintStaged[stylelintPattern] = [
            'stylelint --quiet --cache --fix --config .stylelintrc-extended',
        ];
    }

    // Create or load package.json
    const pkg = packageJson();

    pkg.merge({
        'lint-staged': lintStaged,
    });

    pkg.appendScript('lint:staged', 'lint-staged');
    pkg.appendScript('husky:install', 'npx husky install .husky');
    pkg.appendScript(
        'husky:add',
        'npx husky add .husky/pre-commit "npm run lint:staged" && git add .husky/pre-commit',
    );
    pkg.appendScript(
        'husky:uninstall',
        'npm uninstall husky && git config --unset core.hooksPath && npx rimraf .husky',
    );

    pkg.save();

    // Install npm dependencies
    install(packages);

    // Init Husky and add pre-commit hook
    if (!lines('.husky/pre-commit').exists()) {
        console.log('Installs husky and git hooks...\n');

        exec(
            'npm run husky:install && npm run husky:add',
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }

                console.log(stdout);
                console.error(stderr);
            },
        );
    }
}

module.exports.description = 'Adds husky and lint-staged';

module.exports = task;
