const { json } = require('mrm-core');

const task = (parameters) => {
    json('.mrm.config.json')
        .merge({
            ...parameters,
            projectName: (parameters.projectName || '')
                .replace(/\s+/g, '-')
                .toLowerCase(),
        })
        .save();
};

task.description = 'Adds temporary files';

task.parameters = {
    projectName: {
        type: 'input',
        message:
            'Project name (one lowercase word, may contain hyphens and underscores):',
    },

    version: {
        type: 'config',
        default: '0.1.0',
    },

    description: {
        type: 'config',
        default: '',
    },

    private: {
        type: 'config',
        default: true,
    },

    minNode: {
        type: 'config',
        default: '16',
    },

    minNpm: {
        type: 'config',
        default: '8',
    },

    styleSystem: {
        type: 'list',
        message: 'Which style system are you going to use?',
        choices: ['CSS', 'SCSS', 'CSS-in-JS'],
        default: 'CSS',
    },

    jsFramework: {
        type: 'list',
        message: 'Which JS frameworks or libraries are you going to use?',
        choices: [
            'None',
            'React',
            'Create React App',
            'Next.js',
            'Gatsby',
            'Other',
        ],
        default: 'None',
    },

    typescript: {
        type: 'list',
        message: 'Are you going to use TypeScript?',
        choices: ['Yes', 'No'],
        default: 'Yes',
    },
};

module.exports = task;
