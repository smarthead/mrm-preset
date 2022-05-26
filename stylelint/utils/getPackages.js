const getPackages = (styleSystem) => {
    switch(styleSystem) {
        case 'SCSS': return [
            'stylelint',
            'stylelint-order',
            'stylelint-scss',
            'stylelint-config-standard',
            'stylelint-config-recommended-scss',
        ];
        break;

        default: return [
            'stylelint',
            'stylelint-order',
            'stylelint-config-standard',
        ];
    };
};

module.exports = getPackages;
