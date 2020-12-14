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
        'husky@next'
    ];

    // Create or load package.json
    const pkg = packageJson();

    pkg.merge({
        'lint-staged': {
            '*.{js,jsx,ts,tsx}': [
                'eslint --quiet --cache --fix --ext .js,.jsx,.ts,.tsx',
                'git add'
            ],
            '*.{css,scss}': [
                'stylelint --quiet --cache --fix --config .stylelintrc-extended',
                'git add'
            ]
        }
    });

    pkg.appendScript('lint-staged', 'lint-staged');

    pkg.appendScript(
        'husky-reinstall',
        'npx rimraf .husky && npx husky install && npx husky add pre-commit \"npm run lint-staged\"'
    );

    // CI should use "npm ci"
    pkg.appendScript('postinstall', 'npx husky install');

    pkg.save();

    // Install new npm dependencies
    install(packages);

    // Init Husky (for Husky 5+) and add a pre-commit hook
    if (!lines('.husky/pre-commit').exists()) {
        console.log('Installing Husky and git hooks...\n');

        exec(
            'npx husky install .husky && npx husky add .husky/pre-commit "npm run lint-staged"',
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
