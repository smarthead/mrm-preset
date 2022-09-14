const { json } = require('mrm-core');

const task = () => {
    json('.mrm.config.json').delete();
}

task.description = 'Deletes temporary files';

module.exports = task;
