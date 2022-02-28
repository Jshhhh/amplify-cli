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
exports.SerializableError = exports.UsageDataPayload = void 0;
const os = __importStar(require('os'));
const VersionManager_1 = require('./VersionManager');
const amplify_cli_core_1 = require('amplify-cli-core');
class UsageDataPayload {
  constructor(sessionUuid, installationUuid, version, input, error, state, accountId, project, inputOptions, record) {
    this.sessionUuid = sessionUuid;
    this.installationUuid = installationUuid;
    this.amplifyCliVersion = version;
    this.input = input;
    this.timestamp = new Date().toISOString();
    this.osPlatform = os.platform();
    this.osRelease = os.release();
    this.nodeVersion = process.versions.node;
    this.state = state;
    this.payloadVersion = (0, VersionManager_1.getLatestPayloadVersion)();
    this.accountId = accountId;
    this.isCi = (0, amplify_cli_core_1.isCI)();
    this.projectSetting = project;
    this.inputOptions = inputOptions;
    this.record = record;
    if (error) {
      this.error = new SerializableError(error);
    }
  }
}
exports.UsageDataPayload = UsageDataPayload;
class SerializableError {
  constructor(error) {
    this.name = error.name;
  }
}
exports.SerializableError = SerializableError;
//# sourceMappingURL=UsageDataPayload.js.map
