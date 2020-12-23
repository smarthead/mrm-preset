const {
    json,
    packageJson,
    lines,
    install,
} = require('mrm-core');

function task() {
    const packages = [
        'stylelint',
        'stylelint-order',
        'stylelint-scss',
        'stylelint-config-standard',
        'stylelint-config-recommended-scss',
    ];

    // Add rules to .gitignore
    lines('.gitignore')
        .add([
            '.stylelintcache',
        ])
        .save();

    // Create or load package.json
    packageJson()
        .appendScript('lint', 'npm run lint:css')
        .appendScript('lint:fix', 'npm run lint:css:fix')
        .setScript(
            'lint:css',
            'stylelint --quiet --cache --allow-empty-input \"src/**/*.{css,scss}\"')
        .setScript(
            'lint:css:fix',
            'stylelint --quiet --cache --allow-empty-input --fix --config .stylelintrc-extended \"src/**/*.{css,scss}\"')
        .save();



    // Create or load .stylelintignore, and set basic ignores
    lines('.stylelintignore')
        .add([
            '/node_modules',
            '/build',
            '**/*.js',
            '**/vendor/*',
            '**/*.vendor*',
        ])
        .save();

    // Create or load .stylelintrc
    json('.stylelintrc')
        .merge({
            extends: [
                'stylelint-config-standard',
                'stylelint-config-recommended-scss',
            ],
            plugins: [
                'stylelint-scss',
            ],
            rules: {
                indentation: 4,
                'no-descending-specificity': null,
            },
        })
        .save();

    // Create or load .stylelint-extended
    json('.stylelintrc-extended')
        .merge({
            extends: [
                'stylelint-config-standard',
                'stylelint-config-recommended-scss',
            ],
            plugins: [
                'stylelint-scss',
                'stylelint-order',
            ],
            rules: {
                indentation: 4,
                'no-descending-specificity': null,
                'order/properties-order': [
                    // Position
                    'position',
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'z-index',

                    // Display
                    'display',
                    'visibility',
                    'opacity',

                    // Grid and Flex
                    // Properties for the Parent

                    // Grid Container
                    'grid',
                    'grid-template',
                    'grid-template-rows',
                    'grid-template-columns',
                    'grid-template-areas',
                    'grid-auto-rows',
                    'grid-auto-columns',
                    'grid-auto-flow',
                    'grid-gap',
                    'grid-row-gap',
                    'grid-column-gap',

                    // Flex Container
                    'flex-flow',
                    'flex-direction',
                    'flex-wrap',

                    // Common for Grid and Flex Containers
                    'place-content',
                    'align-content',
                    'justify-content',
                    'place-items',
                    'align-items',
                    'justify-items',

                    // Properties for the Children

                    // Grid Items
                    'grid-area',
                    'grid-row',
                    'grid-row-start',
                    'grid-row-end',
                    'grid-column',
                    'grid-column-start',
                    'grid-column-end',

                    // Properties for the Children
                    // Flex Items
                    'flex',
                    'flex-grow',
                    'flex-shrink',
                    'flex-basis',
                    'order',

                    // Common for Grid and Flex Items
                    'place-self',
                    'align-self',
                    'justify-self',

                    // Float
                    'float',
                    'clear',

                    // Overflow
                    'overflow',
                    'overflow-x',
                    'overflow-y',
                    'clip',
                    'zoom',

                    // Box
                    'box-sizing',
                    'width',
                    'min-width',
                    'max-width',
                    'height',
                    'min-height',
                    'max-height',
                    'margin',
                    'margin-top',
                    'margin-right',
                    'margin-bottom',
                    'margin-left',
                    'padding',
                    'padding-top',
                    'padding-right',
                    'padding-left',
                    'padding-bottom',

                    // Typography
                    'color',
                    'font',
                    'font-family',
                    'font-size',
                    'line-height',
                    'font-weight',
                    'font-style',
                    'font-variant',
                    'font-size-adjust',
                    'font-stretch',
                    'font-effect',
                    'font-emphasize',
                    'font-emphasize-position',
                    'font-emphasize-style',
                    'font-smooth',
                    'text-align',
                    'text-align-last',
                    'vertical-align',
                    'white-space',
                    'text-decoration',
                    'text-emphasis',
                    'text-emphasis-color',
                    'text-emphasis-style',
                    'text-emphasis-position',
                    'text-indent',
                    'text-justify',
                    'letter-spacing',
                    'word-spacing',
                    'text-outline',
                    'text-transform',
                    'text-wrap',
                    'text-overflow',
                    'text-overflow-ellipsis',
                    'text-overflow-mode',
                    'text-shadow',
                    'word-wrap',
                    'word-break',

                    // Background
                    'background',
                    'background-color',
                    'background-image',
                    'background-repeat',
                    'background-attachment',
                    'background-position',
                    'background-position-x',
                    'background-position-y',
                    'background-clip',
                    'background-origin',
                    'background-size',

                    // Border, Outline and Box Shadow
                    'border',
                    'border-width',
                    'border-style',
                    'border-color',
                    'border-top',
                    'border-top-width',
                    'border-top-style',
                    'border-top-color',
                    'border-left',
                    'border-left-width',
                    'border-left-style',
                    'border-left-color',
                    'border-right',
                    'border-right-width',
                    'border-right-style',
                    'border-right-color',
                    'border-bottom',
                    'border-bottom-width',
                    'border-bottom-style',
                    'border-bottom-color',
                    'border-radius',
                    'border-top-left-radius',
                    'border-top-right-radius',
                    'border-bottom-right-radius',
                    'border-bottom-left-radius',
                    'border-image',
                    'border-image-source',
                    'border-image-slice',
                    'border-image-width',
                    'border-image-outset',
                    'border-image-repeat',
                    'outline',
                    'outline-width',
                    'outline-style',
                    'outline-color',
                    'outline-offset',
                    'box-shadow',
                    'box-decoration-break',

                    // Transition and Animation
                    'transition',
                    'transition-duration',
                    'transition-delay',
                    'transition-timing-function',
                    'transition-property',
                    'transform',
                    'transform-origin',
                    'animation',
                    'animation-name',
                    'animation-duration',
                    'animation-play-state',
                    'animation-timing-function',
                    'animation-delay',
                    'animation-iteration-count',
                    'animation-direction',
                    'backface-visibility',

                    // Other
                    'list-style',
                    'list-style-position',
                    'list-style-type',
                    'list-style-image',
                    'tab-size',
                    'hyphens',
                    'content',
                    'quotes',
                    'counter-reset',
                    'counter-increment',
                    'resize',
                    'will-change',
                    'cursor',
                    'pointer-events',
                    'user-select',
                    'nav-index',
                    'nav-up',
                    'nav-right',
                    'nav-down',
                    'nav-left',
                    'table-layout',
                    'empty-cells',
                    'caption-side',
                    'border-spacing',
                    'border-collapse',
                ],
            },
        })
        .save();

    // Install new npm dependencies
    install(packages);
}

module.exports.description = 'Adds stylelint';

module.exports = task;
