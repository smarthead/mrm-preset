const { exec } = require('child_process');
const {
    packageJson,
    lines,
    install,
    json,
} = require('mrm-core');

function task() {
    const mrmConfig = json('.mrm.config.json').get();

    console.log(mrmConfig);

    // const hasReact = detectReact();
    // const packages = [
    //     'lint-staged',
    //     'husky',
    // ];

    // Create or load package.json
    // const pkg = packageJson();
    // const lintStaged = {};

    // if (hasReact) {
    //     lintStaged['*.{js,jsx,ts,tsx}'] = [
    //         'eslint --quiet --cache --fix --config .eslintrc-project --ext .js,.jsx,.ts,.tsx',
    //     ];
    // } else {
    //     lintStaged['*.{js,ts}'] = [
    //         'eslint --quiet --cache --fix --ext .js,.ts',
    //     ];
    // }

    // if (config.styles === 'css' || config.styles === 'scss') {
    //     lintStaged['*.{css,scss}'] = [
    //         'stylelint --quiet --cache --fix --config .stylelintrc-extended',
    //     ];
    // }

    // pkg.merge({
    //     'lint-staged': lintStaged,
    // });

    // pkg.appendScript('lint:staged', 'lint-staged');
    // pkg.appendScript('husky:install', 'husky install .husky');
    // pkg.appendScript('husky:add', 'husky add .husky/pre-commit \"npm run lint:staged\"');
    // pkg.appendScript('husky:uninstall', 'npx rimraf .husky');

    // pkg.save();

    // Install npm dependencies
    // install(packages);

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

module.exports.description = 'Adds lint-staged and husky';

module.exports = task;
