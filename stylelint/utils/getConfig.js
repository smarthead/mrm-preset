const config = require('../config');

const getConfig = (styleSystem, extended = false) => {
    const plugins = [
        ...(styleSystem === 'SCSS' ? ['stylelint-scss'] : []),
        ...(extended ? ['stylelint-order'] : []),
    ];

    return {
        extends: [
            'stylelint-config-standard',
            ...(styleSystem === 'SCSS'
                ? ['stylelint-config-recommended-scss']
                : []),
        ],

        ...(plugins.length > 0 ? { plugins } : {}),

        rules: {
            ...config.rules.basic,
            ...(extended ? { ...config.rules.extended } : {}),
        },
    };
};

module.exports = getConfig;
