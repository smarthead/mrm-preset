const config = {
    "compilerOptions": {
        /* Visit https://aka.ms/tsconfig.json to read more about this file */

        'target': 'es5',                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
        'module': 'esnext',                             /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
        'moduleResolution': 'node',                     /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */

        'strict': true,                                 /* Enable all strict type-checking options. */
        // 'rootDir': './',                             /* Specify the root folder within your source files. */
        // 'baseUrl': './'                              /* Specify the base directory to resolve non-relative module names. */
        'esModuleInterop': true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
        'forceConsistentCasingInFileNames': true,       /* Disallow inconsistently-cased references to the same file. */
        'skipLibCheck': true,                           /* Skip type checking of declaration files. */

        'lib': ['dom', 'esnext'],                       /* Specify library files to be included in the compilation. */
    },

    include: [
        'src/**/*',
    ],

    exclude: [
        'node_modules',
        '**/*.spec.ts',
        '**/vendor/**/*',
        '**/*.vendor.ts',
    ],
};

module.exports = config;
