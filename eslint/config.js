const config = {
    ts: {
        rules: {
            curly: 2,
            "@typescript-eslint/no-explicit-any": 0,
        },
    },
    reactTs: {
        rules: {
            'react/prop-types': 0,
            'jsx-a11y/label-has-associated-control': 2,
            'jsx-a11y/label-has-for': 0,
            'jsx-a11y/no-autofocus': 1,
        },
    },
};

module.exports = config;
