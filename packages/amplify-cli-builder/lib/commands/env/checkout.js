'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.run = void 0;
const promise_sequential_1 = __importDefault(require('promise-sequential'));
const initialize_env_1 = require('../../initialize-env');
const get_provider_plugins_1 = require('../../extensions/amplify-helpers/get-provider-plugins');
const get_env_info_1 = require('../../extensions/amplify-helpers/get-env-info');
const amplify_cli_core_1 = require('amplify-cli-core');
const run = async context => {
  const envName = context.parameters.first;
  const allEnvs = context.amplify.getEnvDetails();
  if (!envName || !allEnvs[envName]) {
    context.print.error('Please pass in a valid environment name. Run amplify env list to get a list of valid environments');
    return;
  }
  const localEnvInfo = (0, get_env_info_1.getEnvInfo)();
  localEnvInfo.envName = envName;
  amplify_cli_core_1.stateManager.setLocalEnvInfo(undefined, localEnvInfo);
  if (localEnvInfo.noUpdateBackend) {
    context.print.error(
      `The local environment configuration does not allow modifying the backend.\nUse amplify env pull --envName ${envName}`,
    );
    process.exitCode = 1;
    return;
  }
  context.amplify.constructExeInfo(context);
  context.exeInfo.forcePush = false;
  context.exeInfo.isNewEnv = false;
  context.exeInfo.restoreBackend = context.parameters.options.restore;
  const initializationTasks = [];
  const providerPlugins = (0, get_provider_plugins_1.getProviderPlugins)(context);
  context.exeInfo.projectConfig.providers.forEach(provider => {
    const providerModule = require(providerPlugins[provider]);
    initializationTasks.push(() => providerModule.init(context, allEnvs[envName][provider]));
  });
  await (0, promise_sequential_1.default)(initializationTasks);
  const onInitSuccessfulTasks = [];
  context.exeInfo.projectConfig.providers.forEach(provider => {
    const providerModule = require(providerPlugins[provider]);
    onInitSuccessfulTasks.push(() => providerModule.onInitSuccessful(context, allEnvs[envName][provider]));
  });
  await (0, promise_sequential_1.default)(onInitSuccessfulTasks);
  await (0, initialize_env_1.initializeEnv)(context);
};
exports.run = run;
//# sourceMappingURL=checkout.js.map
