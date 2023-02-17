const config = require('../config');

const getConfig = (extensions = [], plugins = [], extended = false) => {
    return {
        ...(extensions.length > 0 ? { extends: extensions } : {}),

        ...(plugins.length > 0 ? { plugins } : {}),

        rules: {
            ...config.rules.basic,
            ...(extended ? { ...config.rules.extended } : {}),
        },
    };
};

module.exports = getConfig;
