const { ini } = require('mrm-core');

function task() {
    ini('.editorconfig', 'editorconfig.org')
        .set('_global', { root: true })
        .set('*', {
            charset: 'utf-8',
            indent_style: 'space',
            indent_size: 4,
            end_of_line: 'lf',
            insert_final_newline: true,
            trim_trailing_whitespace: true,
        })
        .set('*.{json,yml,md,babelrc}', {
            indent_size: 2,
        })
        .set('*.md', {
            trim_trailing_whitespace: false,
        })
        .save();
}

task.description = 'Adds .editorconfig';

module.exports = task;
