import Config from '../config';
import {LIST_SEREPRATOR} from '../constants';

declare const kintone: any;

enum FormatName {
  'Format 1'= 1,
  'Format 2'= 2,
  'Format 3'= 3
}

const formatZipName = (recordId: string | number) => {
  const appId = kintone.app.getId();
  const currentDateTime = (new Date()).toISOString().slice(0, 19).replace(/-/g, '_').replace('T', ' ');
  const SEPARATOR_CHARACTER = LIST_SEREPRATOR.includes(Config.SEPARATOR_CHARACTER) ?
    Config.SEPARATOR_CHARACTER : '-';
  let params: Array<string | number> = [];
  switch (FormatName[Config.FILE_NAME_FORMAT_TYPE]) {
    case 'Format 1':
      params = [appId, recordId, Config.SPECIFIC_TEXT, currentDateTime];
      break;
    case 'Format 2':
      params = [recordId, Config.SPECIFIC_TEXT, currentDateTime];
      break;
    case 'Format 3':
      params = [Config.SPECIFIC_TEXT, currentDateTime];
      break;
    default:
      params = [appId, recordId, Config.SPECIFIC_TEXT, currentDateTime];
  }
  return params.join(SEPARATOR_CHARACTER);
};

export default formatZipName;
