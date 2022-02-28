import { PluginCollection } from './plugin-collection';
import { IPluginPlatform } from 'amplify-cli-core';
export declare class PluginPlatform implements IPluginPlatform {
  constructor();
  pluginDirectories: string[];
  pluginPrefixes: string[];
  userAddedLocations: string[];
  lastScanTime: Date;
  maxScanIntervalInSeconds: number;
  plugins: PluginCollection;
  excluded: PluginCollection;
}
//# sourceMappingURL=plugin-platform.d.ts.map
