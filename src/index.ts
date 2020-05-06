import {uiController, eventController} from './controller';
import {RecordUtil} from './utils';
import Config from './config';
import {Kintone as KintoneService} from './services';

declare const kintone: any;

kintone.events.on('app.record.detail.show', async (event: any) => {
  const attachmentFields = RecordUtil.getAttachmentsFields(event.record);
  const appDetail = await KintoneService.App.detail();
  const appName = appDetail.name;
  const recordNumber = event.record.Record_number.value;
  const blankFieldElement = kintone.app.record.getSpaceElement(Config.BLANK_SPACE_ID);
  const UI = uiController({
    attachmentFields,
    appName,
    recordNumber,
    blankFieldElement
  });
  eventController(UI, attachmentFields, recordNumber);
});
