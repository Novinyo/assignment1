/*
* Create and export Configuration variables
*/

// Contaier for all the environments
const environments = {};

//Staging (default) environment
environments.dev = {
    'port': 6000,
    'envName': 'dev'
};

// production environment
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// Determine which environment was passed as command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default it to staging
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;

// Export the module
module.exports = environmentToExport;