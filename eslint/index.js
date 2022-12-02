const config = require('./config');
const { json, packageJson, lines, install } = require('mrm-core');

function task() {
    const { jsFramework, typescript } = json('.mrm.config.json').get();
    const pkg = packageJson();

    const packages = [];

    const isReactApp =
        jsFramework === 'React' ||
        jsFramework === 'Create React App' ||
        jsFramework === 'Next.js' ||
        jsFramework === 'Gatsby';
    const isTypeScript = typescript === 'Yes';

    // Add rules to .gitignore
    lines('.gitignore').add(['.eslintcache']).save();

    // Create or load .eslintignore, and set basic ignores
    lines('.eslintignore')
        .add(['/node_modules', '/build', '**/vendor/*', '**/*.vendor.*'])
        .save();

    // Default
    // --------------------------------

    // Add necessary packages
    packages.push('eslint');

    // Create or load .eslintrc
    const eslintrc = json('.eslintrc');

    eslintrc.merge({
        extends: 'eslint:recommended',
        env: {
            browser: true,
            node: true,
            es6: true,
            es2017: true,
            es2020: true,
        },
        globals: {
            window: 'readonly',
        },
        rules: config.ts.rules,
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    });

    eslintrc.save();

    // Add scripts to package.json
    const eslintExtensions = isTypeScript ? '.js,.ts' : '.js';

    pkg.appendScript('lint', 'npm run lint:js');
    pkg.appendScript('lint:fix', 'npm run lint:js:fix');
    pkg.setScript(
        'lint:js',
        `eslint --quiet --cache --no-error-on-unmatched-pattern --ext ${eslintExtensions} src`,
    );
    pkg.setScript(
        'lint:js:fix',
        `eslint --quiet --cache --no-error-on-unmatched-pattern --fix --ext ${eslintExtensions} src`,
    );

    /*

    // Use Babel parser if the project depends on Babel
    if (pkg.get('devDependencies.@babel/core') || pkg.get('dependencies.@babel/core')) {
        const parser = '@babel/eslint-parser';

        packages.push(parser);

        eslintrc.merge({
            parser,
        });
    }

    if (hasReact) {

        // React
        // --------------------------------

        // Add necessary packages
        packages.push('eslint-plugin-react');
        packages.push('eslint-plugin-jsx-a11y');

        // Create or load .eslintrc
        const reactEslintrc = pkg.get('eslintConfig.extends') || [];
        const eslintrc = json('.eslintrc-project');

        eslintrc.merge({
            env: {
                browser: true,
                node: true,
                es6: true,
                es2017: true,
                es2020: true,
            },
            globals: {
                window: 'readonly',
            },
            extends: [
                ...reactEslintrc,
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:jsx-a11y/strict',
            ],
            rules: {
                ...config.ts.rules,
                ...config.reactTs.rules,
            },
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
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

        eslintrc.save();

        // Add scripts to package.json
        pkg.setScript(
            'lint:js',
            'eslint --quiet --cache --no-error-on-unmatched-pattern --config .eslintrc-project --ext .js,.jsx,.ts,.tsx src',
        );
        pkg.setScript(
            'lint:js:fix',
            'eslint --quiet --cache --no-error-on-unmatched-pattern --fix --config .eslintrc-project --ext .js,.jsx,.ts,.tsx src',
        );

    }

    */

    pkg.save();

    // Install npm dependencies
    install(packages);
}

module.exports.description = 'Adds eslint';

module.exports = task;
