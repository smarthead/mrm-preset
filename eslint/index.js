const {
    json,
    packageJson,
    lines,
    install
} = require('mrm-core');

function task() {
    const pkg = packageJson();
    const isReact = !!pkg.get('dependencies.react-scripts');
    const packages = [];

    if (isReact) {
        packages.push('eslint-plugin-react');
        packages.push('eslint-plugin-jsx-a11y');
    } else {
        packages.push('eslint');
    }

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '.eslintcache'
        ])
        .save();

    // Create or load .eslintignore, and set basic ignores
    lines('.eslintignore')
        .add([
            '/node_modules',
            '/build',
            '**/vendor/*',
            '**/*.vendor*'
        ])
        .save();

    // Create or load package.json
    pkg.appendScript('lint', 'npm run lint:js');
    pkg.appendScript('lint:fix', 'npm run lint:js:fix');
    pkg.setScript(
        'lint:js',
        'eslint --quiet --cache --no-error-on-unmatched-pattern --ext .js,.jsx,.ts,.tsx src'
    );
    pkg.setScript(
        'lint:js:fix',
        'eslint --quiet --cache --no-error-on-unmatched-pattern --fix --ext .js,.jsx,.ts,.tsx src'
    );
    pkg.unset('eslintConfig');
    pkg.save();

    // Create or load .eslintrc
    const eslintrc = json('.eslintrc');
    const eslintExtends = (isReact) ?
        [
            'react-app',
            'react-app/jest',
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:jsx-a11y/strict',
        ] :
        [
            'eslint:recommended',
        ];

    eslintrc.merge({
        env: {
            browser: true,
            node: true,
            es6: true,
            es2017: true,
            es2020: true
        },
        globals: {
            window: 'readonly',
        },
        extends: eslintExtends,
        rules: {
            'react/prop-types': 0,
        },
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    });

    if (isReact) {
        eslintrc.merge({
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            plugins: [
                'react',
                'jsx-a11y',
            ],
            settings: {
                react: {
                    version: 'detect',
                },
            },
        });
    }

    // Use Babel parser if the project depends on Babel
    if (pkg.get('devDependencies.@babel/core') || pkg.get('dependencies.@babel/core')) {
        const parser = '@babel/eslint-parser';

        packages.push(parser);

        eslintrc.merge({
            parser
        });
    }

    eslintrc.save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds eslint';

module.exports = task;
