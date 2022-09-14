const { ini } = require('mrm-core');

const task = () => {
    ini('.editorconfig')
        .set('_global', { root: true })
        .set('*', {
            charset: 'utf-8',
            indent_style: 'space',
            indent_size: 4,
            end_of_line: 'lf',
            insert_final_newline: true,
            trim_trailing_whitespace: true,
            max_line_length: 120,
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
