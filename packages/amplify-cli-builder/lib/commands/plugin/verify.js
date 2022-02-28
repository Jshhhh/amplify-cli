'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.run = void 0;
const plugin_manager_1 = require('../../plugin-manager');
const run = async context => {
  context.print.warning('Run this command at the root directory of the plugin package.');
  const verificatonResult = await (0, plugin_manager_1.verifyPlugin)(process.cwd());
  if (verificatonResult.verified) {
    context.print.success('The current directory is verified to be a valid Amplify CLI plugin package.');
    context.print.info('');
  } else {
    context.print.error('The current directory faied Amplify CLI plugin verification.');
    context.print.info(`Error code: ${verificatonResult.error}`);
    context.print.info('');
  }
};
exports.run = run;
//# sourceMappingURL=verify.js.map
