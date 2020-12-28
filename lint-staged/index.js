const { exec } = require('child_process');
const {
    packageJson,
    lines,
    install,
} = require('mrm-core');

function task({ eslintPreset }) {
    // Define packages to install
    const packages = [
        'lint-staged',
        'husky@^5.0.6',
    ];

    // Create or load package.json
    const pkg = packageJson();

    pkg.merge({
        'lint-staged': {
            '*.{js,jsx,ts,tsx}': [
                'eslint --quiet --cache --fix --ext .js,.jsx,.ts,.tsx',
            ],
            '*.{css,scss}': [
                'stylelint --quiet --cache --fix --config .stylelintrc-extended',
            ],
        },
    });

    pkg.appendScript('lint:staged', 'lint-staged');
    pkg.appendScript('husky:install', 'husky install .husky');
    pkg.appendScript('husky:add', 'husky add .husky/pre-commit \"npm run lint:staged\"');
    pkg.appendScript('husky:uninstall', 'npx rimraf .husky');

    pkg.save();

    // Install npm dependencies
    install(packages);

    // Init Husky (for Husky 5+) and add a pre-commit hook
    if (!lines('.husky/pre-commit').exists()) {
        console.log('Installing Husky and git hooks...\n');

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

module.exports.description = 'Adds lint-staged and husky';

module.exports = task;
