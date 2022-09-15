const { exec } = require('child_process');
const {
    packageJson,
    lines,
    install,
    json,
} = require('mrm-core');

function task() {
    const { styleSystem, jsFramework } = json('.mrm.config.json').get();

    const packages = [
        'lint-staged',
        'husky',
    ];

    // Create or load package.json
    const pkg = packageJson();

    const lintStaged = {};

    // if (jsFramework === 'React' || jsFramework === 'Create React App' || jsFramework === 'Next.js') {
    //     lintStaged['*.{js,jsx,ts,tsx}'] = [
    //         'eslint --quiet --cache --fix --config .eslintrc-project --ext .js,.jsx,.ts,.tsx',
    //     ];
    // } else {
    //     lintStaged['*.{js,ts}'] = [
    //         'eslint --quiet --cache --fix --ext .js,.ts',
    //     ];
    // }

    if (styleSystem === 'CSS') {
        lintStaged['*.css'] = [
            'stylelint --quiet --cache --fix --config .stylelintrc-extended',
        ];
    } else if (styleSystem === 'SCSS') {
        lintStaged['*.{css,scss}'] = [
            'stylelint --quiet --cache --fix --config .stylelintrc-extended',
        ];
    }

    pkg.merge({
        'lint-staged': lintStaged,
    });

    pkg.appendScript('lint:staged', 'lint-staged');
    pkg.appendScript('husky:install', 'npx husky install .husky');
    pkg.appendScript('husky:add', 'npx husky add .husky/pre-commit \"npm run lint:staged\" && git add .husky/pre-commit');
    pkg.appendScript('husky:uninstall', 'npm uninstall husky && git config --unset core.hooksPath && npx rimraf .husky');

    pkg.save();

    // Install npm dependencies
    install(packages);

    // Init Husky (for Husky 5+) and add a pre-commit hook
    // if (!lines('.husky/pre-commit').exists()) {
    //     console.log('Installing Husky and git hooks...\n');

    //     exec(
    //         'npm run husky:install && npm run husky:add',
    //         (error, stdout, stderr) => {
    //             if (error) {
    //                 console.error(`exec error: ${error}`);
    //                 return;
    //             }

    //             console.log(stdout);
    //             console.error(stderr);
    //         },
    //     );
    // }
}

module.exports.description = 'Adds husky and lint-staged';

module.exports = task;
