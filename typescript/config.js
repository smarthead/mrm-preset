// Visit https://aka.ms/tsconfig.json to read more about this file

const config = {
    compilerOptions: {
        // Specify the root folder within your source files
        strict: true,

        // Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016',
        // 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'
        target: 'ES6',
        // Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd',
        // 'es2015', 'es2020', or 'ESNext'
        module: 'ESNext',
        // Specify library files to be included in the compilation
        lib: ['DOM', 'ES6', 'DOM.Iterable', 'ESNext'],
        // Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
        moduleResolution: 'node',

        // Specify the base directory to resolve non-relative module names
        baseUrl: './',
        outDir: './build',

        // Enables emit interoperability between CommonJS and ES Modules via
        // creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'
        esModuleInterop: true,
        // Disallow inconsistently-cased references to the same file
        forceConsistentCasingInFileNames: true,
        // Skip type checking of declaration files
        skipLibCheck: true,

        resolveJsonModule: true,
    },

    include: ['**/*.ts'],

    exclude: [
        'node_modules',
        '**/*.spec.ts',
        '**/vendor/**/*',
        '**/*.vendor.ts',
    ],
};

module.exports = config;
