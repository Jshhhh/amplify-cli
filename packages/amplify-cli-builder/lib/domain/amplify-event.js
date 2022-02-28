'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AmplifyEventArgs =
  exports.AmplifyPostEnvAddEventData =
  exports.AmplifyInternalOnlyPostEnvRemoveEventData =
  exports.AmplifyPostCodegenModelsEventData =
  exports.AmplifyPreCodegenModelsEventData =
  exports.AmplifyPostPullEventData =
  exports.AmplifyPrePullEventData =
  exports.AmplifyPostPushEventData =
  exports.AmplifyPrePushEventData =
  exports.AmplifyPostInitEventData =
  exports.AmplifyPreInitEventData =
  exports.AmplifyEventData =
  exports.AmplifyEvent =
    void 0;
var AmplifyEvent;
(function (AmplifyEvent) {
  AmplifyEvent['PreInit'] = 'PreInit';
  AmplifyEvent['PostInit'] = 'PostInit';
  AmplifyEvent['PrePush'] = 'PrePush';
  AmplifyEvent['PostPush'] = 'PostPush';
  AmplifyEvent['PrePull'] = 'PrePull';
  AmplifyEvent['PostPull'] = 'PostPull';
  AmplifyEvent['PostEnvAdd'] = 'PostEnvAdd';
  AmplifyEvent['PreCodegenModels'] = 'PreCodegenModels';
  AmplifyEvent['PostCodegenModels'] = 'PostCodegenModels';
  AmplifyEvent['InternalOnlyPostEnvRemove'] = 'InternalOnlyPostEnvRemove';
})((AmplifyEvent = exports.AmplifyEvent || (exports.AmplifyEvent = {})));
class AmplifyEventData {}
exports.AmplifyEventData = AmplifyEventData;
class AmplifyPreInitEventData extends AmplifyEventData {}
exports.AmplifyPreInitEventData = AmplifyPreInitEventData;
class AmplifyPostInitEventData extends AmplifyEventData {}
exports.AmplifyPostInitEventData = AmplifyPostInitEventData;
class AmplifyPrePushEventData extends AmplifyEventData {}
exports.AmplifyPrePushEventData = AmplifyPrePushEventData;
class AmplifyPostPushEventData extends AmplifyEventData {}
exports.AmplifyPostPushEventData = AmplifyPostPushEventData;
class AmplifyPrePullEventData extends AmplifyEventData {}
exports.AmplifyPrePullEventData = AmplifyPrePullEventData;
class AmplifyPostPullEventData extends AmplifyEventData {}
exports.AmplifyPostPullEventData = AmplifyPostPullEventData;
class AmplifyPreCodegenModelsEventData extends AmplifyEventData {}
exports.AmplifyPreCodegenModelsEventData = AmplifyPreCodegenModelsEventData;
class AmplifyPostCodegenModelsEventData extends AmplifyEventData {}
exports.AmplifyPostCodegenModelsEventData = AmplifyPostCodegenModelsEventData;
class AmplifyInternalOnlyPostEnvRemoveEventData extends AmplifyEventData {
  constructor(envName) {
    super();
    this.envName = envName;
  }
}
exports.AmplifyInternalOnlyPostEnvRemoveEventData = AmplifyInternalOnlyPostEnvRemoveEventData;
class AmplifyPostEnvAddEventData extends AmplifyEventData {
  constructor(prevEnvName, newEnvName) {
    super();
    this.prevEnvName = prevEnvName;
    this.newEnvName = newEnvName;
  }
}
exports.AmplifyPostEnvAddEventData = AmplifyPostEnvAddEventData;
class AmplifyEventArgs {
  constructor(event, data) {
    this.event = event;
    this.data = data;
  }
}
exports.AmplifyEventArgs = AmplifyEventArgs;
//# sourceMappingURL=amplify-event.js.map
