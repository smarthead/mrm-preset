const { json, install } = require('mrm-core');

const config = require('./config');

const task = () => {
    const { typescript, jsFramework } = json('.mrm.config.json').get();

    const hasTypeScriptConfig =
        jsFramework === 'Create React App' ||
        jsFramework === 'Next.js' ||
        jsFramework === 'Gatsby' ||
        jsFramework === 'Other';

    if (typescript === 'No' || hasTypeScriptConfig) {
        return;
    }

    const packages = ['typescript'];

    // {
    // dependencies: [
    //     'typescript',
    // ],
    // devDependencies: [
    //     '@typescript-eslint/eslint-plugin',
    //     '@typescript-eslint/parser',
    // ],
    // };

    // Create or load tsconfig.json
    json('tsconfig.json').merge(config).save();

    // // Create or load .eslintrc
    // const eslintrcFilename = (hasReact) ? '.eslintrc-project' : '.eslintrc';
    // const eslintrc = json(eslintrcFilename);

    // eslintrc
    //     .merge({
    //         extends: [
    //             'plugin:@typescript-eslint/recommended',
    //             'plugin:@typescript-eslint/recommended-requiring-type-checking',
    //         ],
    //         parser: "@typescript-eslint/parser",
    //         parserOptions: {
    //             project: './tsconfig.json',
    //             tsconfigRootDir: '.',
    //         },
    //         plugins: [
    //             '@typescript-eslint',
    //         ],
    //     });

    // eslintrc.save();

    // Install npm dependencies
    // install(packages.dependencies, { dev: false });
    // install(packages.devDependencies);
    install(packages);
};

task.description = 'Adds TypeScript';

module.exports = task;
