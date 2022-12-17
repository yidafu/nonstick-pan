import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import url from 'url';

import * as yaml from 'js-yaml';
import merge from 'lodash/merge';

export interface IProjectCpnfig {

}

const { NODE_ENV } = process.env;
const yamlConfigFilenames = ['config.default.yaml', `config.${NODE_ENV}.yaml`];

// eslint-disable-next-line import/no-default-export
export default (): IProjectCpnfig => yamlConfigFilenames
  .map((configFilename) => {
    const configFilepath = join(dirname(url.fileURLToPath(import.meta.url)), configFilename);
    if (existsSync(configFilepath)) {
      return yaml.load(
        readFileSync(configFilepath, 'utf8'),
      );
    }
    return {};
  })
  .reduce((preV, currV) => merge(currV, preV), {} as IProjectCpnfig);
