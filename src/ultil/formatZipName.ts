import Config from '../config';

declare const kintone: any;

const formatZipName = (recordId: string | number) => {
  const appId = kintone.app.getId();
  const currentDateTime = (new Date()).toISOString().slice(0, 19).replace(/-/g, '_').replace('T', ' ');
  const SEPARATOR_CHARACTER = ['-', '=', '+', '$', '_'].includes(Config.SEPARATOR_CHARACTER) ?
    Config.SEPARATOR_CHARACTER : '-';
  let params: Array<string | number> = [];
  switch (Config.FILE_NAME_FORMAT_TYPE) {
    case 1:
      params = [appId, recordId, Config.SPECIFIC_TEXT, currentDateTime];
      break;
    case 2:
      params = [recordId, Config.SPECIFIC_TEXT, currentDateTime];
      break;
    case 3:
      params = [Config.SPECIFIC_TEXT, currentDateTime];
      break;
    default:
      params = [appId, recordId, Config.SPECIFIC_TEXT, currentDateTime];
  }
  return params.join(SEPARATOR_CHARACTER);
};

export default formatZipName;