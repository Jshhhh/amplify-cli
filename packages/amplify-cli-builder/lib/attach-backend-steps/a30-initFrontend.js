'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.initFrontend = void 0;
const inquirer = __importStar(require('inquirer'));
const get_frontend_plugins_1 = require('../extensions/amplify-helpers/get-frontend-plugins');
const input_params_manager_1 = require('../input-params-manager');
async function initFrontend(context) {
  if (
    context.exeInfo.inputParams &&
    context.exeInfo.inputParams.yes &&
    context.exeInfo.existingProjectConfig &&
    context.exeInfo.existingProjectConfig.frontend
  ) {
    context.exeInfo.projectConfig = context.exeInfo.existingProjectConfig;
  } else {
    const frontendPlugins = (0, get_frontend_plugins_1.getFrontendPlugins)(context);
    let suitableFrontend;
    let fitToHandleScore = -1;
    Object.keys(frontendPlugins).forEach(key => {
      const { scanProject } = require(frontendPlugins[key]);
      const newScore = scanProject(context.exeInfo.localEnvInfo.projectPath);
      if (newScore > fitToHandleScore) {
        fitToHandleScore = newScore;
        suitableFrontend = key;
      }
    });
    const frontend = await getFrontendHandler(context, frontendPlugins, suitableFrontend);
    context.exeInfo.projectConfig.frontend = frontend;
    const frontendModule = require(frontendPlugins[frontend]);
    await frontendModule.init(context);
  }
  return context;
}
exports.initFrontend = initFrontend;
async function getFrontendHandler(context, frontendPlugins, suitableFrontend) {
  let frontend;
  const frontendPluginList = Object.keys(frontendPlugins);
  const { inputParams } = context.exeInfo;
  if (inputParams && inputParams.amplify && inputParams.amplify.frontend) {
    frontend = (0, input_params_manager_1.normalizeFrontendHandlerName)(inputParams.amplify.frontend, frontendPluginList);
  }
  if (!frontend && inputParams && inputParams.yes) {
    frontend = 'javascript';
  }
  if (!frontend) {
    const selectFrontendHandler = {
      type: 'list',
      name: 'selectedFrontendHandler',
      message: "Choose the type of app that you're building",
      choices: frontendPluginList,
      default: suitableFrontend,
    };
    const answer = await inquirer.prompt(selectFrontendHandler);
    frontend = answer.selectedFrontendHandler;
  }
  return frontend;
}
//# sourceMappingURL=a30-initFrontend.js.map
